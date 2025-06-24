package com.exam_back.exam_back.controller;

import com.exam_back.exam_back.model.Candidat;
import com.exam_back.exam_back.service.CandidatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/candidats")
public class CandidatController {
    @Autowired
    private CandidatService candidatService;

    @GetMapping
    public List<Candidat> findAll() {
        return candidatService.findAll();
    }

    @GetMapping("/{id}")
    public Candidat findById(@PathVariable Long id) {
        return candidatService.findById(id);
    }

    @PostMapping
    public Candidat save(@RequestBody Candidat candidat) {
        return candidatService.save(candidat);
    }

    @PutMapping("/{id}")
    public Candidat update(@PathVariable Long id, @RequestBody Candidat candidat) {
        return candidatService.update(id, candidat);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        candidatService.delete(id);
    }
}
