package com.diplomski.diplomski.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;

@Entity
@Table(name="zaposleni")
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "zaposleniId")
public class Zaposleni {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int zaposleniId;

    @Column(name = "ime")
    private String ime;

    @Column(name = "prezime")
    private String prezime;

    @OneToOne(mappedBy = "zaposleni", cascade = CascadeType.MERGE)
    @JsonIgnore
    private Profil profil;


    public Zaposleni() {
    }

    public Zaposleni(String ime, String prezime) {
        this.ime = ime;
        this.prezime = prezime;
    }

    public int getzaposleniId() {
        return zaposleniId;
    }

    public void setzaposleniId(int id) {
        this.zaposleniId = id;
    }

    public String getIme() {
        return ime;
    }

    public void setIme(String ime) {
        this.ime = ime;
    }

    public String getPrezime() {
        return prezime;
    }

    public void setPrezime(String prezime) {
        this.prezime = prezime;
    }

    public Profil getProfil() {
        return profil;
    }

    public void setProfil(Profil profil) {
        this.profil = profil;
    }
}
