import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AxiosService } from './axios.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private axiosService: AxiosService) {}

  canActivate(): boolean {
    if (!this.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  isLoggedIn(): boolean {
    return this.axiosService.getAuthToken() === null;
  }
}
