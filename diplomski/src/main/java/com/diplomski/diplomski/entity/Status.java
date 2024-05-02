package com.diplomski.diplomski.entity;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="status")
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Status {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int statusId;

    @Column(name = "status")
    private String status;

    @OneToMany(mappedBy = "status",
            cascade = CascadeType.MERGE)
//    @JsonManagedReference
//    @JsonIgnoreProperties("status")
    @JsonIgnore
    private List<Rezervacija> rezervacije;

    public Status() {
    }

    public Status(String status) {
        this.status = status;
    }

    public int getstatusId() {
        return statusId;
    }

    public void setstatusId(int id) {
        this.statusId = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<Rezervacija> getRezervacije() {
        return rezervacije;
    }

    public void setRezervacije(List<Rezervacija> rezervacije) {
        this.rezervacije = rezervacije;
    }
}
