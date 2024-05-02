package com.diplomski.diplomski.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="rola")
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Rola {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int rolaId;

    @Column(name = "rola")
    private String rola;

    @OneToMany(mappedBy = "rola", fetch = FetchType.EAGER,
            cascade = CascadeType.MERGE)
//    @JsonManagedReference
    @JsonIgnoreProperties("rola")
    private List<Profil> profili;

    public Rola() {
    }

    public Rola(String rola) {
        this.rola = rola;
    }

    public int getrolaId() {
        return rolaId;
    }

    public void setrolaId(int id) {
        this.rolaId = id;
    }

    public String getRola() {
        return rola;
    }

    public void setRola(String rola) {
        this.rola = rola;
    }

    public List<Profil> getProfili() {
        return profili;
    }

    public void setProfili(List<Profil> profili) {
        this.profili = profili;
    }
}
