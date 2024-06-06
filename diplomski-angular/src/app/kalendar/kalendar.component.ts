import { Component, OnInit } from '@angular/core';
import { Rezervacija } from '../models/rezervacija';
import { ActivatedRoute, Router } from '@angular/router';
import { AxiosService } from '../service/axios.service';



@Component({
  selector: 'app-kalendar',
  templateUrl: './kalendar.component.html',
  styleUrl: './kalendar.component.css'
})
export class KalendarComponent implements OnInit{
  izabranDatum: Date = new Date();
  trenutniMesec: Date = new Date();
  danasnjiDatum: Date = new Date();
  daniUNedelji: string[] = ['Pon', 'Uto', 'Sre', 'Čet', 'Pet', 'Sub', 'Ned'];
  meseci: string[] = [];
  nedelje: (number | null)[][] = [];
  rezervacije: Rezervacija[] = [];  

  constructor(private axiosService: AxiosService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {


    let token = this.axiosService.getAuthToken()
    if(token != null){

      this.meseci = [
        "Januar", "Februar", "Mart", "April", "Maj", "Jun",
        "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"
      ];

      let datum = localStorage.getItem("datum");
      if(datum){
        this.trenutniMesec = new Date(datum);
      }   

      let godina =  this.trenutniMesec.getFullYear();
      let mesec = this.trenutniMesec.getMonth() + 1;
      this.generateCalendar();
    }else {
      this.router.navigate(['/login']);
    }
  }

  generateCalendar() {

    this.nedelje = [];

    const godina = this.trenutniMesec.getFullYear();
    const mesec = this.trenutniMesec.getMonth();
    const prviUMesecu = new Date(godina, mesec, 1);
    const poslednjiUMesecu = new Date(godina, mesec + 1, 0);
    const daniUMesecu = poslednjiUMesecu.getDate();
    let currentWeek: (number | null)[] = [];
    const firstDayOfWeek = (prviUMesecu.getDay() + 6) % 7;

    for (let i = 0; i < firstDayOfWeek; i++) {
      currentWeek.push(null);
    }

    for (let day = 1; day <= daniUMesecu; day++) {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        this.nedelje.push([...currentWeek]);
        currentWeek = [];
      }
    }

    if (currentWeek.length > 0) {
      const remainingDays = 7 - currentWeek.length;
      for (let i = 0; i < remainingDays; i++) {
        currentWeek.push(null);
      }
      this.nedelje.push([...currentWeek]);
    }

    localStorage.setItem("datum", this.trenutniMesec + "");
  }

  goToPreviousMonth() {
    const currentMonth = this.trenutniMesec.getMonth();
    const currentYear = this.trenutniMesec.getFullYear();
    this.trenutniMesec = new Date(currentYear, currentMonth - 1, 1);   
    this.updateRoute();
    this.generateCalendar();
  }

  goToNextMonth() {
    const currentMonth = this.trenutniMesec.getMonth();
    const currentYear = this.trenutniMesec.getFullYear();
    this.trenutniMesec = new Date(currentYear, currentMonth + 1, 1);    
    this.updateRoute();
    this.generateCalendar();
  }

  getCurrentMonthName(): string {
    const mesecIndeks: number = this.trenutniMesec.getMonth();
    return this.meseci[mesecIndeks];
  }

  getReservationsForDate(year: number, month: number, day: number): Rezervacija[] {
    const date = new Date(year, month, day);
    return this.rezervacije.filter(data =>
      data.datumRezervacije.getFullYear() === date.getFullYear() &&
      data.datumRezervacije.getMonth() === date.getMonth() &&
      data.datumRezervacije.getDate() === date.getDate()
    );
  }

  handleCellClick(year: number, month: number, day: number) {
    this.izabranDatum = new Date(year, month, day)
    localStorage.setItem("datum", this.izabranDatum + "");
    this.router.navigate(['/sale']);
  }

  vratiRezervacije(response: any): Rezervacija[] {
    return response.map((item: any) => new Rezervacija(item));
  }  

  updateRoute() {
    this.router.navigate(['/pocetna', this.trenutniMesec.getFullYear(), this.trenutniMesec.getMonth() + 1]);
  }

  prosliDatum(godina: number, mesec: number, dan: number | null): boolean {
    if (dan === null) 
      return false;
    const date = new Date(godina, mesec, dan);
    return date < this.danasnjiDatum;
  }

  danas(godina: number, mesec: number, dan: number | null): boolean {
    if (dan === null) return false;
    const date = new Date(godina, mesec, dan);
    return date.toDateString() === this.danasnjiDatum.toDateString();
  }


}
