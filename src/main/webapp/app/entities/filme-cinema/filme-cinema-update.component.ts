import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IFilmeCinema } from 'app/shared/model/filmeCinema.model';
import { FilmeCinemaService } from './filme-cinema.service';
import { IFilme } from 'app/shared/model/filme.model';
import { FilmeService } from 'app/entities/filme';
import { ICinema } from 'app/shared/model/cinema.model';
import { CinemaService } from 'app/entities/cinema';

@Component({
    selector: 'jhi-filme-cinema-update',
    templateUrl: './filme-cinema-update.component.html'
})
export class FilmeCinemaUpdateComponent implements OnInit {
    filmeCinema: IFilmeCinema;
    isSaving: boolean;
    filmes: IFilme[];
    cinemas: ICinema[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected filmeCinemaService: FilmeCinemaService,
        protected filmeService: FilmeService,
        protected cinemaService: CinemaService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ filmeCinema }) => {
            this.filmeCinema = filmeCinema;
        });
        this.filmeService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IFilme[]>) => mayBeOk.ok),
                map((response: HttpResponse<IFilme[]>) => response.body)
            )
            .subscribe((res: IFilme[]) => (this.filmes = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.cinemaService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ICinema[]>) => mayBeOk.ok),
                map((response: HttpResponse<ICinema[]>) => response.body)
            )
            .subscribe((res: ICinema[]) => (this.cinemas = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.filmeCinema.id !== undefined) {
            this.subscribeToSaveResponse(this.filmeCinemaService.update(this.filmeCinema));
        } else {
            this.subscribeToSaveResponse(this.filmeCinemaService.create(this.filmeCinema));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IFilmeCinema>>) {
        result.subscribe((res: HttpResponse<IFilmeCinema>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    trackCinemaById(index: number, item: ICinema) {
        return item.id;
    }
}
