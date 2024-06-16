package com.diplomski.diplomski.service.impl;

import com.diplomski.diplomski.dao.NotifikacijaRepository;
import com.diplomski.diplomski.dto.ProfilDto;
import com.diplomski.diplomski.entity.Notifikacija;
import com.diplomski.diplomski.entity.Profil;
import com.diplomski.diplomski.service.NotifikacijaService;
import com.diplomski.diplomski.service.ProfilService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NotifikacijaServiceImpl implements NotifikacijaService {


    private NotifikacijaRepository repository;
    private ProfilService profilService;
    private EntityManager entityManager;

    public NotifikacijaServiceImpl(NotifikacijaRepository repository, ProfilServiceImpl profilService, EntityManager entityManager) {
        this.repository = repository;
        this.profilService = profilService;
        this.entityManager = entityManager;
    }

    @Override
    public List findAll() {
        return repository.findAll();
    }

    @Override
    public Notifikacija findById(int id) {
        Optional<Notifikacija> result = repository.findById(id);
        Notifikacija obj = null;
        if(result.isPresent()){
            obj = result.get();
        }else{
            throw new RuntimeException("Notifikacija sa id: " + id +" nije pronadjena");
        }
        return obj;
    }

    @Override
    public Notifikacija sacuvajNotifikaciju(Notifikacija notifikacija) throws Exception {
        return repository.save(notifikacija);
    }

    @SneakyThrows
    @Override
    public List<Notifikacija> vratiSveNotifikacijeKorisnika(String username) {
        ProfilDto profilDto = profilService.findByUsername(username);
        Profil profil = profilService.findById(profilDto.getProfilId());


        if(profil.getRola().getRola().equals("korisnik")){
            TypedQuery<Notifikacija> query = entityManager.createQuery("SELECT n FROM Notifikacija n " +
                    "INNER JOIN n.rezervacija r WHERE r.profil = :profil AND r.admin IS NOT NULL", Notifikacija.class);
            query.setParameter("profil", profil);

            List<Notifikacija> resultList = query.getResultList();
            return resultList;
        } else{
            TypedQuery<Notifikacija> query = entityManager.createQuery("SELECT n FROM Notifikacija n INNER JOIN Rezervacija r " +
                    "ON r.rezervacijaId = n.rezervacija.rezervacijaId WHERE r.admin IS NULL", Notifikacija.class);

            return query.getResultList();
        }

    }
}
