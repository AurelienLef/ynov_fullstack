package com.exam_back.exam_back.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import java.util.Date;

@Entity
public class Candidat {

    @Id
    @GeneratedValue
    private Long id;

    private String nom;
    private String adresse;
    private String email;
    private String num_id;
    private Date naissance;
    private String tel;
    private String domaine;
    private String note;
    private Date entretien;
    private String observation;

    public Candidat() {}

    public Candidat(String nom, String adresse, String email, String num_id, Date naissance, String tel, String domaine, String note, Date entretien, String observation) {
        this.nom = nom;
        this.adresse = adresse;
        this.email = email;
        this.num_id = num_id;
        this.naissance = naissance;
        this.tel = tel;
        this.domaine = domaine;
        this.note = note;
        this.entretien = entretien;
        this.observation = observation;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNum_id() {
        return num_id;
    }

    public void setNum_id(String num_id) {
        this.num_id = num_id;
    }

    public Date getNaissance() {
        return naissance;
    }

    public void setNaissance(Date naissance) {
        this.naissance = naissance;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getDomaine() {
        return domaine;
    }

    public void setDomaine(String domaine) {
        this.domaine = domaine;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Date getEntretien() {
        return entretien;
    }

    public void setEntretien(Date entretien) {
        this.entretien = entretien;
    }

    public String getObservation() {
        return observation;
    }

    public void setObservation(String observation) {
        this.observation = observation;
    }
}
