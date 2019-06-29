import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IMusica } from 'app/shared/model/musica.model';
import { MusicaService } from './musica.service';

@Component({
    selector: 'jhi-musica-update',
    templateUrl: './musica-update.component.html'
})
export class MusicaUpdateComponent implements OnInit {
    musica: IMusica;
    isSaving: boolean;

    constructor(protected musicaService: MusicaService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ musica }) => {
            this.musica = musica;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.musica.id !== undefined) {
            this.subscribeToSaveResponse(this.musicaService.update(this.musica));
        } else {
            this.subscribeToSaveResponse(this.musicaService.create(this.musica));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IMusica>>) {
        result.subscribe((res: HttpResponse<IMusica>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
