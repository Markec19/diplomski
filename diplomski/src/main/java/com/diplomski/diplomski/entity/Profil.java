package com.diplomski.diplomski.entity;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="profil")
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Profil {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int profilId;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "zaposleni_id")
    //@JsonIgnore
    private Zaposleni zaposleni;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "rola_id")
    //@JsonBackReference
    private Rola rola;

    @OneToMany(mappedBy = "profil",
            cascade = CascadeType.MERGE)
//    @JsonManagedReference
//    @JsonIgnoreProperties("profil")
    @JsonIgnore
    private List<Rezervacija> rezervacije;

//    private String email = "lukam0716@gmail.com";

    public Profil() {
    }

    public Profil(String username, String password, Zaposleni zaposleni, Rola rola) {
        this.username = username;
        this.password = password;
        this.zaposleni = zaposleni;
        this.rola = rola;
    }

    public int getprofilId() {
        return profilId;
    }

    public void setprofilId(int id) {
        this.profilId = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Zaposleni getZaposleni() {
        return zaposleni;
    }

    public void setZaposleni(Zaposleni zaposleni) {
        this.zaposleni = zaposleni;
    }

    public Rola getRola() {
        return rola;
    }

    public void setRola(Rola rola) {
        this.rola = rola;
    }

    public List<Rezervacija> getRezervacije() {
        return rezervacije;
    }

    public void setRezervacije(List<Rezervacija> rezervacije) {
        this.rezervacije = rezervacije;
    }

//    public String getEmail() {
//        return email;
//    }
//
//    public void setEmail(String email) {
//        this.email = email;
//    }
}
