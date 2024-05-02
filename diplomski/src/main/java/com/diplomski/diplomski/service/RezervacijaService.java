package com.diplomski.diplomski.service;

import com.diplomski.diplomski.dto.RezervacijaDto;
import com.diplomski.diplomski.entity.Rezervacija;

public interface RezervacijaService extends EntityService<Rezervacija> {

    Rezervacija dodajRezervaciju(RezervacijaDto rezervacija) throws Exception;

    Rezervacija obradiRezervaciju(RezervacijaDto rezervacija) throws Exception;
}
