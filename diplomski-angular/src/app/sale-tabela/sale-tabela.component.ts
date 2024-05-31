import { Component } from '@angular/core';
import { Rezervacija } from '../models/rezervacija';
import { Sala } from '../models/sala';
import { AxiosService } from '../service/axios.service';
import { Rola } from '../models/rola';
import { Status } from '../models/status';

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

  constructor(private axiosService: AxiosService) { }

  ngOnInit(): void {
    let datum = localStorage.getItem('datum');
    if(datum !== null){
      this.datum = new Date(datum);
    }

    this.generateTimeSlots();
    this.axiosService.request(
      "GET",
      "/rezervacije",
      {}
    ).then(
      (response) => {
        this.rezervacije = this.vratiRezervacije(response.data);
        this.filteredRezervacije = this.rezervacije;
      }
    )

    this.axiosService.request(
      "GET",
      "/sale",
      {}
    ).then(
      (response) => this.sale = this.vratiSale(response.data),
    )

    let username = localStorage.getItem("username");

    this.axiosService.request(
      "POST",
      "/profil/rola",
      {
        username
      }
    ).then(
      (response) => this.rola = response.data,
    )
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

  // onCellClick(sala: Sala, vreme: string): void {
  //   if ((!this.isCellReserved(sala, vreme) && !this.isAdmin()) || (this.isCellReserved(sala, vreme) && this.isAdmin())) {
  //     this.izabranaCelija = { sala, vreme };
  //     this.izabranaRezervacija = this.getReservationForCell(sala, vreme);
  //   }
  // }

  onCellClick(sala: Sala, vreme: string): void {
    this.izabranaCelija = { sala, vreme };
    if (this.isCellReserved(sala, vreme)) {
      this.izabranaRezervacija = this.getReservationForCell(sala, vreme);
    }
  }

  closeForm(): void {
    this.izabranaCelija = null;

    this.axiosService.request(
      "GET",
      "/rezervacije",
      {}
    ).then(
      (response) => this.rezervacije = this.vratiRezervacije(response.data)
    )   

    //this.rezervacije = this.axiosService.getReservations();
  }

  getReservationForCell(sala: Sala, vreme: string): Rezervacija | null {
    const targetTime = new Date(`1970-01-01T${vreme}:00`);
    return this.filteredRezervacije.find(rezervacija => {
      if (rezervacija.sala?.salaId !== sala.salaId || (rezervacija.status?.status === 'odjavljena' && !this.isAdmin())) {
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
    let rezervacije: Rezervacija[] = response.map((item: any) => new Rezervacija(item));
    return this.getReservationsForDate(rezervacije, this.datum)
  }

  vratiSale(response: any):Sala[] {
    return response.map((item: any) => new Sala(item));
  }

  isAdmin(): boolean{
    return this.rola?.rola === "admin";
  }

  // getStatus(sala: Sala, vreme: string): string | null{
  //   let rezervacija = this.getReservationForCell(sala, vreme);
  //   if(rezervacija?.status)
  //     return rezervacija?.status?.status
  //   return null;
  // }

  
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
    return false;
  }

}
