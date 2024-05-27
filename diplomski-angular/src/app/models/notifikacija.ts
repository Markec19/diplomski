import { Rezervacija } from "./rezervacija";


export class Notifikacija {
    notifikacijeId: number = 0;
    notifikacija: string = "";
    rezervacija: Rezervacija | null = null;
}