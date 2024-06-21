import { Component, Input, OnInit } from '@angular/core';
import { Rezervacija } from '../models/rezervacija';
import { AxiosService } from '../service/axios.service';
import { Status } from '../models/status';
import { Router } from '@angular/router';
import { Rola } from '../models/rola';
import { ToastrService } from 'ngx-toastr';

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
  razlogOdbijanja: string = '';
  showModal: boolean = false;
  
 
  constructor(private axiosService: AxiosService, private router: Router, private toastr: ToastrService){}

  ngOnInit(): void {
    this.axiosService.request(
      "GET",
      "/entity/statusi",
      {}
    ).then(
      (response) => this.statusi = this.vratiStatuse(response.data)
    )

    this.axiosService.request(
      "POST",
      "/entity/profil/rola",
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
      if (br === 2) {
        rezervacija.razlogOdbijanja = this.razlogOdbijanja; 
      }
      let username = localStorage.getItem("username")
  
      if(br === 1 && username){
        this.prihvatiRezervaciju(rezervacija, username)
      } else if(br === 2 && username){
        this.odbijRezervaciju(rezervacija, username)
      }
      this.zatvoriModal()
    }
  }

  prihvatiRezervaciju(rezervacija: Rezervacija, username: string) {
    this.axiosService.request(
      "PUT",
      "/rezervacije/prihvati/rezervacija",
      {
        rezervacija: rezervacija,
        username: username
      }
    ).then(response => {
      this.toastr.success('Rezervacija je prihvaćena!', '', {
        positionClass: 'toast-top-center',
        timeOut: 3000
      });
      this.toastr.success('Notifikacija je uspesno zapamćena!', '', {
        positionClass: 'toast-top-center',
        timeOut: 3000
      });
      this.toastr.success('Mejl je uspesno poslat!', '', {
        positionClass: 'toast-top-center',
        timeOut: 3000
      });
    }).catch(error => {
      this.toastr.success('Sistem ne može da zapamti rezervaciju!', '', {
        positionClass: 'toast-top-center',
        timeOut: 3000
      });
      this.toastr.success('Sistem ne može da zapamti notifikaciju!', '', {
        positionClass: 'toast-top-center',
        timeOut: 3000
      });
      this.toastr.success('Sistem ne može da pošalje mejl!', '', {
        positionClass: 'toast-top-center',
        timeOut: 3000
      });
    })
  }

  odbijRezervaciju(rezervacija: Rezervacija, username: string) {
    this.axiosService.request(
      "PUT",
      "/rezervacije/odbij/rezervacija",
      {
        rezervacija: rezervacija,
        username: username
      }
    ).then(response => {
      this.toastr.success('Rezervacija je odbijena!', '', {
        positionClass: 'toast-top-center',
        timeOut: 3000
      });
      this.toastr.success('Notifikacija je uspesno zapamćena!', '', {
        positionClass: 'toast-top-center',
        timeOut: 3000
      });
    }).catch(error => {
      this.toastr.error('Sistem ne može da zapamti rezervaciju!', '', {
        positionClass: 'toast-top-center',
        timeOut: 3000
      });
      this.toastr.error('Sistem ne može da zapamti notifikaciju!', '', {
        positionClass: 'toast-top-center',
        timeOut: 3000
      });
    })
  }

  submitRazlogOdbijanja() {
    this.obradiZahtev(2);
    this.zatvoriModal();
  }

  prikaziModal() {
    this.showModal = true;
  }

  zatvoriModal() {
    this.showModal = false;

    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

}
