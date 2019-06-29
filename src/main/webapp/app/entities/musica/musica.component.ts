import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMusica } from 'app/shared/model/musica.model';
import { AccountService } from 'app/core';
import { MusicaService } from './musica.service';

@Component({
    selector: 'jhi-musica',
    templateUrl: './musica.component.html'
})
export class MusicaComponent implements OnInit, OnDestroy {
    musicas: IMusica[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected musicaService: MusicaService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.musicaService
            .query()
            .pipe(
                filter((res: HttpResponse<IMusica[]>) => res.ok),
                map((res: HttpResponse<IMusica[]>) => res.body)
            )
            .subscribe(
                (res: IMusica[]) => {
                    this.musicas = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInMusicas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMusica) {
        return item.id;
    }

    registerChangeInMusicas() {
        this.eventSubscriber = this.eventManager.subscribe('musicaListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
