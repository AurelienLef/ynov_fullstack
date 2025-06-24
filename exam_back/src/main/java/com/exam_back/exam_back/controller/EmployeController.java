package com.exam_back.exam_back.controller;

import com.exam_back.exam_back.model.Employe;
import com.exam_back.exam_back.service.EmployeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employes")
public class EmployeController {
    @Autowired
    private EmployeService employeService;

    @GetMapping
    public List<Employe> findAll() {
        return this.employeService.findAll();
    }

    @GetMapping("/{id}")
    public Employe findById(@PathVariable Long id) {
        return this.employeService.findById(id);
    }

    @PostMapping
    public Employe save(@RequestBody Employe employe){
        return this.employeService.save(employe);
    }

    @PutMapping("/{id}")
    public Employe update(@PathVariable Long id, @RequestBody Employe employe) {
        return this.employeService.update(id, employe);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        this.employeService.delete(id);
    }
}
