package com.diplomski.diplomski.service.impl;

import com.diplomski.diplomski.dao.RezervacijaRepository;
import com.diplomski.diplomski.dto.ProfilDto;
import com.diplomski.diplomski.dto.RezervacijaDto;
import com.diplomski.diplomski.entity.*;
import com.diplomski.diplomski.service.EntityService;
import com.diplomski.diplomski.service.ProfilService;
import com.diplomski.diplomski.service.RezervacijaService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class RezervacijaServiceImpl implements RezervacijaService {

    private RezervacijaRepository repository;
    private EntityService statusService;
    private ProfilService profilService;
    private EntityManager entityManager;

    public RezervacijaServiceImpl(RezervacijaRepository repository, StatusServiceImpl statusService, ProfilServiceImpl profilService, EntityManager entityManager) {
        this.repository = repository;
        this.statusService = statusService;
        this.profilService = profilService;
        this.entityManager = entityManager;
    }

    @Override
    public List<Rezervacija> findAll() {

        return repository.findAll();
    }

    @Override
    public Rezervacija findById(int id) {
        Optional<Rezervacija> result = repository.findById(id);
        Rezervacija obj = null;
        if(result.isPresent()){
            obj = result.get();
        }else{
            throw new RuntimeException("Rezervacija sa id: " + id +" nije pronadjena");
        }
        return obj;
    }

    @Override
    public Rezervacija dodajRezervaciju(RezervacijaDto rezervacijaDto) throws Exception {
        Rezervacija rezervacija = rezervacijaDto.getRezervacija();

        ProfilDto profilDto = profilService.findByUsername(rezervacijaDto.getUsername());
        Profil profil = profilService.findById(profilDto.getProfilId());
        rezervacija.setProfil(profil);

        if(profil.getRola().getRola().equals("korisnik")) {
            rezervacija.setStatus((Status) statusService.findById(1));
            rezervacija.setDatumObrade(null);
        }
        if(profil.getRola().getRola().equals("admin")) {
            rezervacija.setStatus((Status) statusService.findById(2));
            rezervacija.setAdmin(profil);
            rezervacija.setDatumObrade(rezervacija.getDatumSlanjaZahteva());
        }

        return repository.save(rezervacija);
    }



    @Override
    public Rezervacija obradiRezervaciju(RezervacijaDto rezervacijaDto) throws Exception {
        ProfilDto profilDto = profilService.findByUsername(rezervacijaDto.getUsername());
        Profil profil = profilService.findById(profilDto.getProfilId());
        Status status = rezervacijaDto.getRezervacija().getStatus();

        if(profil.getRola().getRola().equals("admin")){
            Rezervacija rezervacija = findById(rezervacijaDto.getRezervacija().getrezervacijaId());
            rezervacija.setDatumObrade(rezervacijaDto.getRezervacija().getDatumObrade());
            rezervacija.setAdmin(profil);

            if(rezervacija.getStatus().getStatus().equals("cekanje")){
                rezervacija.setStatus(status);

                if(status.getStatus().equals("prihvacena"))
                    return repository.save(rezervacija);

                if(status.getStatus().equals("odbijena") && rezervacijaDto.getRezervacija().getRazlogOdbijanja() != null){
                    rezervacija.setRazlogOdbijanja(rezervacijaDto.getRezervacija().getRazlogOdbijanja());
                    return repository.save(rezervacija);
                } else throw new Exception("Nije unet razlog odbijanja!");

            } else throw new Exception("Rezervacija je vec obradjena!");
        } else {
            throw new Exception("Korisnik ne moze da obradjuje rezervacije!");
        }
    }

    @Override
    public List<Rezervacija> vratiRezervacijeKorisnika(String username) throws Exception {
        ProfilDto profilDto = profilService.findByUsername(username);
        Profil profil = profilService.findById(profilDto.getProfilId());

        TypedQuery<Rezervacija> query = entityManager.createQuery("SELECT r FROM Rezervacija r " +
                "WHERE r.profil = :profil", Rezervacija.class);
        query.setParameter("profil", profil);

       return query.getResultList();
    }

    @Override
    public Rezervacija odjaviRezervaciju(RezervacijaDto rezervacijaDto) throws Exception {
        Rezervacija rezervacija = findById(rezervacijaDto.getRezervacija().getrezervacijaId());
        rezervacija.setStatus((Status) statusService.findById(4));

        return repository.save(rezervacija);
    }

    @Override
    public List<Rezervacija> vratiRezervacijeZaDan(Date datum) throws Exception {
        TypedQuery<Rezervacija> query = entityManager.createQuery("SELECT r FROM Rezervacija r " +
                "WHERE r.datumRezervacije = :datum", Rezervacija.class);
        query.setParameter("datum", datum);
        return query.getResultList();
    }
}
