import { IFilme } from 'app/shared/model/filme.model';
import { ICinema } from 'app/shared/model/cinema.model';

export interface IFilmeCinema {
    id?: number;
    filmes?: IFilme[];
    cinemas?: ICinema[];
}

export class FilmeCinema implements IFilmeCinema {
    constructor(public id?: number, public filmes?: IFilme[], public cinemas?: ICinema[]) {}
}
