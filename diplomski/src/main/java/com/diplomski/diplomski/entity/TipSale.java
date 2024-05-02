package com.diplomski.diplomski.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="tip_sale")
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class TipSale {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int tipSaleId;

    @Column(name = "tip")
    private String tip;

//    @OneToMany(mappedBy = "tipSale", fetch = FetchType.LAZY,
//            cascade = {CascadeType.PERSIST, CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH})
@OneToMany(mappedBy = "tipSale", fetch = FetchType.LAZY,
        cascade = CascadeType.MERGE)
//    @JsonManagedReference
    @JsonIgnoreProperties("tipSale")
    private List<Sala> sale;

    public TipSale() {
    }

    public TipSale(String tip) {
        this.tip = tip;
    }

    public int gettipSaleId() {
        return tipSaleId;
    }

    public void settipSaleId(int id) {
        this.tipSaleId = id;
    }

    public String getTip() {
        return tip;
    }

    public void setTip(String tip) {
        this.tip = tip;
    }

    public List<Sala> getSale() {
        return sale;
    }

    public void setSale(List<Sala> sale) {
        this.sale = sale;
    }
}
