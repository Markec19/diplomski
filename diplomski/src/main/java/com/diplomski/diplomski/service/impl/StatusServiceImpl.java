package com.diplomski.diplomski.service.impl;

import com.diplomski.diplomski.dao.StatusRepository;
import com.diplomski.diplomski.entity.Status;
import com.diplomski.diplomski.entity.TipSale;
import com.diplomski.diplomski.service.EntityService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StatusServiceImpl implements EntityService<Status> {

    private StatusRepository repository;

    public StatusServiceImpl(StatusRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Status> findAll() {
        return repository.findAll();
    }

    @Override
    public Status findById(int id) {
        Optional<Status> result = repository.findById(id);
        Status obj = null;
        if(result.isPresent()){
            obj = result.get();
        }else{
            throw new RuntimeException("Status sa id: " + id +" nije pronadjen");
        }
        return obj;
    }
}
