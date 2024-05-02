import { TipSale } from "./tip-sale";

export class Sala {
    salaId: number = 0;
    sala: string = "";
    tipSale: TipSale | null = null;

    constructor(data: any){
        this.salaId = data.salaId;
        this.sala = data.sala;
        if (data.tipSale) {
            this.tipSale = new TipSale(data.tipSale);
        }
    }
}
