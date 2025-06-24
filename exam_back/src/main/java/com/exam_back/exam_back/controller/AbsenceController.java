package com.exam_back.exam_back.controller;

import com.exam_back.exam_back.model.Absence;
import com.exam_back.exam_back.model.Employe;
import com.exam_back.exam_back.service.AbsenceService;
import com.exam_back.exam_back.service.EmployeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/absences")
public class AbsenceController {
    @Autowired
    private AbsenceService absenceService;

    @Autowired
    private EmployeService employeService;

    @GetMapping
    public List<Absence> getAll() {
        return absenceService.findAll();
    }

    @GetMapping("/{id}")
    public Absence getById(@PathVariable Long id) {
        return absenceService.findById(id);
    }

    @PostMapping
    public Absence save(@RequestBody Absence absence) {
        Employe employe = employeService.findById(absence.getEmploye().getId());

        Absence absenceSave = new Absence();
        absenceSave.setId(absence.getId());
        absenceSave.setDate(absence.getDate());
        absenceSave.setEmploye(employe);

        return absenceService.save(absenceSave);
    }

    @PutMapping("/{id}")
    public Absence update(@PathVariable Long id, @RequestBody Absence absence) {
        return absenceService.update(id, absence);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        absenceService.delete(id);
    }
}
