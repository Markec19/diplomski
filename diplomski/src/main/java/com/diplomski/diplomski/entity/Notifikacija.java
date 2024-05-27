package com.diplomski.diplomski.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="notifikacija")
public class Notifikacija {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int notifikacijaId;

    @Column(name = "notifikacija")
    private String notifikacija;

    //    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH})
    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "rezervacija_id")
    //@JsonIgnore
    private Rezervacija rezervacija;

    public Notifikacija() {
    }

    public Notifikacija(String notifikacija, Rezervacija rezervacija) {
        this.notifikacija = notifikacija;
        this.rezervacija = rezervacija;
    }

    public int getNotifikacijaId() {
        return notifikacijaId;
    }

    public void setNotifikacijaId(int notifikacijaId) {
        this.notifikacijaId = notifikacijaId;
    }

    public String getNotifikacija() {
        return notifikacija;
    }

    public void setNotifikacija(String notifikacija) {
        this.notifikacija = notifikacija;
    }

    public Rezervacija getRezervacija() {
        return rezervacija;
    }

    public void setRezervacija(Rezervacija rezervacija) {
        this.rezervacija = rezervacija;
    }
}
