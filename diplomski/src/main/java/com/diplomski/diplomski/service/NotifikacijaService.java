package com.diplomski.diplomski.service;

import com.diplomski.diplomski.dto.RezervacijaDto;
import com.diplomski.diplomski.entity.Notifikacija;
import com.diplomski.diplomski.entity.Profil;
import com.diplomski.diplomski.entity.Rezervacija;

import java.util.List;

public interface NotifikacijaService extends EntityService<Notifikacija> {

    Notifikacija sacuvajNotifikaciju(Notifikacija notifikacija) throws Exception;
    List<Notifikacija> vratiSveNotifikacijeKorisnika(String username);
}
