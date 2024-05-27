package com.diplomski.diplomski.service.impl;

import com.diplomski.diplomski.dao.PodtipRezervacijeRepository;
import com.diplomski.diplomski.entity.PodtipRezervacije;
import com.diplomski.diplomski.service.EntityService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PodtipRezervacijeServiceImpl implements EntityService<PodtipRezervacije> {

    private PodtipRezervacijeRepository repository;

    public PodtipRezervacijeServiceImpl(PodtipRezervacijeRepository repository) {
        this.repository = repository;
    }


    @Override
    public List<PodtipRezervacije> findAll() {
        return repository.findAll();
    }

    @Override
    public PodtipRezervacije findById(int id) {
        Optional<PodtipRezervacije> result = repository.findById(id);
        PodtipRezervacije obj = null;
        if(result.isPresent()){
            obj = result.get();
        }else{
            throw new RuntimeException("Podtip rezervacije sa id: " + id +" nije pronadjen");
        }
        return obj;
    }
}
