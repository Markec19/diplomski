package com.diplomski.diplomski.rest;

import com.diplomski.diplomski.config.UserAuthProvider;
import com.diplomski.diplomski.dto.CredentialsDto;
import com.diplomski.diplomski.dto.ProfilDto;
import com.diplomski.diplomski.dto.RezervacijaDto;
import com.diplomski.diplomski.entity.*;
import com.diplomski.diplomski.service.EntityService;
import com.diplomski.diplomski.service.ProfilService;
import com.diplomski.diplomski.service.RezervacijaService;
import com.diplomski.diplomski.service.impl.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

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
    private RezervacijaService rezervacijaService;
    private final UserAuthProvider userAuthenticationProvider;

    @GetMapping("/hello")
    public String sayHello(){
        return "Hello World!";
    }


    public DiplomskiRestController(RolaServiceImpl rolaService, ZaposleniServiceImpl zaposleniService,
                                   TipSaleServiceImpl tipSaleService,
                                   PredmetServiceImpl predmetService,
                                   StatusServiceImpl statusService, SalaServiceImpl salaService,
                                   ProfilServiceImpl profilService,
                                   TipRezervacijeServiceImpl tipRezervacijeService,
                                   PodtipRezervacijeServiceImpl podtipRezervacijeService,
                                   RezervacijaServiceImpl rezervacijaService,
                                   UserAuthProvider userAuthenticationProvider) {
        this.rolaService = rolaService;
        this.zaposleniService = zaposleniService;
        this.tipSaleService = tipSaleService;
        this.predmetService = predmetService;
        this.statusService = statusService;
        this.salaService = salaService;
        this.profilService = profilService;
        this.tipRezervacijeService = tipRezervacijeService;
        this.podtipRezervacijeService = podtipRezervacijeService;
        this.rezervacijaService = rezervacijaService;
        this.userAuthenticationProvider = userAuthenticationProvider;
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
        return rez;
    }

    @PutMapping("/obradi/rezervacija")
    public Rezervacija obradiRezervaciju(@RequestBody RezervacijaDto rezervacija) throws Exception {
        return rezervacijaService.obradiRezervaciju(rezervacija);
    }

}
