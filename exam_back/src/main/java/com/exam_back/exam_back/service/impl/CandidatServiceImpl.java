package com.exam_back.exam_back.service.impl;

import com.exam_back.exam_back.model.Candidat;
import com.exam_back.exam_back.repository.CandidatRepository;
import com.exam_back.exam_back.service.CandidatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CandidatServiceImpl implements CandidatService {
    @Autowired
    CandidatRepository candidatRepository;

    @Override
    public Candidat save(Candidat entity) {
        return candidatRepository.save(entity);
    }

    @Override
    public Candidat findById(Long id) {
        return candidatRepository.findById(id).get();
    }

    @Override
    public List<Candidat> findAll() {
        return candidatRepository.findAll();
    }

    @Override
    public Candidat update(Long id, Candidat entity) {
        if (candidatRepository.findById(id).isPresent()) {
            return candidatRepository.save(entity);
        }
        throw new IllegalArgumentException("Candidat not found") ;
    }

    @Override
    public void delete(Long id) {
        candidatRepository.deleteById(id);
    }
}
