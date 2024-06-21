package com.diplomski.diplomski.rest;

import com.diplomski.diplomski.dto.CredentialsDto;
import com.diplomski.diplomski.dto.RezervacijaDto;
import com.diplomski.diplomski.entity.Rezervacija;
import com.diplomski.diplomski.service.EmailSenderService;
import com.diplomski.diplomski.service.NotifikacijaService;
import com.diplomski.diplomski.service.RezervacijaService;
import jakarta.mail.MessagingException;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/rezervacije")
public class RezervacijaController {

    private NotifikacijaService notifikacijaService;
    private RezervacijaService rezervacijaService;
    private EmailSenderService emailSenderService;


    public RezervacijaController(NotifikacijaService notifikacijaService, RezervacijaService rezervacijaService, EmailSenderService emailSenderService) {
        this.notifikacijaService = notifikacijaService;
        this.rezervacijaService = rezervacijaService;
        this.emailSenderService = emailSenderService;
    }

    @GetMapping("/rezervacije/dan")
    public List<Rezervacija> vratiRezervacijeZaDan(@RequestParam String datum) throws Exception {
        SimpleDateFormat formatter = new SimpleDateFormat("EEE MMM dd yyyy HH:mm:ss 'GMT'Z (z)");
        Date parsedDate = formatter.parse(datum);
        List<Rezervacija> list = rezervacijaService.vratiRezervacijeZaDan(parsedDate);
        return list;
    }

    @PostMapping("/sacuvaj/rezervacija")
    public Rezervacija sacuvajRezervaciju(@RequestBody RezervacijaDto rezervacija)  {
        System.out.println("Objekat je sacuvan");

        Rezervacija rez = null;
        try {
            rez = rezervacijaService.dodajRezervaciju(rezervacija);
            NotifikacijaController.sacuvajNotifikaciju(rez);
            return rez;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }

    @PutMapping("/prihvati/rezervacija")
    public Rezervacija prihvatiRezervaciju(@RequestBody RezervacijaDto rezervacija) throws Exception {
        Rezervacija rez = rezervacijaService.obradiRezervaciju(rezervacija);
        NotifikacijaController.izmeniNotifikaciju(rez);
        posaljiMejl(rez);
        return rez;
    }

    @PutMapping("/odbij/rezervacija")
    public Rezervacija odbijRezervaciju(@RequestBody RezervacijaDto rezervacija) throws Exception {
        Rezervacija rez = rezervacijaService.obradiRezervaciju(rezervacija);
        NotifikacijaController.izmeniNotifikaciju(rez);
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

    private void posaljiMejl(Rezervacija rez) throws MessagingException, IOException, ParseException {
        String icsContent = emailSenderService.generateIcsContent(rez);
        Path tempFile = Files.createTempFile("rezervacija", ".ics");
        Files.write(tempFile, icsContent.getBytes(StandardCharsets.UTF_8));

        emailSenderService.sendEmailWithAttachment("markovicl136@gmail.com",
                "Rezervacija je prihvacena.",
                "Rezervacija",
                tempFile.toFile());

        Files.delete(tempFile);
    }


}
