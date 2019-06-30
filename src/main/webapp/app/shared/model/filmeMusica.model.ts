export interface IFilmeMusica {
    id?: number;
    id_filme?: number;
    id_musica?: number;
}

export class FilmeMusica implements IFilmeMusica {
    constructor(public id?: number, public id_filme?: number, public id_musica?: number) {}
}
