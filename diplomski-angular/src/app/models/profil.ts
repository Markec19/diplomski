import { Rola } from "./rola";
import { Zaposleni } from "./zaposleni";

export class Profil {
    profilId: number = 0;
    username: string = "";
    password: string = "";
    zaposleni: Zaposleni | null = null;
    rola: Rola | null = null;
    
    constructor(data: any = null){
        if(data !== null){
            this.profilId = data.profilId;
            this.username = data.username;
            this.password = data.password
            if (data.rola) {
                this.rola = new Rola(data.rola);
            }
            if(data.zaposleni){
                this.zaposleni = new Zaposleni(data.zaposleni);
            }
        }
    }
}