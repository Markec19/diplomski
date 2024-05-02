package com.diplomski.diplomski.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;

import java.sql.Date;

@Entity
@Table(name="rezervacija")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "rezervacijaId")
public class Rezervacija {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int rezervacijaId;

    @Column(name = "vreme_pocetka")
    private String vremePocetka;


    @Column(name = "vreme_zavrsetka")
    private String vremeZavrsetka;

    @Column(name = "datum_rezervacije")
    private Date datumRezervacije;

    @Column(name = "datum_slanja_zahteva")
    private Date datumSlanjaZahteva;


    @Column(name = "datum_obrade")
    private Date datumObrade;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "korisnik_id")
    //@JsonBackReference
    private Profil profil;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "admin_id")
    //@JsonBackReference
    private Profil admin;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "predmet_id")
    //@JsonBackReference
    private Predmet predmet;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "status_id")
    //@JsonBackReference
    private Status status;

//    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH})
//    @JoinColumn(name = "tip_id")
//    private TipRezervacije tipRezervacije;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "podtip_id")
    //@JsonBackReference
    private PodtipRezervacije podtipRezervacije;

    //@ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH})
    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "sala_id")
    //@JsonBackReference
    private Sala sala;

    public Rezervacija() {
    }


    public Rezervacija(String vremePocetka, String vremeZavrsetka, Date datumRezervacije, Date datumSlanjaZahteva, Date datumObrade, Profil profil, Profil admin,
                       Predmet predmet, Status status, PodtipRezervacije podtipRezervacije, Sala sala) {
        this.vremePocetka = vremePocetka;
        this.vremeZavrsetka = vremeZavrsetka;
        this.datumRezervacije = datumRezervacije;
        this.datumSlanjaZahteva = datumSlanjaZahteva;
        this.datumObrade = datumObrade;
        this.profil = profil;
        this.admin = admin;
        this.predmet = predmet;
        this.status = status;
        this.podtipRezervacije = podtipRezervacije;
        this.sala = sala;
    }

    public Rezervacija(int rezervacijaId, String vremePocetka, String vremeZavrsetka, Date datumRezervacije, Date datumSlanjaZahteva,
                       Profil profil, Profil admin, Predmet predmet, Status status, PodtipRezervacije podtipRezervacije, Sala sala) {
        this.rezervacijaId = rezervacijaId;
        this.vremePocetka = vremePocetka;
        this.vremeZavrsetka = vremeZavrsetka;
        this.datumRezervacije = datumRezervacije;
        this.datumSlanjaZahteva = datumSlanjaZahteva;
        this.profil = profil;
        this.admin = admin;
        this.predmet = predmet;
        this.status = status;
        this.podtipRezervacije = podtipRezervacije;
        this.sala = sala;
    }

    public int getrezervacijaId() {
        return rezervacijaId;
    }

    public void setrezervacijaId(int id) {
        this.rezervacijaId = id;
    }

    public String getVremePocetka() {
        return vremePocetka;
    }

    public void setVremePocetka(String vremePocetka) {
        this.vremePocetka = vremePocetka;
    }

    public String getVremeZavrsetka() {
        return vremeZavrsetka;
    }

    public void setVremeZavrsetka(String vremeZavrsetka) {
        this.vremeZavrsetka = vremeZavrsetka;
    }

    public Date getDatumRezervacije() {
        return datumRezervacije;
    }

    public void setDatumRezervacije(Date datumRezervacije) {
        this.datumRezervacije = datumRezervacije;
    }

    public Date getDatumSlanjaZahteva() {
        return datumSlanjaZahteva;
    }

    public void setDatumSlanjaZahteva(Date datumSlanjaZahteva) {
        this.datumSlanjaZahteva = datumSlanjaZahteva;
    }

    public Date getDatumObrade() {
        return datumObrade;
    }

    public void setDatumObrade(Date datumObrade) {
        this.datumObrade = datumObrade;
    }

    public Profil getProfil() {
        return profil;
    }

    public void setProfil(Profil profil) {
        this.profil = profil;
    }

    public Profil getAdmin() {
        return admin;
    }

    public void setAdmin(Profil admin) {
        this.admin = admin;
    }

    public Predmet getPredmet() {
        return predmet;
    }

    public void setPredmet(Predmet predmet) {
        this.predmet = predmet;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

//    public TipRezervacije getTipRezervacije() {
//        return tipRezervacije;
//    }
//
//    public void setTipRezervacije(TipRezervacije tipRezervacije) {
//        this.tipRezervacije = tipRezervacije;
//    }

    public PodtipRezervacije getPodtipRezervacije() {
        return podtipRezervacije;
    }

    public void setPodtipRezervacije(PodtipRezervacije podtipRezervacije) {
        this.podtipRezervacije = podtipRezervacije;
    }

    public Sala getSala() {
        return sala;
    }

    public void setSala(Sala sala) {
        this.sala = sala;
    }
}
