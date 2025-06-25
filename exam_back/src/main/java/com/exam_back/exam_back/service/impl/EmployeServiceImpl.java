package com.exam_back.exam_back.service.impl;

import com.exam_back.exam_back.model.Employe;
import com.exam_back.exam_back.repository.EmployeRepository;
import com.exam_back.exam_back.service.EmployeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EmployeServiceImpl implements EmployeService {
    @Autowired
    private EmployeRepository employeRepository;

    @Override
    public Employe save(Employe entity) {
        return employeRepository.save(entity);
    }

    @Override
    public Employe findById(Long id) {
        return employeRepository.findById(id).get();
    }

    @Override
    public List<Employe> findAll() {
        return employeRepository.findAll();
    }

    @Override
    public Employe update(Long id, Employe entity) {
        if(employeRepository.existsById(id)) {
            return employeRepository.save(entity);
        }
        throw new IllegalArgumentException("Employe not found");
    }

    @Override
    public void delete(Long aLong) {
        employeRepository.deleteById(aLong);
    }
}
