package com.diplomski.diplomski.service;

import com.diplomski.diplomski.dto.RezervacijaDto;
import com.diplomski.diplomski.entity.Rezervacija;

import java.util.Date;
import java.util.List;

public interface RezervacijaService extends EntityService<Rezervacija> {

    Rezervacija dodajRezervaciju(RezervacijaDto rezervacija) throws Exception;

    Rezervacija obradiRezervaciju(RezervacijaDto rezervacija) throws Exception;

    List<Rezervacija> vratiRezervacijeKorisnika(String username) throws Exception;

    Rezervacija odjaviRezervaciju(RezervacijaDto rezervacijaDto) throws Exception;

    List<Rezervacija> vratiRezervacijeZaDan(Date datum) throws Exception;
}
