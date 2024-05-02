package com.diplomski.diplomski.service.impl;

import com.diplomski.diplomski.dao.TipSaleRepository;
import com.diplomski.diplomski.entity.Rola;
import com.diplomski.diplomski.entity.TipSale;
import com.diplomski.diplomski.service.EntityService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TipSaleServiceImpl implements EntityService<TipSale> {

    private TipSaleRepository repository;

    public TipSaleServiceImpl(TipSaleRepository tipSaleRepository) {
        this.repository = tipSaleRepository;
    }

    @Override
    public List<TipSale> findAll() {
        return repository.findAll();
    }

    @Override
    public TipSale findById(int id) {
        Optional<TipSale> result = repository.findById(id);
        TipSale obj = null;
        if(result.isPresent()){
            obj = result.get();
        }else{
            throw new RuntimeException("Tip sale sa id: " + id +" nije pronadjen");
        }
        return obj;
    }
}
