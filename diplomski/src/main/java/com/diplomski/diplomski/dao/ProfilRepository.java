package com.diplomski.diplomski.dao;

import com.diplomski.diplomski.entity.Profil;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfilRepository extends JpaRepository<Profil, Integer> {

    Optional<Profil> findByUsername(String username);
}
