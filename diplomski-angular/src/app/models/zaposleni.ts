import { Profil } from "./profil";

export class Zaposleni{
    zaposleniId: number = 0;
    ime: string = "";
    prezime: string = "";

    constructor(data: any = null){
        if(data !== null){
            this.zaposleniId = data.zaposleniId;
            this.ime = data.ime;
            this.prezime = data.prezime;
        }
    }
}