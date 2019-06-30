import { IFilme } from 'app/shared/model/filme.model';
import { IMusica } from 'app/shared/model/musica.model';

export interface IFilmeMusica {
    id?: number;
    filmes?: IFilme[];
    musicas?: IMusica[];
    id_filme?: IFilme;
    id_musica?: IMusica;
}

export class FilmeMusica implements IFilmeMusica {
    constructor(
        public id?: number,
        public filmes?: IFilme[],
        public musicas?: IMusica[],
        public id_filme?: IFilme,
        public id_musica?: IMusica
    ) {}
}
