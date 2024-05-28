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
  selectedDate: Date = new Date();
  currentDate: Date = new Date();
  daniUNedelji: string[] = ['Pon', 'Uto', 'Sre', 'Čet', 'Pet', 'Sub', 'Ned'];
  meseci: string[] = [];
  weeks: (number | null)[][] = [];
  rezervacije: Rezervacija[] = [];  

  constructor(private axiosService: AxiosService, private route: ActivatedRoute, private router: Router) {
    let token = this.axiosService.getAuthToken()
    if(token != null){
      this.meseci = [
        "Januar", "Februar", "Mart", "April", "Maj", "Jun",
        "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"
      ];
      this.generateCalendar();
    }else {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
      this.axiosService.request(
        "GET",
        "/rezervacije",
        {}
      ).then(
        (response) => this.rezervacije = this.vratiRezervacije(response.data)
      )

      localStorage.removeItem('datum');
  }

  generateCalendar() {

    this.weeks = [];

    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    let currentWeek: (number | null)[] = [];
    const firstDayOfWeek = (firstDayOfMonth.getDay() + 6) % 7;

    for (let i = 0; i < firstDayOfWeek; i++) {
      currentWeek.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        this.weeks.push([...currentWeek]);
        currentWeek = [];
      }
    }

    if (currentWeek.length > 0) {
      const remainingDays = 7 - currentWeek.length;
      for (let i = 0; i < remainingDays; i++) {
        currentWeek.push(null);
      }
      this.weeks.push([...currentWeek]);
    }
  }

  goToPreviousMonth() {
    const currentMonth = this.currentDate.getMonth();
    const currentYear = this.currentDate.getFullYear();
    this.currentDate = new Date(currentYear, currentMonth - 1, 1);
    this.generateCalendar();
  }

  goToNextMonth() {
    const currentMonth = this.currentDate.getMonth();
    const currentYear = this.currentDate.getFullYear();
    this.currentDate = new Date(currentYear, currentMonth + 1, 1);
    this.generateCalendar();
  }

  getCurrentMonthName(): string {
    const mesecIndeks: number = this.currentDate.getMonth();
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
    this.selectedDate = new Date(year, month, day)
    localStorage.setItem("datum", this.selectedDate + "");
    this.router.navigate(['/sale']);
  }

  vratiRezervacije(response: any): Rezervacija[] {
    return response.map((item: any) => new Rezervacija(item));
  }  
}
