package com.diplomski.diplomski.dao;

import com.diplomski.diplomski.entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatusRepository extends JpaRepository<Status, Integer> {
}
