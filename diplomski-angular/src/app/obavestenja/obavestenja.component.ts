import { Component, OnInit } from '@angular/core';
import { Notifikacija } from '../models/notifikacija';
import { AxiosService } from '../service/axios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-obavestenja',
  templateUrl: './obavestenja.component.html',
  styleUrl: './obavestenja.component.css'
})
export class ObavestenjaComponent  implements OnInit{

  notifikacije: Notifikacija[] = [];

  constructor(private axiosService: AxiosService, private router: Router) {}
  
  ngOnInit(): void {
    this.ucitajObavestenja();
  }

  ucitajObavestenja() {
    let username = localStorage.getItem("username");
    this.axiosService.request(
      "POST",
      "/notifikacija",
      {
        username
      }
    ).then(
      (response) => this.notifikacije = response.data
    );
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

}
