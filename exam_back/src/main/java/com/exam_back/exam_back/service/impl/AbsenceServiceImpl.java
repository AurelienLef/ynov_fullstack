package com.exam_back.exam_back.service.impl;

import com.exam_back.exam_back.model.Absence;
import com.exam_back.exam_back.repository.AbsenceRepository;
import com.exam_back.exam_back.service.AbsenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AbsenceServiceImpl implements AbsenceService {
    @Autowired
    private AbsenceRepository absenceRepository;

    @Override
    public Absence save(Absence entity) {
        return absenceRepository.save(entity);
    }

    @Override
    public Absence findById(Long id) {
        return absenceRepository.findById(id).get();
    }

    @Override
    public List<Absence> findAll() {
        return absenceRepository.findAll();
    }

    @Override
    public Absence update(Long id, Absence entity) {
        if (absenceRepository.existsById(id)){
            return absenceRepository.save(entity);
        }
        throw new IllegalArgumentException("Absence not found");
    }

    @Override
    public void delete(Long id) {
        absenceRepository.deleteById(id);
    }
}
