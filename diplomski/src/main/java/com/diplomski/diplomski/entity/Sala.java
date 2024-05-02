package com.diplomski.diplomski.entity;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="sala")
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Sala {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int salaId;

    @Column(name = "sala")
    private String sala;

//    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH})
    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "tip_id")
    //@JsonBackReference
    private TipSale tipSale;

//    @OneToMany(mappedBy = "sala",
//            cascade = {CascadeType.PERSIST, CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH})
    @OneToMany(mappedBy = "sala",
        cascade = CascadeType.MERGE)
//    @JsonManagedReference
//    @JsonIgnoreProperties("sala")
    @JsonIgnore
    private List<Rezervacija> rezervacije;

    public Sala() {
    }

    public Sala(String sala, TipSale tipSale) {
        this.sala = sala;
        this.tipSale = tipSale;
    }

    public int getsalaId() {
        return salaId;
    }

    public void setsalaId(int id) {
        this.salaId = id;
    }

    public String getSala() {
        return sala;
    }

    public void setSala(String sala) {
        this.sala = sala;
    }

    public TipSale getTipSale() {
        return tipSale;
    }

    public void setTipSale(TipSale tipSale) {
        this.tipSale = tipSale;
    }

    public List<Rezervacija> getRezervacije() {
        return rezervacije;
    }

    public void setRezervacije(List<Rezervacija> rezervacije) {
        this.rezervacije = rezervacije;
    }
}
