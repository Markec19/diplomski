import { Profil } from "./profil";

export class Rola {
    rolaId: number = 0;
    rola: string = "";
    
    constructor(data: any = null){
        if(data !== null){
            this.rolaId = data.rolaId;
            this.rola = data.rola;
        }
    }
}