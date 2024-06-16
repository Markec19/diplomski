package com.diplomski.diplomski.rest;

import com.diplomski.diplomski.dto.CredentialsDto;
import com.diplomski.diplomski.entity.Notifikacija;
import com.diplomski.diplomski.entity.Rezervacija;
import com.diplomski.diplomski.service.NotifikacijaService;
import com.diplomski.diplomski.service.impl.NotifikacijaServiceImpl;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/notifikacije")
public class NotifikacijaController {

    private static NotifikacijaService notifikacijaService;

    public NotifikacijaController(NotifikacijaServiceImpl notifikacijaService) {
        this.notifikacijaService = notifikacijaService;
    }

    @PostMapping("/notifikacija")
    public List<Notifikacija> vratiNotifikacije(@RequestBody CredentialsDto credentialsDto) {
        List<Notifikacija> notifikacije = notifikacijaService.vratiSveNotifikacijeKorisnika(credentialsDto.username());
        return notifikacije;
    }



    public static void sacuvajNotifikaciju(Rezervacija rez) throws Exception {
        Notifikacija notifikacija = new Notifikacija();
        notifikacija.setRezervacija(rez);
        notifikacija.setNotifikacija("Kreirana je nova rezervacija za dan: " + rez.getDatumRezervacije() + ", u sali: " + rez.getSala().getSala());

        notifikacijaService.sacuvajNotifikaciju(notifikacija);
    }

    public static void izmeniNotifikaciju(Rezervacija rez) throws Exception {
        Notifikacija notifikacija = notifikacijaService.findById(rez.getNotifikacija().getNotifikacijaId());
        notifikacija.setNotifikacija("Rezervacija je : " + rez.getStatus().getStatus());

        notifikacijaService.sacuvajNotifikaciju(notifikacija);
    }


}
