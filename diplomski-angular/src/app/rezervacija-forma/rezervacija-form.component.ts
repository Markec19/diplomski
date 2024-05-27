import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { Sala } from '../models/sala';
import { Predmet } from '../models/predemt';
import { TipRezervacije } from '../models/tip-rezervacije';
import { PodtipRezervacije } from '../models/podtip-rezervacije';
import { Rezervacija } from '../models/rezervacija';
import { AxiosService } from '../service/axios.service';
import { TipSale } from '../models/tip-sale';


@Component({
  selector: 'app-rezervacija',
  templateUrl: './rezervacija-form.component.html',
  styleUrl: './rezervacija-form.component.css'
})
export class RezervacijaFormComponent implements OnInit {

  @Input() sala!: Sala;
  @Input() vremePocetka!: string;
  @Output() formClose = new EventEmitter<void>();

  rezervacijaForm: FormGroup = new FormGroup({});


  izabraniPredmetId: number = 0;
  izabraniPodtipId: number = 0;
  izabraniTipId: number = 0;

  vremeZavrsetka!: string;
  predmet!: Predmet;
  izabraniPodtip!: PodtipRezervacije;
  izabraniTip: TipRezervacije | null = null;
  timeSlots: string[] = [];

  predmeti: Predmet[] = [];
  tipRezervacije: TipRezervacije[] = [];
  podtipRezervacije: PodtipRezervacije[] = [];
  filtriraniPodtipRezervacije: PodtipRezervacije[] = [];

  constructor(private formBuilder: FormBuilder, private router: Router, private axiosService: AxiosService, private route: ActivatedRoute){

  }  

  ngOnInit(): void {

    this.rezervacijaForm = this.formBuilder.group({
      predmet: ['', Validators.required],
      vremeZavrsetka: ['', Validators.required],
      tipRezervacije: ['', Validators.required],
      podtipRezervacije: ['', Validators.required],
    })

    this.generateTimeSlots();
    this.vremeZavrsetka = this.vremePocetka;

    this.axiosService.request(
      "GET",
      "/predmeti",
      {}
    ).then(
      (response) => this.predmeti = this.vratiPredmete(response.data)
    )
  
    this.axiosService.request(
      "GET",
      "/tip_rezervacije",
      {}
    ).then(
      (response) => this.tipRezervacije = this.vratiTipRezervacije(response.data)
    )
  
    this.axiosService.request(
      "GET",
      "/podtip_rezervacije",
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

  onSubmit(): void {
    if (this.vremeZavrsetka <= this.vremePocetka) {
      alert('Vreme završetka mora biti posle vremena početka');
      return;
    }

    let izabraniPredmet: Predmet | null = this.predmeti.find(predmet => predmet.predmetId == this.izabraniPredmetId) ?? null;
    let izabraniPodtip: PodtipRezervacije | null = this.podtipRezervacije.find(podtip => podtip.podtipId == this.izabraniPodtipId) ?? null;

    let rezervacija: Rezervacija = new Rezervacija();
    rezervacija.predmet = izabraniPredmet;
    rezervacija.sala = this.sala;
    rezervacija.podtipRezervacije = izabraniPodtip;
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
      "/sacuvaj/rezervacija",
      {      
        rezervacija: rezervacija,
        username: username
      }
    )
    this.formClose.emit();
    location.reload();
  }

  onCancel(): void {
    this.formClose.emit();
    location.reload();
  }

  vratiPredmete(response: any): Predmet[] {
    return response.map((item: any) => new Predmet(item));
  }

  vratiSale(response: any): {sala: Sala, checked: boolean}[] {
    let sale: Sala[] = response.map((item: any) => new Sala(item));
    let izabrane: {sala: Sala, checked: boolean}[] = [];
    for(let sala of sale){
      izabrane.push({sala: sala, checked: false});
    }
    return izabrane;
  }

  vratiTipRezervacije(response: any): TipRezervacije[] {
    return response.map((item: any) => new TipRezervacije(item));
  }

  vratiPodtip(response: any): PodtipRezervacije[] {
    return response.map((item: any) => new PodtipRezervacije(item));
  }

  vratiTipSale(response: any): TipSale[] {
    return response.map((item: any) => new TipSale(item));
  }

    onTipRezervacijeChange(event: Event) {
      const target = event.target as HTMLSelectElement;
      const selectedTipId = target.value;
      const selectedTipIdNumber = parseInt(selectedTipId);
      this.izabraniTip = this.tipRezervacije.find(tip => tip.tipRezervacijeId === selectedTipIdNumber) ?? null;
      this.izabraniTipId = selectedTipIdNumber;

      if (this.izabraniTip) {
          this.filtriraniPodtipRezervacije = this.podtipRezervacije.filter(podtip => podtip.tipRezervacije?.tipRezervacijeId === this.izabraniTip?.tipRezervacijeId);
      } else {
          this.filtriraniPodtipRezervacije = [];
      }
  } 
  

}

