package com.exam_back.exam_back.repository;

import com.exam_back.exam_back.model.Employe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeRepository extends JpaRepository<Employe, Long> {
}
