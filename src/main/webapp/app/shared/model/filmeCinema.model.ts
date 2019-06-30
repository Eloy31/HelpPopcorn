export interface IFilmeCinema {
    id?: number;
    id_filme?: number;
    id_cinema?: number;
}

export class FilmeCinema implements IFilmeCinema {
    constructor(public id?: number, public id_filme?: number, public id_cinema?: number) {}
}
