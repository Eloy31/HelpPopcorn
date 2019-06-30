import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFilmeMusica } from 'app/shared/model/filmeMusica.model';

@Component({
    selector: 'jhi-filme-musica-detail',
    templateUrl: './filme-musica-detail.component.html'
})
export class FilmeMusicaDetailComponent implements OnInit {
    filmeMusica: IFilmeMusica;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ filmeMusica }) => {
            this.filmeMusica = filmeMusica;
        });
    }

    previousState() {
        window.history.back();
    }
}
