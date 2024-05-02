package com.diplomski.diplomski.service.impl;

import com.diplomski.diplomski.dao.PredmetRepository;
import com.diplomski.diplomski.entity.Predmet;
import com.diplomski.diplomski.service.EntityService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PredmetServiceImpl implements EntityService<Predmet> {

    private PredmetRepository repository;

    public PredmetServiceImpl(PredmetRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Predmet> findAll() {
        return repository.findAll();
    }

    @Override
    public Predmet findById(int id) {
        Optional<Predmet> result = repository.findById(id);
        Predmet obj = null;
        if(result.isPresent()){
            obj = result.get();
        }else{
            throw new RuntimeException("Predmet sa id: " + id +" nije pronadjen");
        }
        return obj;
    }
}
