import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { Rezervacija } from '../models/rezervacija';

@Injectable({
  providedIn: 'root'
})
export class AxiosService {


  private rezervacije: Rezervacija[] = [];

  constructor(private router: Router) {
    axios.defaults.baseURL="http://localhost:8080"
    axios.defaults.headers.post["Content-Type"] = "application/json"
   }

   getAuthToken(): string | null {
    return window.localStorage.getItem("auth_token")
   }

   setAuthToken(token: string | null): void {
    let headers = {};

    if(token !== null) {
      window.localStorage.setItem("auth_token", token);
    } else {
      window.localStorage.removeItem("auth_token");
    }
   }

   request(method: string, url: string, data: any): Promise<any> {
    let headers = {};

    if(this.getAuthToken() !== null) {
      headers = {"Authorization": "Bearer " + this.getAuthToken()}
    }
    

    return axios({
      method: method,
      url: url,
      data: data,
      headers: headers
    })
   }

   logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('username');
    localStorage.removeItem('datum')
    this.router.navigate(['/login']);
  }

  getReservations(): Rezervacija[] {
    return this.rezervacije;
  }
}
