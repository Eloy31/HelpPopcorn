import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { IFilme } from 'app/shared/model/filme.model';
import { FilmeService } from 'app/entities/filme/filme.service';
import { ICinema } from 'app/shared/model/cinema.model';
import { CinemaService } from 'app/entities/cinema/cinema.service';
import { LoginModalService, AccountService, Account } from 'app/core';
import { filter, map } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    filmes: IFilme[];
    cinemas: ICinema[];
    filme: boolean;
    teste: boolean;

    constructor(
        private accountService: AccountService,
        private filmeService: FilmeService,
        private cinemaService: CinemaService,
        private loginModalService: LoginModalService,
        protected jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager
    ) {}

    ngOnInit() {
        this.accountService.identity().then((account: Account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
        this.filme = false;
        this.teste = false;
    }

    setFilme() {
        this.filme = true;
        this.teste = false;

        this.filmeService
            .query()
            .pipe(
                filter((res: HttpResponse<IFilme[]>) => res.ok),
                map((res: HttpResponse<IFilme[]>) => res.body)
            )
            .subscribe(
                (res: IFilme[]) => {
                    this.filmes = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    setCinema() {
        this.teste = true;
        this.filme = false;

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

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.accountService.identity().then(account => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.accountService.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
