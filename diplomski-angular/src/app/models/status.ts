export class Status {
    statusId: number = 0;
    status: string = "";

    constructor(data: any){
        this.statusId = data.statusId;
        this.status = data.status;
    }
}