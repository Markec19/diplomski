import { Component, OnInit } from '@angular/core';
import { Rezervacija } from '../models/rezervacija';
import { AxiosService } from '../service/axios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-moje-rezervacije',
  templateUrl: './moje-rezervacije.component.html',
  styleUrl: './moje-rezervacije.component.css'
})
export class MojeRezervacijeComponent implements OnInit {

  rezervacije: Rezervacija[] = [];

  constructor(private axiosService: AxiosService) { }

  ngOnInit(): void {
    let username = localStorage.getItem('username');
    this.axiosService.request(
      "POST",
      "/rezervacije/korisnik",
      {
        username
      }
    ).then(
      (response) => this.rezervacije = this.vratiRezervacije(response.data)
    )
  }

  vratiRezervacije(response: any): Rezervacija[] {
    return response.map((item: any) => new Rezervacija(item));
  }
  
  odjaviRezervaciju(rezervacija: Rezervacija) {
    this.axiosService.request(
      "PUT",
      "/odjavi/rezervacija",
      {
        rezervacija
      }
    ).then(
      (response) => {
        this.rezervacije = this.vratiRezervacije(response.data)
        location.reload()
      }
    )
  }
}
