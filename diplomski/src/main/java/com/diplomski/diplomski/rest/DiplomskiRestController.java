package com.diplomski.diplomski.rest;

import com.diplomski.diplomski.config.UserAuthProvider;
import com.diplomski.diplomski.dto.CredentialsDto;
import com.diplomski.diplomski.dto.ProfilDto;
import com.diplomski.diplomski.dto.RezervacijaDto;
import com.diplomski.diplomski.entity.*;
import com.diplomski.diplomski.service.*;
import com.diplomski.diplomski.service.impl.*;
import jakarta.mail.MessagingException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;

@RestController
public class DiplomskiRestController {

    private EntityService rolaService;
    private EntityService zaposleniService;
    private EntityService tipSaleService;
    private EntityService predmetService;
    private EntityService statusService;
    private EntityService salaService;
    private ProfilService profilService;
    private EntityService tipRezervacijeService;
    private EntityService podtipRezervacijeService;
    private NotifikacijaService notifikacijaService;
    private RezervacijaService rezervacijaService;
    private EmailSenderService emailSenderService;
    private final UserAuthProvider userAuthenticationProvider;

//    @GetMapping("/hello")
//    public String sayHello(){
//        return "Hello World!";
//    }


    public DiplomskiRestController(RolaServiceImpl rolaService,
                                   ZaposleniServiceImpl zaposleniService,
                                   TipSaleServiceImpl tipSaleService,
                                   PredmetServiceImpl predmetService,
                                   StatusServiceImpl statusService,
                                   SalaServiceImpl salaService,
                                   ProfilServiceImpl profilService,
                                   TipRezervacijeServiceImpl tipRezervacijeService,
                                   PodtipRezervacijeServiceImpl podtipRezervacijeService,
                                   NotifikacijaServiceImpl notifikacijaService,
                                   RezervacijaServiceImpl rezervacijaService,
                                   UserAuthProvider userAuthenticationProvider,
                                   EmailSenderService emailSenderService) {
        this.rolaService = rolaService;
        this.zaposleniService = zaposleniService;
        this.tipSaleService = tipSaleService;
        this.predmetService = predmetService;
        this.statusService = statusService;
        this.salaService = salaService;
        this.profilService = profilService;
        this.tipRezervacijeService = tipRezervacijeService;
        this.podtipRezervacijeService = podtipRezervacijeService;
        this.notifikacijaService = notifikacijaService;
        this.rezervacijaService = rezervacijaService;
        this.userAuthenticationProvider = userAuthenticationProvider;
        this.emailSenderService = emailSenderService;
    }

    @PostMapping("/login")
    public ResponseEntity<ProfilDto> login(@RequestBody CredentialsDto credentialsDto) throws Exception {
        ProfilDto profilDto = profilService.login(credentialsDto);
        profilDto.setToken(userAuthenticationProvider.createToken(profilDto));
        return ResponseEntity.ok(profilDto);
    }

    @GetMapping("/role")
    public List<Rola> getRole(){
        return rolaService.findAll();
    }

    @PostMapping("/profil/rola")
    public Rola vratiRoluProfila(@RequestBody CredentialsDto credentialsDto) throws Exception {
        ProfilDto profilDto = profilService.findByUsername(credentialsDto.username());
        Profil profil = profilService.findById(profilDto.getProfilId());
        Rola rola = (Rola) rolaService.findById(profil.getRola().getrolaId());
        return rola;
    }

    @GetMapping("/sale")
    public List<Sala> getSale() {
        return salaService.findAll();
    }

    @GetMapping("/profili")
    public List<Profil> getProfili() {
        return profilService.findAll();
    }

    @GetMapping("/podtip_rezervacije")
    public List<PodtipRezervacije> getPodtipRezervacije() {
        return podtipRezervacijeService.findAll();
    }

    @GetMapping("/zaposleni")
    public List<Zaposleni> getZaposleni() {
        return zaposleniService.findAll();
    }

    @GetMapping("/tip_sale")
    public List<TipSale> getTipSale() {
        return tipSaleService.findAll();
    }

    @GetMapping("/predmeti")
    public List<Predmet> getPredmeti() {
        return predmetService.findAll();
    }

    @GetMapping("/statusi")
    public List<Status> getStatusi() {
        return statusService.findAll();
    }

    @GetMapping("/tip_rezervacije")
    public List<TipRezervacije> getTipRezervacije() {
        return tipRezervacijeService.findAll();
    }

    @GetMapping("/rezervacije")
    public List<Rezervacija> getRezervacije() {
        List<Rezervacija> list = rezervacijaService.findAll();
        return list;
    }

    @PostMapping("/sacuvaj/rezervacija")
    public Rezervacija sacuvajRezervaciju(@RequestBody RezervacijaDto rezervacija) throws Exception {
        System.out.println("Objekat je sacuvan");

        Rezervacija rez = rezervacijaService.dodajRezervaciju(rezervacija);

        sacuvajNovuNotifikaciju(rez);

        return rez;
    }

    @PutMapping("/obradi/rezervacija")
    public Rezervacija obradiRezervaciju(@RequestBody RezervacijaDto rezervacija) throws Exception {
        Rezervacija rez = rezervacijaService.obradiRezervaciju(rezervacija);

        sacuvajNotifikacijuObrada(rez);

        if(rez.getStatus().getStatus().equals("prihvacena")) {
            String icsContent = emailSenderService.generateIcsContent(rez);
            Path tempFile = Files.createTempFile("rezervacija", ".ics");
            Files.write(tempFile, icsContent.getBytes(StandardCharsets.UTF_8));

            posaljiMejl(rez, tempFile.toFile());
            Files.delete(tempFile);
        }

        return rez;
    }

    @PostMapping("/rezervacije/korisnik")
    public List<Rezervacija> vratiRezervacijeKorisnika(@RequestBody CredentialsDto credentialsDto) throws Exception {
        return rezervacijaService.vratiRezervacijeKorisnika(credentialsDto.username());
    }

    @PutMapping("/odjavi/rezervacija")
    public Rezervacija odjaviRezervaciju(@RequestBody RezervacijaDto rezervacija) throws Exception {
        return rezervacijaService.odjaviRezervaciju(rezervacija);
    }

    @PostMapping("/notifikacija")
    public List<Notifikacija> vratiNotifikacije(@RequestBody CredentialsDto credentialsDto) {
        List<Notifikacija> notifikacije = notifikacijaService.vratiSveNotifikacije(credentialsDto.username());
        return notifikacije;
    }

    private void sacuvajNovuNotifikaciju(Rezervacija rez) throws Exception {
        Notifikacija notifikacija = new Notifikacija();
        notifikacija.setRezervacija(rez);
        notifikacija.setNotifikacija("Kreirana je nova rezervacija za dan: " + rez.getDatumRezervacije() + ", u sali: " + rez.getSala().getSala());

        notifikacijaService.sacuvajNotifikaciju(notifikacija);
    }

    private void sacuvajNotifikacijuObrada(Rezervacija rez) throws Exception {
        Notifikacija notifikacija = notifikacijaService.findById(rez.getNotifikacija().getNotifikacijaId());
        notifikacija.setNotifikacija("Rezervacija je : " + rez.getStatus().getStatus());

        notifikacijaService.sacuvajNotifikaciju(notifikacija);
    }

    private void posaljiMejl(Rezervacija rezervacija, File file) throws MessagingException {
        emailSenderService.sendEmailWithAttachment("markovicl136@gmail.com",
                "Rezervacija je prihvacena.",
                "Rezervacija",
                file);

    }



}
