package com.diplomski.diplomski.rest;

import com.diplomski.diplomski.dto.CredentialsDto;
import com.diplomski.diplomski.dto.ProfilDto;
import com.diplomski.diplomski.entity.*;
import com.diplomski.diplomski.service.EntityService;
import com.diplomski.diplomski.service.NotifikacijaService;
import com.diplomski.diplomski.service.ProfilService;
import com.diplomski.diplomski.service.RezervacijaService;
import com.diplomski.diplomski.service.impl.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/entity")
public class EntityController {

    private EntityService rolaService;
    private EntityService tipSaleService;
    private EntityService predmetService;
    private EntityService statusService;
    private EntityService salaService;
    private ProfilService profilService;
    private EntityService tipRezervacijeService;
    private EntityService podtipRezervacijeService;


    public EntityController(RolaServiceImpl rolaService, TipSaleServiceImpl tipSaleService, PredmetServiceImpl predmetService, StatusServiceImpl statusService,
                            SalaServiceImpl salaService, ProfilServiceImpl profilService, TipRezervacijeServiceImpl tipRezervacijeService,
                            PodtipRezervacijeServiceImpl podtipRezervacijeService) {
        this.rolaService = rolaService;
        this.tipSaleService = tipSaleService;
        this.predmetService = predmetService;
        this.statusService = statusService;
        this.salaService = salaService;
        this.profilService = profilService;
        this.tipRezervacijeService = tipRezervacijeService;
        this.podtipRezervacijeService = podtipRezervacijeService;
    }

    @GetMapping("/role")
    public List<Rola> getRole(){
        return rolaService.findAll();
    }

    @PostMapping("/profil/rola")
    public Rola vratiRoluProfila(@RequestBody CredentialsDto credentialsDto) throws Exception {
        ProfilDto profilDto = profilService.findByUsername(credentialsDto.username());
        Profil profil = profilService.findById(profilDto.getProfilId());
        Rola rola = (Rola) rolaService.findById(profil.getRola().getrolaId());
        return rola;
    }

    @GetMapping("/sale")
    public List<Sala> getSale() {
        return salaService.findAll();
    }

    @GetMapping("/podtip_rezervacije")
    public List<PodtipRezervacije> getPodtipRezervacije() {
        return podtipRezervacijeService.findAll();
    }

    @GetMapping("/tip_sale")
    public List<TipSale> getTipSale() {
        return tipSaleService.findAll();
    }

    @GetMapping("/predmeti")
    public List<Predmet> getPredmeti() {
        return predmetService.findAll();
    }

    @GetMapping("/statusi")
    public List<Status> getStatusi() {
        return statusService.findAll();
    }

    @GetMapping("/tip_rezervacije")
    public List<TipRezervacije> getTipRezervacije() {
        return tipRezervacijeService.findAll();
    }



}
