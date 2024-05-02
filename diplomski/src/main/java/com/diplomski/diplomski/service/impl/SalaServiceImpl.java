package com.diplomski.diplomski.service.impl;

import com.diplomski.diplomski.dao.SalaRepository;
import com.diplomski.diplomski.entity.Rola;
import com.diplomski.diplomski.entity.Sala;
import com.diplomski.diplomski.service.EntityService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SalaServiceImpl implements EntityService<Sala> {

    private SalaRepository repository;

    public SalaServiceImpl(SalaRepository repository) {
        this.repository = repository;
    }


    @Override
    public List findAll() {
        return repository.findAll();
    }

    @Override
    public Sala findById(int id) {
        Optional<Sala> result = repository.findById(id);
        Sala obj = null;
        if(result.isPresent()){
            obj = result.get();
        }else{
            throw new RuntimeException("Sala sa id: " + id +" nije pronadjena");
        }
        return obj;
    }
}
