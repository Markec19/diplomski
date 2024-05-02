package com.diplomski.diplomski.service.impl;

import com.diplomski.diplomski.dao.RolaRepository;
import com.diplomski.diplomski.dao.StatusRepository;
import com.diplomski.diplomski.entity.Rola;
import com.diplomski.diplomski.entity.Status;
import com.diplomski.diplomski.service.EntityService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RolaServiceImpl implements EntityService<Rola> {

    private RolaRepository repository;

    public RolaServiceImpl(RolaRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Rola> findAll() {
        return repository.findAll();
    }

    @Override
    public Rola findById(int id) {
        Optional<Rola> result = repository.findById(id);
        Rola obj = null;
        if(result.isPresent()){
            obj = result.get();
        }else{
            throw new RuntimeException("Rola sa id: " + id +" nije pronadjena");
        }
        return obj;
    }
}
