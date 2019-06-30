import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IFilmeMusica } from 'app/shared/model/filmeMusica.model';
import { FilmeMusicaService } from './filme-musica.service';
import { IFilme } from 'app/shared/model/filme.model';
import { FilmeService } from 'app/entities/filme';
import { IMusica } from 'app/shared/model/musica.model';
import { MusicaService } from 'app/entities/musica';

@Component({
    selector: 'jhi-filme-musica-update',
    templateUrl: './filme-musica-update.component.html'
})
export class FilmeMusicaUpdateComponent implements OnInit {
    filmeMusica: IFilmeMusica;
    isSaving: boolean;
    filmes: IFilme[];
    musicas: IMusica[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected filmeMusicaService: FilmeMusicaService,
        protected filmeService: FilmeService,
        protected musicaService: MusicaService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ filmeMusica }) => {
            this.filmeMusica = filmeMusica;
        });
        this.filmeService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IFilme[]>) => mayBeOk.ok),
                map((response: HttpResponse<IFilme[]>) => response.body)
            )
            .subscribe((res: IFilme[]) => (this.filmes = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.musicaService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IMusica[]>) => mayBeOk.ok),
                map((response: HttpResponse<IMusica[]>) => response.body)
            )
            .subscribe((res: IMusica[]) => (this.musicas = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.filmeMusica.id !== undefined) {
            this.subscribeToSaveResponse(this.filmeMusicaService.update(this.filmeMusica));
        } else {
            this.subscribeToSaveResponse(this.filmeMusicaService.create(this.filmeMusica));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IFilmeMusica>>) {
        result.subscribe((res: HttpResponse<IFilmeMusica>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackFilmeById(index: number, item: IFilme) {
        return item.id;
    }
    trackMusicaById(index: number, item: IMusica) {
        return item.id;
    }
}
