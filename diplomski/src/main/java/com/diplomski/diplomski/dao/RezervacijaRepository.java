package com.diplomski.diplomski.dao;

import com.diplomski.diplomski.entity.Rezervacija;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RezervacijaRepository extends JpaRepository<Rezervacija, Integer> {
}
