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

//   @Input() date!: Date;
//   @Input() rezervacije!: Rezervacija[]

//   rezervacijaForm: FormGroup = new FormGroup({});
//   predmeti: Predmet[] = [];
//   izabraneSale: {sala: Sala, checked: boolean}[] = [];
//   tipRezervacije: TipRezervacije[] = [];
//   podtipRezervacije: PodtipRezervacije[] = [];
//   tipSale: TipSale[] = [];
//   filteredPodtipRezervacije: PodtipRezervacije[] = [];  

//   izabraniPredmetId: number = 0;
//   izabraniPodtipId: number = 0;
//   izabraniTipId: number = 0;
//   izabraniTipRezervacije: TipRezervacije | null = null;
//   izabraniTipSale: TipSale | null = null;  
//   vremePocetka: Date = new Date(); 
//   vremeZavrsetka: Date = new Date(); 

//   sale: {sala: Sala, checked: boolean}[] = [];
//   dropdown = false;
//   toggleTip: boolean = false;
//   toggleTipRez: boolean = false;
//   saveUnsuccessful: boolean = false;
//   saveError: boolean = false;
//   saveNeispravnoVreme: boolean = false;

//   minTimePocetak: Date = new Date();
//   minTimeZavrsetak: Date = new Date();
//   maxTime: Date = new Date();




//   constructor(private formBuilder: FormBuilder, private router: Router, private axiosService: AxiosService, private route: ActivatedRoute){
//     this.vremePocetka.setHours(8);
//     this.vremePocetka.setMinutes(0);
//     this.vremeZavrsetka = this.vremePocetka;

//     this.minTimePocetak.setHours(8);
//     this.minTimePocetak.setMinutes(0);
//     this.minTimeZavrsetak = this.minTimePocetak;
//     this.maxTime.setHours(22);
//   }

//   onChange(item: {sala: Sala, checked: boolean}) {
//     console.log('Checkbox state changed for', item.sala.sala, ':', item.checked);
//   }


//   ngOnInit(): void {
//     this.rezervacijaForm = this.formBuilder.group({
//       predmet: ['', Validators.required],
//       vremePocetka: ['', Validators.required],
//       vremeZavrsetka: ['', Validators.required],
//       tipRezervacije: ['', Validators.required],
//       podtipRezervacije: ['', Validators.required],
//       izabraneSale: ['', Validators.required],
//       tipSale: ['']
//     })

//     this.axiosService.request(
//       "GET",
//       "/predmeti",
//       {}
//     ).then(
//       (response) => this.predmeti = this.vratiPredmete(response.data)
//     )

//     this.axiosService.request(
//       "GET",
//       "/sale",
//       {}
//     ).then(
//       (response) => this.izabraneSale = this.vratiSale(response.data),
//     )

//     this.axiosService.request(
//       "GET",
//       "/tip_rezervacije",
//       {}
//     ).then(
//       (response) => this.tipRezervacije = this.vratiTipRezervacije(response.data)
//     )

//     this.axiosService.request(
//       "GET",
//       "/podtip_rezervacije",
//       {}
//     ).then(
//       (response) => this.podtipRezervacije = this.vratiPodtip(response.data)
//     )

//     this.axiosService.request(
//       "GET",
//       "/tip_sale",
//       {}
//     ).then(
//       (response) => this.tipSale = this.vratiTipSale(response.data)
//     )

//     this.filteredPodtipRezervacije = this.podtipRezervacije;
//   }

//   toggleDropdown(event: MouseEvent) {
//     this.dropdown = !this.dropdown;
//   }

//   onSubmit() {

//     if(this.rezervacijaForm.valid){
//       console.log("valid");
//       this.sacuvajRezervaciju();
//     }else {
//       this.saveUnsuccessful = true;
//     }
//   }

//   izabraniPodtip(): PodtipRezervacije[]{
//     const podtip: PodtipRezervacije[] = [];
//     for(let pod of this.podtipRezervacije){
//       if(pod.tipRezervacije === this.izabraniTipRezervacije){
//         podtip.push(pod);
//       }
//     }
//     return podtip;
//   }

//   onTipRezervacijeChange(event: Event) {
//     const target = event.target as HTMLSelectElement;
//     const selectedTipId = target.value;
//     const selectedTipIdNumber = parseInt(selectedTipId);
//     this.izabraniTipRezervacije = this.tipRezervacije.find(tip => tip.tipRezervacijeId === selectedTipIdNumber) ?? null;

//     if (this.izabraniTipRezervacije) {
//         this.filteredPodtipRezervacije = this.podtipRezervacije.filter(podtip => podtip.tipRezervacije?.tipRezervacijeId === this.izabraniTipRezervacije?.tipRezervacijeId);
//     } else {
//         this.filteredPodtipRezervacije = [];
//     }

//     if(selectedTipIdNumber === 3){
//       this.toggleTipRez == false;
//     }else {
//       this.toggleTipRez == true;
//     }
//   } 

//   onTipSaleChange(event: Event) {
//     const target = event.target as HTMLSelectElement;
//     const selectedTipId = target.value;
//     const selectedTipIdNumber = parseInt(selectedTipId);
//     this.izabraniTipSale = this.tipSale.find(tip => tip.tipSaleId === selectedTipIdNumber) ?? null;

