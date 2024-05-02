package com.diplomski.diplomski.service.impl;

import com.diplomski.diplomski.dao.TipRezervacijeRepository;
import com.diplomski.diplomski.entity.Rola;
import com.diplomski.diplomski.entity.TipRezervacije;
import com.diplomski.diplomski.service.EntityService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TipRezervacijeServiceImpl implements EntityService<TipRezervacije> {

    private TipRezervacijeRepository repository;

    public TipRezervacijeServiceImpl(TipRezervacijeRepository repository) {
        this.repository = repository;
    }


    @Override
    public List<TipRezervacije> findAll() {
        return repository.findAll();
    }

    @Override
    public TipRezervacije findById(int id) {
        Optional<TipRezervacije> result = repository.findById(id);
        TipRezervacije obj = null;
        if(result.isPresent()){
            obj = result.get();
        }else{
            throw new RuntimeException("Tip rezervacije sa id: " + id +" nije pronadjen");
        }
        return obj;
    }
}
