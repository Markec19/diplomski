import { Component, OnInit } from '@angular/core';
import { Notifikacija } from '../models/notifikacija';
import { AxiosService } from '../service/axios.service';
import { Router } from '@angular/router';
import { Profil } from '../models/profil';
import { Rola } from '../models/rola';

@Component({
  selector: 'app-obavestenja',
  templateUrl: './obavestenja.component.html',
  styleUrl: './obavestenja.component.css'
})
export class ObavestenjaComponent  implements OnInit{

  notifikacije: Notifikacija[] = [];
  rola: Rola | null = null;

  constructor(private axiosService: AxiosService, private router: Router) {}
  
  ngOnInit(): void {
    this.ucitajObavestenja();
  }

  ucitajObavestenja() {
    let username = localStorage.getItem("username");
    this.axiosService.request(
      "POST",
      "/notifikacije/notifikacija",
      {
        username
      }
    ).then(
      (response) => this.notifikacije = response.data
    );

    this.axiosService.request(
      "POST",
      "/entity/profil/rola",
      {
        username: localStorage.getItem("username")
      }
    ).then(
      (response) => this.rola = response.data
    )
  }

  odvediDoRezervacije(notifikacija: Notifikacija){

    if(notifikacija.rezervacija){
      let datumMilisekunde = new Date(notifikacija.rezervacija?.datumRezervacije);

      let formatiranDatum = datumMilisekunde.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });

      let datum = new Date(formatiranDatum);
      localStorage.setItem("datum", datum + "");
      this.router.navigate(['/sale']);
    }  
  }

  prikaziDatum(notifikacija: Notifikacija): Date | null {
    let datumObrade = notifikacija.rezervacija?.datumObrade;
    let datumSlanja = notifikacija.rezervacija?.datumSlanjaZahteva;
    if(datumSlanja && this.isAdmin()){
      return datumSlanja;
    }
    
    if(datumObrade && !this.isAdmin()){
      return datumObrade
    }

    return null;
  }

  isAdmin(): boolean {
    return this.rola?.rola === "admin";
  }

}
