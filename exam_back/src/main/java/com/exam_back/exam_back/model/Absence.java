package com.exam_back.exam_back.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name="absence")
public class Absence {
    @Id
    @GeneratedValue
    @Column(name="absence_id")
    private Long id;

    private Date date;

    @ManyToOne
    @JoinColumn(name="employe_id", nullable = false)
    @JsonIgnoreProperties("absences")
    private Employe employe;

    public Absence() {}

    public Absence(Date date, Employe employe){
        this.date = date;
        this.employe = employe;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Employe getEmploye() {
        return employe;
    }

    public void setEmploye(Employe employe) {
        this.employe = employe;
    }
}
