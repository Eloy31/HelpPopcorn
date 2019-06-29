import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IAvaliacao } from 'app/shared/model/avaliacao.model';
import { AvaliacaoService } from './avaliacao.service';
import { IFilme } from 'app/shared/model/filme.model';
import { FilmeService } from 'app/entities/filme';

@Component({
    selector: 'jhi-avaliacao-update',
    templateUrl: './avaliacao-update.component.html'
})
export class AvaliacaoUpdateComponent implements OnInit {
    avaliacao: IAvaliacao;
    isSaving: boolean;

    filmes: IFilme[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected avaliacaoService: AvaliacaoService,
        protected filmeService: FilmeService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ avaliacao }) => {
            this.avaliacao = avaliacao;
        });
        this.filmeService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IFilme[]>) => mayBeOk.ok),
                map((response: HttpResponse<IFilme[]>) => response.body)
            )
            .subscribe((res: IFilme[]) => (this.filmes = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.avaliacao.id !== undefined) {
            this.subscribeToSaveResponse(this.avaliacaoService.update(this.avaliacao));
        } else {
            this.subscribeToSaveResponse(this.avaliacaoService.create(this.avaliacao));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IAvaliacao>>) {
        result.subscribe((res: HttpResponse<IAvaliacao>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
}
