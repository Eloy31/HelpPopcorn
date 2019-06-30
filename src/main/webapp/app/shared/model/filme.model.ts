export interface IFilme {
    id?: number;
    nome?: string;
    descricao?: string;
    ano?: number;
    estudio?: string;
}

export class Filme implements IFilme {
    constructor(public id?: number, public nome?: string, public descricao?: string, public ano?: number, public estudio?: string) {}
}
