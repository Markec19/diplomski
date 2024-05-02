import { TipRezervacije } from "./tip-rezervacije";

export class PodtipRezervacije {
    podtipId: number = 0;
    podtip: string = "";
    tipRezervacije: TipRezervacije | null = null;

    constructor(data: any){
        this.podtipId = data.podtipId;
        this.podtip = data.podtip;
        if (data.tipRezervacije) {
            this.tipRezervacije = new TipRezervacije(data.tipRezervacije);
          }
    }
}
