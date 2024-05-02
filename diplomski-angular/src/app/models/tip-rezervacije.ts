export class TipRezervacije {
    tipRezervacijeId: number = 0;
    tip: string = "";

    constructor(data:any){
        this.tipRezervacijeId = data.tipRezervacijeId;
        this.tip = data.tip;
    }
}
