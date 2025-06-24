package com.exam_back.exam_back.repository;

import com.exam_back.exam_back.model.Absence;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AbsenceRepository extends JpaRepository<Absence, Long> {
}
