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
      "/notifikacija",
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
    this.router.navigate(['/pocetna']);
  }

  otvoriRezervacije() {
    this.router.navigate(['/sale']);
  }
}
