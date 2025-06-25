package com.exam_back.exam_back.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="employe")
public class Employe {

    @Id
    @GeneratedValue
    @Column(name="employe_id")
    private Long id;

    private String nom;
    private String adresse;
    private String email;
    private String num_id;
    private Date naissance;
    private String tel;
    private String poste;
    private String salaire;
    private Date debut;
    private Date fin;
    private String observation;


    @OneToMany(mappedBy = "employe", fetch = FetchType.EAGER,  cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JsonIgnoreProperties("employe")
    private Set<Absence> absences = new HashSet<>();

    @OneToMany(mappedBy = "employe", fetch = FetchType.EAGER,  cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JsonIgnoreProperties("employe")
    private Set<Conges> conges = new HashSet<>();

    public Employe() {}

    public Employe(String nom, String email, String num_id, Date naissance, String tel, String poste, String salaire, Date debut, Date fin, String observation, Set<Absence> absences, Set<Conges> conges) {
        this.nom = nom;
        this.email = email;
        this.num_id = num_id;
        this.naissance = naissance;
        this.tel = tel;
        this.poste = poste;
        this.salaire = salaire;
        this.debut = debut;
        this.fin = fin;
        this.observation = observation;
        this.absences = absences;
        this.conges = conges;
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

    public String getPoste() {
        return poste;
    }

    public void setPoste(String poste) {
        this.poste = poste;
    }

    public String getSalaire() {
        return salaire;
    }

    public void setSalaire(String salaire) {
        this.salaire = salaire;
    }

    public Date getDebut() {
        return debut;
    }

    public void setDebut(Date debut) {
        this.debut = debut;
    }

    public Date getFin() {
        return fin;
    }

    public void setFin(Date fin) {
        this.fin = fin;
    }

    public String getObservation() {
        return observation;
    }

    public void setObservation(String observation) {
        this.observation = observation;
    }

    public Set<Absence> getAbsences() {
        return absences;
    }

    public void setAbsences(Set<Absence> absences) {
        this.absences = absences;
    }

    public Set<Conges> getConges() {
        return conges;
    }

    public void setConges(Set<Conges> conges) {
        this.conges = conges;
    }
}
