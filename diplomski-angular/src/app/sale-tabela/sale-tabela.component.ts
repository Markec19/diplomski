import { Component, Input } from '@angular/core';
import { Rezervacija } from '../models/rezervacija';
import { Sala } from '../models/sala';
import { AxiosService } from '../service/axios.service';

@Component({
  selector: 'app-sale-tabela',
  templateUrl: './sale-tabela.component.html',
  styleUrl: './sale-tabela.component.css'
})
export class SaleTabelaComponent {

  datum!: Date;
  sale: Sala[] = [];
  timeSlots: string[] = [];
  rezervacije: Rezervacija[] = [];
  izabranaCelija: { sala: Sala, vreme: string } | null = null;

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
      (response) => this.rezervacije = this.vratiRezervacije(response.data)
    )

    this.axiosService.request(
      "GET",
      "/sale",
      {}
    ).then(
      (response) => this.sale = this.vratiSale(response.data),
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

  onCellClick(sala: Sala, vreme: string): void {
    this.izabranaCelija = { sala, vreme };
  }

  closeForm(): void {
    this.izabranaCelija = null;
    this.rezervacije = this.axiosService.getReservations();
  }

  getReservationForCell(sala: Sala, time: string): Rezervacija | null {
    const targetTime = new Date(`1970-01-01T${time}:00`);
    return this.rezervacije.find(rezervacija => {
      if (rezervacija.sala?.salaId !== sala.salaId) {
        return false;
      }
      const startTime = new Date(`1970-01-01T${rezervacija.vremePocetka}:00`);
      const endTime = new Date(`1970-01-01T${rezervacija.vremeZavrsetka}:00`);
      return startTime <= targetTime && targetTime < endTime;
    }) || null;
  }

  isCellCovered(sala: Sala, time: string): boolean {
    const targetTime = new Date(`1970-01-01T${time}:00`);
    return this.rezervacije.some(rezervacija => {
      if (rezervacija.sala?.salaId !== sala.salaId) {
        return false;
      }
      const startTime = new Date(`1970-01-01T${rezervacija.vremePocetka}:00`);
      const endTime = new Date(`1970-01-01T${rezervacija.vremeZavrsetka}:00`);
      return startTime < targetTime && targetTime < endTime;
    });
  }

  getColSpan(sala: Sala, time: string): number {
    const rezervacija = this.getReservationForCell(sala, time);
    if (!rezervacija) {
      return 1;
    }
    const startTime = new Date(`1970-01-01T${rezervacija.vremePocetka}:00`);
    const endTime = new Date(`1970-01-01T${rezervacija.vremeZavrsetka}:00`);
    const interval = 15 * 60 * 1000; // 15 minutes in milliseconds
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

}
