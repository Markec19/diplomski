package com.diplomski.diplomski.service;

import java.util.List;

public interface EntityService<Class>{
    List<Class> findAll();

    Class findById(int id);
}
