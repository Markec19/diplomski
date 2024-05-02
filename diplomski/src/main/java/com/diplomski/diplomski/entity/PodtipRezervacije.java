package com.diplomski.diplomski.entity;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="podtip_rezervacije")
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class PodtipRezervacije {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int podtipId;

    @Column(name = "podtip")
    private String podtip;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "tip_id")
    //@JsonBackReference
    private TipRezervacije tipRezervacije;

    @OneToMany(mappedBy = "podtipRezervacije",
            cascade = CascadeType.MERGE)
//    @JsonManagedReference
//    @JsonIgnoreProperties("podtipRezervacije")
    @JsonIgnore
    private List<Rezervacija> rezervacije;

    public PodtipRezervacije() {
    }

    public PodtipRezervacije(String podtip, TipRezervacije tipRezervacije) {
        this.podtip = podtip;
        this.tipRezervacije = tipRezervacije;
    }

    public int getpodtipId() {
        return podtipId;
    }

    public void setpodtipId(int id) {
        this.podtipId = id;
    }

    public String getPodtip() {
        return podtip;
    }

    public void setPodtip(String podtip) {
        this.podtip = podtip;
    }

    public TipRezervacije getTipRezervacije() {
        return tipRezervacije;
    }

    public void setTipRezervacije(TipRezervacije tipRezervacije) {
        this.tipRezervacije = tipRezervacije;
    }

    public List<Rezervacija> getRezervacije() {
        return rezervacije;
    }

    public void setRezervacije(List<Rezervacija> rezervacije) {
        this.rezervacije = rezervacije;
    }
}
