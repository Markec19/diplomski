export class TipSale {
    tipSaleId: number = 0;
    tip: string = "";

    constructor(data: any){
        this.tipSaleId = data.tipSaleId;
        this.tip = data.tip;
    }
}
