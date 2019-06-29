import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ICinema } from 'app/shared/model/cinema.model';
import { CinemaService } from './cinema.service';

@Component({
    selector: 'jhi-cinema-update',
    templateUrl: './cinema-update.component.html'
})
export class CinemaUpdateComponent implements OnInit {
    cinema: ICinema;
    isSaving: boolean;

    constructor(protected cinemaService: CinemaService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ cinema }) => {
            this.cinema = cinema;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.cinema.id !== undefined) {
            this.subscribeToSaveResponse(this.cinemaService.update(this.cinema));
        } else {
            this.subscribeToSaveResponse(this.cinemaService.create(this.cinema));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICinema>>) {
        result.subscribe((res: HttpResponse<ICinema>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
