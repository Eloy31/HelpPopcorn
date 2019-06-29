import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICinema } from 'app/shared/model/cinema.model';
import { AccountService } from 'app/core';
import { CinemaService } from './cinema.service';

@Component({
    selector: 'jhi-cinema',
    templateUrl: './cinema.component.html'
})
export class CinemaComponent implements OnInit, OnDestroy {
    cinemas: ICinema[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected cinemaService: CinemaService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.cinemaService
            .query()
            .pipe(
                filter((res: HttpResponse<ICinema[]>) => res.ok),
                map((res: HttpResponse<ICinema[]>) => res.body)
            )
            .subscribe(
                (res: ICinema[]) => {
                    this.cinemas = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCinemas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICinema) {
        return item.id;
    }

    registerChangeInCinemas() {
        this.eventSubscriber = this.eventManager.subscribe('cinemaListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
