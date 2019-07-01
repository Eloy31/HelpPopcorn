import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IFilmeCinema } from 'app/shared/model/filmeCinema.model';
import { AccountService } from 'app/core';
import { FilmeCinemaService } from './filme-cinema.service';

@Component({
    selector: 'jhi-filme-cinema',
    templateUrl: './filme-cinema.component.html'
})
export class FilmeCinemaComponent implements OnInit, OnDestroy {
    filmeCinemas: IFilmeCinema[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected filmeCinemaService: FilmeCinemaService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.filmeCinemaService
            .query()
            .pipe(
                filter((res: HttpResponse<IFilmeCinema[]>) => res.ok),
                map((res: HttpResponse<IFilmeCinema[]>) => res.body)
            )
            .subscribe(
                (res: IFilmeCinema[]) => {
                    this.filmeCinemas = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInFilmeCinemas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IFilmeCinema) {
        return item.id;
    }

    registerChangeInFilmeCinemas() {
        this.eventSubscriber = this.eventManager.subscribe('filmeCinemaListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
