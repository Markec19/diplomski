import { Component, Input, OnInit } from '@angular/core';
import { Notifikacija } from '../models/notifikacija';
import { AxiosService } from '../service/axios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meni',
  templateUrl: './meni.component.html',
  styleUrls: ['./meni.component.css']
})
export class MeniComponent implements OnInit {
  notifikacije: Notifikacija[] = [];
  showNotifications = false;

  constructor(private axiosService: AxiosService, private router: Router) {}

  ngOnInit(): void {
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
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }

  logout() {
    this.axiosService.logout();
  }

  otvoriPocetnu() {
    localStorage.setItem("datum",new Date() + "")    
    this.router.navigate(['/pocetna']);
  }

  otvoriRezervacije() {
    this.router.navigate(['/sale']);
  }

  otvoriObavestenja() {
    this.router.navigate(['/obavestenja']);
  }

  otvoriMojeRezervacije() {
    this.router.navigate(['/moje-rezervacije']);
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
