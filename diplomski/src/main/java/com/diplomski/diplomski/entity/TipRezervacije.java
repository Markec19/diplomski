package com.diplomski.diplomski.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="tip_rezervacije")
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class TipRezervacije {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int tipRezervacijeId;

    @Column(name = "tip")
    private String tip;

    @OneToMany(mappedBy = "tipRezervacije",
            cascade = CascadeType.MERGE)
//    @JsonManagedReference
    @JsonIgnoreProperties("tipRezervacije")
    private List<PodtipRezervacije> podtipRezervacijeLista;

    public TipRezervacije() {
    }

    public TipRezervacije(String tip) {
        this.tip = tip;
    }

    public int gettipRezervacijeId() {
        return tipRezervacijeId;
    }

    public void settipRezervacijeId(int id) {
        this.tipRezervacijeId = id;
    }

    public String getTip() {
        return tip;
    }

    public void setTip(String tip) {
        this.tip = tip;
    }

    public List<PodtipRezervacije> getPodtipRezervacijeLista() {
        return podtipRezervacijeLista;
    }

    public void setPodtipRezervacijeLista(List<PodtipRezervacije> podtipRezervacijeLista) {
        this.podtipRezervacijeLista = podtipRezervacijeLista;
    }
}
