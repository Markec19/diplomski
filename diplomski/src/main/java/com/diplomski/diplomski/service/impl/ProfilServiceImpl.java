package com.diplomski.diplomski.service.impl;

import com.diplomski.diplomski.dao.ProfilRepository;
import com.diplomski.diplomski.dto.CredentialsDto;
import com.diplomski.diplomski.dto.ProfilDto;
import com.diplomski.diplomski.entity.Profil;
import com.diplomski.diplomski.entity.Rola;
import com.diplomski.diplomski.mapper.ProfilMapper;
import com.diplomski.diplomski.service.EntityService;
import com.diplomski.diplomski.service.ProfilService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.CharBuffer;
import java.util.List;
import java.util.Optional;

@Service
//@RequiredArgsConstructor
public class ProfilServiceImpl implements ProfilService {

    private ProfilRepository repository;

    private final PasswordEncoder passwordEncoder;

    private final ProfilMapper profilMapper;
    private EntityManager entityManager;

    public ProfilServiceImpl(ProfilRepository repository, PasswordEncoder passwordEncoder,
                             ProfilMapper profilMapper,
                             EntityManager entityManager) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.profilMapper = profilMapper;
        this.entityManager = entityManager;
    }

    @Override
    public List findAll() {
        return repository.findAll();
    }

    @Override
    public Profil findById(int id) {
        Optional<Profil> result = repository.findById(id);
        Profil obj = null;
        if(result.isPresent()){
            obj = result.get();
        }else{
            throw new RuntimeException("Profil sa id: " + id +" nije pronadjen");
        }
        return obj;
    }

    @Override
    public ProfilDto login(CredentialsDto credentialsDto) throws Exception {
        Profil profil = repository.findByUsername(credentialsDto.username())
                .orElseThrow(() -> new Exception("Unknown user"));
        if(passwordEncoder.matches(CharBuffer.wrap(credentialsDto.password()),
                profil.getPassword())) {
            return profilMapper.toProfilDto(profil);
        }
        throw new Exception("Invalid password");

    }

    @Override
    public ProfilDto findByUsername(String username) throws Exception {
        Profil profil = repository.findByUsername(username)
                .orElseThrow(() -> new Exception("Unknown user"));
        return profilMapper.toProfilDto(profil);
    }

//    @Override
//    public Profil vratiProfil(String username) {
//        TypedQuery<Profil> query = entityManager.createQuery("SELECT p FROM Profil p WHERE p.username = :username", Profil.class);
//        query.setParameter("username", username);
//        return query.getResultList().get(0);
//    }
}
