import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMusica } from 'app/shared/model/musica.model';

@Component({
    selector: 'jhi-musica-detail',
    templateUrl: './musica-detail.component.html'
})
export class MusicaDetailComponent implements OnInit {
    musica: IMusica;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ musica }) => {
            this.musica = musica;
        });
    }

    previousState() {
        window.history.back();
    }
}
