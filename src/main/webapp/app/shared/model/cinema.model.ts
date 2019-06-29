export interface ICinema {
    id?: number;
    nome?: string;
    cidade?: string;
    bairro?: string;
    qtdSala?: any;
}

export class Cinema implements ICinema {
    constructor(public id?: number, public nome?: string, public cidade?: string, public bairro?: string, public qtdSala?: any) {}
}
