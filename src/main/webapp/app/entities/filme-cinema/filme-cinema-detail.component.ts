import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFilmeCinema } from 'app/shared/model/filmeCinema.model';

@Component({
    selector: 'jhi-filme-cinema-detail',
    templateUrl: './filme-cinema-detail.component.html'
})
export class FilmeCinemaDetailComponent implements OnInit {
    filmeCinema: IFilmeCinema;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ filmeCinema }) => {
            this.filmeCinema = filmeCinema;
        });
    }

    previousState() {
        window.history.back();
    }
}
