package com.exam_back.exam_back.controller;

import com.exam_back.exam_back.model.Conges;
import com.exam_back.exam_back.service.CongesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/conges")
public class CongesController {
    @Autowired
    private CongesService congesService;

    @GetMapping
    public List<Conges> getAll() {
        return congesService.findAll();
    }

    @GetMapping("/{id}")
    public Conges getById(@PathVariable Long id) {
        return congesService.findById(id);
    }

    @PostMapping
    public Conges save(@RequestBody Conges conges) {
        return congesService.save(conges);
    }

    @PutMapping("/{id}")
    public Conges update(@PathVariable Long id, @RequestBody Conges conges) {
        return congesService.update(id, conges);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        congesService.delete(id);
    }
}
