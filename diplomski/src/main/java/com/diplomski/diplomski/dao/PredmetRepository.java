package com.diplomski.diplomski.dao;

import com.diplomski.diplomski.entity.Predmet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PredmetRepository extends JpaRepository<Predmet, Integer> {
}
