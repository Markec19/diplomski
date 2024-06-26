import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Sala } from '../models/sala';
import { Predmet } from '../models/predemt';
import { TipRezervacije } from '../models/tip-rezervacije';
import { PodtipRezervacije } from '../models/podtip-rezervacije';
import { Rezervacija } from '../models/rezervacija';
import { AxiosService } from '../service/axios.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rezervacija',
  templateUrl: './rezervacija-form.component.html',
  styleUrls: ['./rezervacija-form.component.css']
})
export class RezervacijaFormComponent implements OnInit {

  @Input() sala!: Sala;
  @Input() vremePocetka!: string;
  @Output() formClose = new EventEmitter<void>();

  rezervacijaForm: FormGroup = new FormGroup({});
  datum: Date = new Date();
  izabraniPredmetId: number = 0;
  izabraniPodtipId: number = 0;
  izabraniTipId: number = 0;
  vremeZavrsetka!: string;
  predmeti: Predmet[] = [];
  tipRezervacije: TipRezervacije[] = [];
  podtipRezervacije: PodtipRezervacije[] = [];
  filtriraniPodtipRezervacije: PodtipRezervacije[] = [];
  rezervacijeSale: Rezervacija[] = [];
  timeSlots: string[] = [];
  kreiranaRezervacija: Rezervacija | null = null;
  izabraniPredmet: Predmet | null = null;

  constructor(private formBuilder: FormBuilder, private router: Router, private axiosService: AxiosService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.rezervacijaForm = this.formBuilder.group({
      // predmet: ['', Validators.required],
      izabraniPredmetId: ['', Validators.required],
      vremePocetka: [this.vremePocetka, Validators.required],
      vremeZavrsetka: ['', Validators.required],
      tipRezervacije: ['', Validators.required],
      podtipRezervacije: ['', Validators.required],
      dogadjaj: [''],
      napomena: [''],
    });

    this.generateTimeSlots();
    this.vremeZavrsetka = this.vremePocetka;

    this.axiosService.request(
      "GET",
      "/entity/predmeti",
      {}
    ).then(
      (response) => this.predmeti = this.vratiPredmete(response.data)
    )
  
    this.axiosService.request(
      "GET",
      "/entity/tip_rezervacije",
      {}
    ).then(
      (response) => this.tipRezervacije = this.vratiTipRezervacije(response.data)
    )
  
    this.axiosService.request(
      "GET",
      "/entity/podtip_rezervacije",
      {}
    ).then(
      (response) => this.podtipRezervacije = this.vratiPodtip(response.data)
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

  isTimeSlotTaken(time: string): boolean {
    return this.rezervacijeSale.some(rezervacija =>
      rezervacija.vremePocetka <= time && rezervacija.vremeZavrsetka > time
    );
  }

  onVremePocetkaChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.vremePocetka = target.value;
    this.rezervacijaForm.controls['vremePocetka'].setValue(this.vremePocetka);
  }

  onTipRezervacijeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedTipId = parseInt(target.value);
    this.izabraniTipId = selectedTipId;
    this.filtriraniPodtipRezervacije = this.podtipRezervacije.filter(podtip => podtip.tipRezervacije?.tipRezervacijeId === selectedTipId);
  }

  onSubmit(): void {
    if (this.vremeZavrsetka <= this.vremePocetka) {
      alert('Vreme završetka mora biti posle vremena početka');
      return;
    }

    let rezervacija: Rezervacija = new Rezervacija();

    if(this.izabraniTipId !== 3){
      let izabraniPredmet: Predmet | null = this.predmeti.find(predmet => predmet.predmetId == this.izabraniPredmetId) ?? null;
      let izabraniPodtip: PodtipRezervacije | null = this.podtipRezervacije.find(podtip => podtip.podtipId == this.izabraniPodtipId) ?? null;

      rezervacija.predmet = izabraniPredmet;
      rezervacija.podtipRezervacije = izabraniPodtip;
    }

    if(this.izabraniTipId === 3){
      rezervacija.dogadjaj = (document.getElementById('dogadjaj') as HTMLInputElement).value;
      rezervacija.podtipRezervacije = this.podtipRezervacije.find(podtip => podtip.tipRezervacije?.tipRezervacijeId == 3) ?? null;
    }

    rezervacija.napomena = (document.getElementById('napomena') as HTMLInputElement).value;   
    
    rezervacija.sala = this.sala;
    rezervacija.vremePocetka = this.vremePocetka; 
    rezervacija.vremeZavrsetka = this.vremeZavrsetka;
    rezervacija.datumSlanjaZahteva = new Date();
    let datum = localStorage.getItem('datum');
    if(datum !== null){
      rezervacija.datumRezervacije = new Date(datum);
    }
    let username = localStorage.getItem("username");

    this.axiosService.request(
      "POST",
      "/rezervacije/sacuvaj/rezervacija",
      {      
        rezervacija: rezervacija,
        username: username
      }
    ).then(response => {        
        this.toastr.success('Rezervacija je uspesno kreirana!', '', {
          positionClass: 'toast-top-center',
          timeOut: 3000
        });
        this.toastr.success('Notifikacija je uspesno kreirana!', '', {
          positionClass: 'toast-top-center',
          timeOut: 3000
        });
    }).catch(error => {
      this.toastr.error('Sistem ne moze da kreira rezervaciju!', '', {
        positionClass: 'toast-top-center',
        timeOut: 3000
      });
      this.toastr.error('Sistem ne moze da kreira notifikaciju!', '', {
        positionClass: 'toast-top-center',
        timeOut: 3000
      });
    })
    this.formClose.emit();
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
    
  }

  onCancel(): void {
    this.formClose.emit();
  }

  vratiPredmete(response: any): Predmet[] {
    return response.map((item: any) => new Predmet(item));
  }

  vratiTipRezervacije(response: any): TipRezervacije[] {
    return response.map((item: any) => new TipRezervacije(item));
  }

  vratiPodtip(response: any): PodtipRezervacije[] {
    return response.map((item: any) => new PodtipRezervacije(item));
  }



  onSelectionChange(event: any) {
    console.log(this.izabraniPredmetId)
  }
}