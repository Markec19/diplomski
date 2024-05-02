package com.diplomski.diplomski.service.impl;

import com.diplomski.diplomski.dao.RezervacijaRepository;
import com.diplomski.diplomski.dto.ProfilDto;
import com.diplomski.diplomski.dto.RezervacijaDto;
import com.diplomski.diplomski.entity.Profil;
import com.diplomski.diplomski.entity.Rezervacija;
import com.diplomski.diplomski.entity.Sala;
import com.diplomski.diplomski.entity.Status;
import com.diplomski.diplomski.service.EntityService;
import com.diplomski.diplomski.service.ProfilService;
import com.diplomski.diplomski.service.RezervacijaService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.stereotype.Service;

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
        rezervacija.setDatumObrade(null);
        rezervacija.setStatus((Status) statusService.findById(1));

        ProfilDto profilDto = profilService.findByUsername(rezervacijaDto.getUsername());
        Profil profil = profilService.findById(profilDto.getProfilId());
        rezervacija.setProfil(profil);

        return repository.save(rezervacija);
    }



    @Override
    public Rezervacija obradiRezervaciju(RezervacijaDto rezervacijaDto) throws Exception {
        ProfilDto profilDto = profilService.findByUsername(rezervacijaDto.getUsername());
        Profil profil = profilService.findById(profilDto.getProfilId());

        if(profil.getRola().getRola().equals("admin")){
            Rezervacija rezervacija = findById(rezervacijaDto.getRezervacija().getrezervacijaId());
            rezervacija.setDatumObrade(rezervacijaDto.getRezervacija().getDatumObrade());
            rezervacija.setAdmin(profil);

            if(rezervacija.getStatus().getStatus().equals("cekanje")){
                rezervacija.setStatus(rezervacijaDto.getRezervacija().getStatus());
                return repository.save(rezervacija);
            } else throw new Exception("Rezervacija je vec obradjena!");
        } else {
            throw new Exception("Korisnik ne moze da obradjuje rezervacije!");
        }
    }
}
