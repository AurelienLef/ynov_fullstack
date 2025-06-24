package com.exam_back.exam_back.repository;

import com.exam_back.exam_back.model.Candidat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CandidatRepository extends JpaRepository<Candidat, Long> {
}
