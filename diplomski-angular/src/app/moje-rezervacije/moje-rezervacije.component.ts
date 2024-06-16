import { Component, OnInit } from '@angular/core';
import { Rezervacija } from '../models/rezervacija';
import { AxiosService } from '../service/axios.service';
import { Rola } from '../models/rola';

@Component({
  selector: 'app-moje-rezervacije',
  templateUrl: './moje-rezervacije.component.html',
  styleUrls: ['./moje-rezervacije.component.css']
})
export class MojeRezervacijeComponent implements OnInit {

  rezervacije: Rezervacija[] = [];
  filtriraneRezervacije: Rezervacija[] = [];
  selektovanaRezervacija: Rezervacija | null = null;
  prikaziModal: boolean = false;
  izabraniStatus: string = 'sve';
  rola: Rola | null = null;
  izabranaRezervacija: Rezervacija | null = null;

  constructor(private axiosService: AxiosService) { }

  ngOnInit(): void {
    let username = localStorage.getItem('username');
    this.axiosService.request(
      "POST",
      "/rezervacije/rezervacije/korisnik",
      {
        username
      }
    ).then(
      (response) => {
        this.rezervacije = this.vratiRezervacije(response.data);
        this.filtriraneRezervacije = this.rezervacije;
      }
    );

    this.axiosService.request(
      "POST",
      "/entity/profil/rola",
      {
        username
      }
    ).then(
      (response) => this.rola = response.data,
    )
  }

  vratiRezervacije(response: any): Rezervacija[] {
    return response.map((item: any) => new Rezervacija(item));
  }
  
  otvoriModal(rezervacija: Rezervacija) {
    this.selektovanaRezervacija = rezervacija;
    this.prikaziModal = true;
  }

  zatvoriModal() {
    this.selektovanaRezervacija = null;
    this.prikaziModal = false;
  }

  odjaviRezervaciju(rezervacija: Rezervacija | null) {
    this.axiosService.request(
      "PUT",
      "/rezervacije/odjavi/rezervacija",
      {
        rezervacija
      }
    ).then(
      (response) => {
        // this.rezervacije = this.vratiRezervacije(response.data);
        // this.filtriraneRezervacije = this.rezervacije;
        // this.zatvoriModal();
        location.reload();
      }
    );
  }

  odjavljena(rezervacija: Rezervacija): boolean {
    return rezervacija.status?.status === "odjavljena";
  }

  onStatusFilterChange(event: any): void {
    this.izabraniStatus = event.target.value;
    this.applyFilter();
  }

  applyFilter(): void {
    if (this.izabraniStatus === 'sve') {
      this.filtriraneRezervacije = this.rezervacije;
    } else {
      this.filtriraneRezervacije = this.rezervacije.filter(rezervacija => rezervacija.status?.status === this.izabraniStatus);
    }
  }

  prikazRezervacije(rezervacija: Rezervacija) {
    this.izabranaRezervacija = rezervacija;
  }
}
