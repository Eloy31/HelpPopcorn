import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IFilmeMusica } from 'app/shared/model/filmeMusica.model';
import { AccountService } from 'app/core';
import { FilmeMusicaService } from './filme-musica.service';

@Component({
    selector: 'jhi-filme-musica',
    templateUrl: './filme-musica.component.html'
})
export class FilmeMusicaComponent implements OnInit, OnDestroy {
    filmeMusicas: IFilmeMusica[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected filmeMusicaService: FilmeMusicaService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.filmeMusicaService
            .query()
            .pipe(
                filter((res: HttpResponse<IFilmeMusica[]>) => res.ok),
                map((res: HttpResponse<IFilmeMusica[]>) => res.body)
            )
            .subscribe(
                (res: IFilmeMusica[]) => {
                    this.filmeMusicas = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInFilmeMusicas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IFilmeMusica) {
        return item.id;
    }

    registerChangeInFilmeMusicas() {
        this.eventSubscriber = this.eventManager.subscribe('filmeMusicaListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
