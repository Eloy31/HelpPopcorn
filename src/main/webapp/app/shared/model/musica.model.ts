export interface IMusica {
    id?: number;
    nome?: string;
    autor?: string;
    ano?: number;
}

export class Musica implements IMusica {
    constructor(public id?: number, public nome?: string, public autor?: string, public ano?: number) {}
}
