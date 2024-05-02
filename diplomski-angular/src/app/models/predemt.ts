export class Predmet {
    predmetId: number = 0;
    predmet: string = "";
    
    constructor(data: any){
        this.predmetId = data.predmetId;
        this.predmet = data.predmet;
    }
}