//     if (this.izabraniTipSale) {
//         this.sale = this.izabraneSale.filter(sala => sala.sala.tipSale?.tipSaleId === this.izabraniTipSale?.tipSaleId);
//     }
//   } 

//   toggleTipSale() {
//     this.toggleTip = !this.toggleTip;
//   }

//   toggleTipRezervacije() {
//     this.toggleTipRez = !this.toggleTipRez;
//   }

//   sacuvajRezervaciju(){
//     let satPocetak = this.satiUString(this.vremePocetka);
//     let minutPocetak = this.minutiUString(this.vremePocetka);
//     let vremePocetka = satPocetak + ":" + minutPocetak;

//     let satZavrsetak = this.satiUString(this.vremeZavrsetka);
//     let minutZavrsetak = this.minutiUString(this.vremeZavrsetka);
//     let vremeZavrsetka = satZavrsetak + ":" + minutZavrsetak;
    
//     let sale = this.izabraneSale.filter(data => data.checked === true);
//     let izabraniPredmet: Predmet | null = this.predmeti.find(predmet => predmet.predmetId == this.izabraniPredmetId) ?? null;
//     let izabraniPodtip: PodtipRezervacije | null = this.podtipRezervacije.find(podtip => podtip.podtipId == this.izabraniPodtipId) ?? null;

//     if(this.proveraVremena()){
//       if(sale.length > 0 && this.proveraDostupnosti(vremePocetka, vremeZavrsetka, sale)){
//         for(let sala of sale){
//           let rezervacija: Rezervacija = new Rezervacija();
//           rezervacija.predmet = izabraniPredmet;
//           rezervacija.sala = sala.sala;
//           rezervacija.podtipRezervacije = izabraniPodtip;
//           rezervacija.vremePocetka = vremePocetka; 
//           rezervacija.vremeZavrsetka = vremeZavrsetka;
//           rezervacija.datumSlanjaZahteva = new Date();
//           rezervacija.datumRezervacije = this.date;
//           let username = localStorage.getItem("username");
  
//           this.axiosService.request(
//             "POST",
//             "/sacuvaj/rezervacija",
//             {      
//               rezervacija: rezervacija,
//               username: username
//             }
//           ).then(response => {         
//             location.reload();
//           })
//         } 
//       } else {
//         this.saveError = true;
//       } 
//     } else {
//       this.saveNeispravnoVreme = true;
//     }
//   }


//   vratiPredmete(response: any): Predmet[] {
//     return response.map((item: any) => new Predmet(item));
//   }

//   vratiSale(response: any): {sala: Sala, checked: boolean}[] {
//     let sale: Sala[] = response.map((item: any) => new Sala(item));
//     let izabrane: {sala: Sala, checked: boolean}[] = [];
//     for(let sala of sale){
//       izabrane.push({sala: sala, checked: false});
//     }
//     return izabrane;
//   }

//   vratiTipRezervacije(response: any): TipRezervacije[] {
//     return response.map((item: any) => new TipRezervacije(item));
//   }

//   vratiPodtip(response: any): PodtipRezervacije[] {
//     return response.map((item: any) => new PodtipRezervacije(item));
//   }

//   vratiTipSale(response: any): TipSale[] {
//     return response.map((item: any) => new TipSale(item));
//   }

//   zatvoriFormu() {
//     window.location.reload();
//   }

//   proveraDostupnosti(vremePocetka: string, vremeZavrsetka: string, sale: { sala: Sala; checked: boolean; }[]): boolean {
//     for (let sala of sale) {
//       const overlappingReservation = this.rezervacije.find(data =>
//         data.sala?.salaId === sala.sala.salaId &&
//           this.preklapanjeIntervalaVremena(vremePocetka, vremeZavrsetka, data.vremePocetka, data.vremeZavrsetka)
//       );

//       if (overlappingReservation) {
//           return false;
//       }
//   }
//     return true;
//   }

//   proveraVremena(): boolean{
//     if(this.vremePocetka > this.vremeZavrsetka) {
//       return false;
//     }
//     return true
//   }

//   preklapanjeIntervalaVremena(start1: string, end1: string, start2: string, end2: string): boolean {
//     const startTime1 = new Date(start1).getTime();
//     const endTime1 = new Date(end1).getTime();
//     const startTime2 = new Date(start2).getTime();
//     const endTime2 = new Date(end2).getTime();

//     return !(startTime1 >= endTime2 || startTime2 >= endTime1);
// }

//   minutiUString(vreme: Date): string {
//     let str: string = "";
//     if(vreme.getMinutes() < 10){
//       return str + "0" + vreme.getMinutes();
//     }
//     return str + vreme.getMinutes();
//   }

//   satiUString(vreme: Date): string {
//     let str: string = "";
//     if(vreme.getHours() < 10){
//       return str + "0" + vreme.getHours();
//     }
//     return str + vreme.getHours();
//   }






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
    this.vremeZavrsetka = this.vremePocetka; // Postavi inicijalno vreme završetka na vreme početka

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
    //this.formClose.emit();
  }

  onCancel(): void {
    this.formClose.emit();
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

      if (this.izabraniTip) {
          this.filtriraniPodtipRezervacije = this.podtipRezervacije.filter(podtip => podtip.tipRezervacije?.tipRezervacijeId === this.izabraniTip?.tipRezervacijeId);
      } else {
          this.filtriraniPodtipRezervacije = [];
      }
  } 
  

}

