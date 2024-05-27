import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AxiosService } from '../service/axios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup = new FormGroup({
  });

  loginSuccess: boolean = true;

  constructor(private formBuilder: FormBuilder, private axiosService: AxiosService, private router: Router) { }
  ngOnInit(): void {
    if(this.axiosService.getAuthToken() !== null){
      localStorage.removeItem('auth_token');
    }

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login(): void {
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    if(this.loginForm.valid){
      this.axiosService.request(
        "POST",
        "/login",
        {
          username: username,
          password: password        
        }
      ).then(response => {
        this.axiosService.setAuthToken(response.data.token);
        localStorage.setItem("username", username);
        this.router.navigate(['/pocetna']);
      })
      .catch(error => {
        console.error("Login failed:", error);
        this.loginSuccess = false;
        this.loginForm.reset()
      });
    }
  }
  

}
