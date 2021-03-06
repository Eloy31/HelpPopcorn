import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IFilme } from 'app/shared/model/filme.model';
import { FilmeService } from './filme.service';

@Component({
    selector: 'jhi-filme-update',
    templateUrl: './filme-update.component.html'
})
export class FilmeUpdateComponent implements OnInit {
    filme: IFilme;
    isSaving: boolean;

    constructor(protected filmeService: FilmeService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ filme }) => {
            this.filme = filme;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.filme.id !== undefined) {
            this.subscribeToSaveResponse(this.filmeService.update(this.filme));
        } else {
            this.subscribeToSaveResponse(this.filmeService.create(this.filme));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IFilme>>) {
        result.subscribe((res: HttpResponse<IFilme>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
