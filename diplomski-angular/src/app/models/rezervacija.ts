import { PodtipRezervacije } from "./podtip-rezervacije";
import { Predmet } from "./predemt";
import { Profil } from "./profil";
import { Sala } from "./sala";
import { Status } from "./status";

export class Rezervacija {
    rezervacijaId: number = 0;
    vremePocetka: string = "";
    vremeZavrsetka: string = "";
    datumRezervacije: Date = new Date();
    datumSlanjaZahteva: Date = new Date();
    datumObrade: Date | null= null;
    napomena: string | null = null;
    dogadjaj: string | null = null;
    razlogOdbijanja: string | null = null;
    profil: Profil | null = null;
    admin: Profil | null = null;
    predmet: Predmet | null = null;    
    status: Status | null = null;    
    podtipRezervacije: PodtipRezervacije | null = null;
    sala: Sala | null = null;

    constructor(data: any = null){
        if(data !== null){
            this.rezervacijaId = data.rezervacijaId;
            this.vremePocetka = data.vremePocetka;
            this.vremeZavrsetka = data.vremeZavrsetka;
            this.datumRezervacije = new Date(data.datumRezervacije)
            this.datumSlanjaZahteva = new Date(data.datumSlanjaZahteva);
            this.datumObrade = new Date(data.datumObrade);
            this.razlogOdbijanja = data.razlogOdbijanja;
            this.dogadjaj = data.dogadjaj;       
            
            if (data.profil) {
                this.profil = new Profil(data.profil);
            }
            if (data.admin) {
                this.admin = new Profil(data.admin);
            }
            if (data.predmet) {
                this.predmet = new Predmet(data.predmet);
            }
            if (data.status) {
                this.status = new Status(data.status);
            }
            if (data.podtipRezervacije) {
                this.podtipRezervacije = new PodtipRezervacije(data.podtipRezervacije);
            }
            if (data.sala) {
                this.sala = new Sala(data.sala);
            }
        }
    }

}
