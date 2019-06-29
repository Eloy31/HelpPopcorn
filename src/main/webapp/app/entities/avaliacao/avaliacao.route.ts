import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Avaliacao } from 'app/shared/model/avaliacao.model';
import { AvaliacaoService } from './avaliacao.service';
import { AvaliacaoComponent } from './avaliacao.component';
import { AvaliacaoDetailComponent } from './avaliacao-detail.component';
import { AvaliacaoUpdateComponent } from './avaliacao-update.component';
import { AvaliacaoDeletePopupComponent } from './avaliacao-delete-dialog.component';
import { IAvaliacao } from 'app/shared/model/avaliacao.model';

@Injectable({ providedIn: 'root' })
export class AvaliacaoResolve implements Resolve<IAvaliacao> {
    constructor(private service: AvaliacaoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAvaliacao> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Avaliacao>) => response.ok),
                map((avaliacao: HttpResponse<Avaliacao>) => avaliacao.body)
            );
        }
        return of(new Avaliacao());
    }
}

export const avaliacaoRoute: Routes = [
    {
        path: '',
        component: AvaliacaoComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'Avaliacaos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: AvaliacaoDetailComponent,
        resolve: {
            avaliacao: AvaliacaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Avaliacaos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: AvaliacaoUpdateComponent,
        resolve: {
            avaliacao: AvaliacaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Avaliacaos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: AvaliacaoUpdateComponent,
        resolve: {
            avaliacao: AvaliacaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Avaliacaos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const avaliacaoPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: AvaliacaoDeletePopupComponent,
        resolve: {
            avaliacao: AvaliacaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Avaliacaos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
