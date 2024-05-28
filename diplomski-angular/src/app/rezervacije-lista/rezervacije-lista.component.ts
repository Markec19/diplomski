import { Component, Input, OnInit } from '@angular/core';
import { Rezervacija } from '../models/rezervacija';
import { AxiosService } from '../service/axios.service';
import { Status } from '../models/status';
import { Router } from '@angular/router';
import { Rola } from '../models/rola';

@Component({
  selector: 'app-rezervacije-lista',
  templateUrl: './rezervacije-lista.component.html',
  styleUrl: './rezervacije-lista.component.css'
})
export class RezervacijeListaComponent implements OnInit{

  @Input() rezervacija!: Rezervacija | null;
  dodaj: boolean = false;
  statusi: Status[] = [];
  @Input() rola: Rola | null = null;
  trenutniDatum: Date = new Date();
 
  constructor(private axiosService: AxiosService, private router: Router){}

  ngOnInit(): void {
    this.axiosService.request(
      "GET",
      "/statusi",
      {}
    ).then(
      (response) => this.statusi = this.vratiStatuse(response.data)
    )

    this.axiosService.request(
      "POST",
      "/profil/rola",
      {
        username: localStorage.getItem("username")
      }
    ).then(
      (response) => this.rola = response.data
    )
  }

  zatvoriProzor() {
    location.reload();
  }

  
  detaljiRezervacije(rezervacija: Rezervacija){
    this.rezervacija = rezervacija;
  }

  proveriDatum(): boolean{
    if(typeof this.rezervacija !== 'undefined' && this.rezervacija !== null){
      let datum = this.rezervacija.datumObrade;
      if(typeof datum !== 'undefined' && datum !== null && datum.getFullYear() > 2000){
        return true;
      }
    }    
    return false;
  }

  vratiStatuse(response: any): Status[] {
    return response.map((item: any) => new Status(item));
  }
  
  obradiZahtev(br: number) {

    if(this.rezervacija !== null){
      let rezervacija = this.rezervacija;
      let status = this.statusi.at(br);
      if(typeof rezervacija !== "undefined" && typeof status !== 'undefined'){
        rezervacija.status = status;
        rezervacija.datumObrade = new Date();
      }
      let username = localStorage.getItem("username")
  
      this.axiosService.request(
        "PUT",
        "/obradi/rezervacija",
        {
  
          rezervacija: rezervacija,
          username: username
        }
      ).then(response => {
        this.router.navigate(['/kalendar']);
      })
    }
  }

}
