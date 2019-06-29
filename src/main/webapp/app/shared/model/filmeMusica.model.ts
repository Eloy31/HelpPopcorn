import { IFilme } from 'app/shared/model/filme.model';
import { IMusica } from 'app/shared/model/musica.model';

export interface IFilmeMusica {
    id?: number;
    filmes?: IFilme[];
    musicas?: IMusica[];
}

export class FilmeMusica implements IFilmeMusica {
    constructor(public id?: number, public filmes?: IFilme[], public musicas?: IMusica[]) {}
}
