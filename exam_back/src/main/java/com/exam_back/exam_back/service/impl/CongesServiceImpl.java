package com.exam_back.exam_back.service.impl;

import com.exam_back.exam_back.model.Conges;
import com.exam_back.exam_back.repository.CongesRepository;
import com.exam_back.exam_back.service.CongesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CongesServiceImpl implements CongesService {
    @Autowired
    private CongesRepository congesRepository;

    @Override
    public Conges save(Conges entity) {
        return congesRepository.save(entity);
    }

    @Override
    public Conges findById(Long id) {
        return congesRepository.findById(id).get();
    }

    @Override
    public List<Conges> findAll() {
        return congesRepository.findAll();
    }

    @Override
    public Conges update(Long id, Conges entity) {
        if (congesRepository.existsById(id)) {
            return congesRepository.save(entity);
        }
        throw new IllegalArgumentException("Conges not found");
    }

    @Override
    public void delete(Long id) {
        congesRepository.deleteById(id);
    }
}
