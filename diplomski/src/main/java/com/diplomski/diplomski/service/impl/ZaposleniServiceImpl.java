package com.diplomski.diplomski.service.impl;

import com.diplomski.diplomski.dao.ZaposleniRepository;
import com.diplomski.diplomski.entity.Rola;
import com.diplomski.diplomski.entity.Zaposleni;
import com.diplomski.diplomski.service.EntityService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ZaposleniServiceImpl implements EntityService<Zaposleni> {

    private ZaposleniRepository repository;

    public ZaposleniServiceImpl(ZaposleniRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Zaposleni> findAll() {
        return repository.findAll();
    }

    @Override
    public Zaposleni findById(int id) {
        Optional<Zaposleni> result = repository.findById(id);
        Zaposleni obj = null;
        if(result.isPresent()){
            obj = result.get();
        }else{
            throw new RuntimeException("Zaposleni sa id: " + id +" nije pronadjen");
        }
        return obj;
    }
}
