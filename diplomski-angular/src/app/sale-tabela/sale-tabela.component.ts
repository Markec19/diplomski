import { Component } from '@angular/core';
import { Rezervacija } from '../models/rezervacija';
import { Sala } from '../models/sala';
import { AxiosService } from '../service/axios.service';
import { Rola } from '../models/rola';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sale-tabela',
  templateUrl: './sale-tabela.component.html',
  styleUrls: ['./sale-tabela.component.css']
})
export class SaleTabelaComponent {
  datum: Date = new Date();
  sale: Sala[] = [];
  timeSlots: string[] = [];
  rezervacije: Rezervacija[] = [];
  izabranaCelija: { sala: Sala, vreme: string } | null = null;
  rola: Rola | null = null;
  izabranaRezervacija: Rezervacija | null = null;  
  izabraniStatus: string = 'sve';
  filteredRezervacije: Rezervacija[] = [];
  active: boolean = false;

  constructor(private axiosService: AxiosService, private router: Router) { }

  ngOnInit(): void {
    let datum = localStorage.getItem('datum');
    if(datum !== null){
      this.datum = new Date(datum);     

      const url = `/rezervacije/rezervacije/dan?datum=${encodeURIComponent(datum)}`;
      this.axiosService.request(
        'GET',
        url, 
        {}
      )
      .then((response) => {
        this.rezervacije = this.vratiRezervacije(response.data);
        this.filteredRezervacije = this.rezervacije;
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
    }

    this.generateTimeSlots();

    this.axiosService.request(
      "GET",
      "/entity/sale",
      {}
    ).then(
      (response) => this.sale = this.vratiSale(response.data),
    )

    let username = localStorage.getItem("username");

    this.axiosService.request(
      "POST",
      "/entity/profil/rola",
      {
        username
      }
    ).then(
      (response) => this.rola = response.data,
    )

    localStorage.removeItem("detalji");
    localStorage.removeItem("forma");
  }

  generateTimeSlots(): void {
    let start = new Date();
    start.setHours(8, 0, 0);
    let end = new Date();
    end.setHours(22, 0, 0);

    while (start < end) {
      this.timeSlots.push(start.toTimeString().slice(0, 5));
      start.setMinutes(start.getMinutes() + 15);
    }
  }

  onCellClick(sala: Sala, vreme: string): void {
    this.izabranaCelija = { sala, vreme };
    this.active = true;
    if (this.isCellReserved(sala, vreme)) {
      this.izabranaRezervacija = this.getReservationForCell(sala, vreme);
    }
  }

  closeForm(): void {
    this.izabranaCelija = null;

    this.axiosService.request(
      "POST",
      "/rezervacije/rezervacije/dan",
      {}
    ).then(
      (response) => this.rezervacije = this.vratiRezervacije(response.data)
    )   
  }

  getReservationForCell(sala: Sala, vreme: string): Rezervacija | null {
    const targetTime = new Date(`1970-01-01T${vreme}:00`);
    return this.filteredRezervacije.find(rezervacija => {

      if (!this.prikazRezervacije(rezervacija, sala)) {
        return false;
      }

      const startTime = new Date(`1970-01-01T${rezervacija.vremePocetka}:00`);
      const endTime = new Date(`1970-01-01T${rezervacija.vremeZavrsetka}:00`);
      return startTime <= targetTime && targetTime < endTime;
    }) || null;
  }

  isCellCovered(sala: Sala, vreme: string): boolean {
    const targetTime = new Date(`1970-01-01T${vreme}:00`);
    return this.rezervacije.some(rezervacija => {
      if (rezervacija.sala?.salaId !== sala.salaId) {
        return false;
      }
      const startTime = new Date(`1970-01-01T${rezervacija.vremePocetka}:00`);
      const endTime = new Date(`1970-01-01T${rezervacija.vremeZavrsetka}:00`);
      return startTime < targetTime && targetTime < endTime;
    });
  }

  isCellReserved(sala: Sala, vreme: string): boolean {
    return !!this.getReservationForCell(sala, vreme);
  }

  getColSpan(sala: Sala, vreme: string): number {
    const rezervacija = this.getReservationForCell(sala, vreme);
    if (!rezervacija) {
      return 1;
    }
    const startTime = new Date(`1970-01-01T${rezervacija.vremePocetka}:00`);
    const endTime = new Date(`1970-01-01T${rezervacija.vremeZavrsetka}:00`);
    const interval = 15 * 60 * 1000;
    return Math.ceil((endTime.getTime() - startTime.getTime()) / interval);
  }

  getReservationsForDate(rezervacije: Rezervacija[], datum: Date): Rezervacija[] {    
    return rezervacije.filter(data =>
      data.datumRezervacije.getFullYear() === datum.getFullYear() &&
      data.datumRezervacije.getMonth() === datum.getMonth() &&
      data.datumRezervacije.getDate() === datum.getDate()
    );
  }

  vratiRezervacije(response: any): Rezervacija[] {
    // let rezervacije: Rezervacija[] = response.map((item: any) => new Rezervacija(item));
    // return this.getReservationsForDate(rezervacije, this.datum)
    return response.map((item: any) => new Rezervacija(item));
  }

  vratiSale(response: any):Sala[] {
    return response.map((item: any) => new Sala(item));
  }

  isAdmin(): boolean{
    return this.rola?.rola === "admin";
  }

  
  applyFilter(): void {
    if (this.izabraniStatus === 'sve') {
      this.filteredRezervacije = this.rezervacije;
    } else {
      this.filteredRezervacije = this.rezervacije.filter(rezervacija => rezervacija.status?.status === this.izabraniStatus);
    }
  }

  onStatusFilterChange(event: any): void {
    this.izabraniStatus = event.target.value;
    this.applyFilter();
  }

  onemoguciInterakciju(sala: Sala, vreme: string): boolean {
    if(this.isCellReserved(sala, vreme) && !this.isAdmin()){
      return true;
    }
    if(this.izabraniStatus !== 'sve' && !this.isCellReserved(sala, vreme)){
      return true;
    }

    if(this.prosliDatum()){
      return true;
    }
    
    return false;
  }

  vratiNizRezervacija() {
    console.log(this.rezervacije)
  }

  prikazRezervacije(rezervacija: Rezervacija, sala: Sala) : boolean{
    if(rezervacija.sala?.salaId !== sala.salaId){
      return false;
    }

    if(rezervacija.status?.status === 'odjavljena' && !this.isAdmin()) {
      return false;
    }
    
    if(rezervacija.status?.status === "odbijena"){
      return false;
    }
    
    return true;
  }

  prosliDatum(): boolean {
    if (this.datum === null) 
      return false;

    const danas = new Date();
    danas.setHours(0, 0, 0, 0);

    return this.datum < danas;
  }

  ucitajFormu(): boolean {
    if(this.izabranaCelija && !this.isCellReserved(this.izabranaCelija.sala, this.izabranaCelija.vreme)){
      let detalji = localStorage.getItem('detalji')
      if(detalji){
        return false;
      }
      localStorage.setItem("forma", "true")
      return true;
    }
    
    return false;
  }

  ucitajDetalje(): boolean {
    if(this.izabranaCelija && this.isCellReserved(this.izabranaCelija.sala, this.izabranaCelija.vreme) && this.isAdmin()){     
      let forma = localStorage.getItem('forma')
      if(forma){
        return false;
      }

      localStorage.setItem("detalji", "true");
      return true;
    }
    


    return false;
  }

  

}
