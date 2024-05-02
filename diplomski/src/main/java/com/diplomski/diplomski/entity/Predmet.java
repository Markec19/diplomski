package com.diplomski.diplomski.entity;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="predmet")
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Predmet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int predmetId;

    @Column(name = "predmet")
    private String predmet;

    @OneToMany(mappedBy = "predmet",
            cascade = CascadeType.MERGE)
//    @JsonManagedReference
//    @JsonIgnoreProperties("predmet")
    @JsonIgnore
    private List<Rezervacija> rezervacije;

    public Predmet() {
    }

    public Predmet(String predmet) {
        this.predmet = predmet;
    }

    public String getPredmet() {
        return predmet;
    }

    public void setPredmet(String predmet) {
        this.predmet = predmet;
    }

    public int getPredmetId() {
        return predmetId;
    }

    public void setPredmetId(int id) {
        this.predmetId = id;
    }

    public List<Rezervacija> getRezervacije() {
        return rezervacije;
    }

    public void setRezervacije(List<Rezervacija> rezervacije) {
        this.rezervacije = rezervacije;
    }
}
