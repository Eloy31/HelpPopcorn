import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Musica } from 'app/shared/model/musica.model';
import { MusicaService } from './musica.service';
import { MusicaComponent } from './musica.component';
import { MusicaDetailComponent } from './musica-detail.component';
import { MusicaUpdateComponent } from './musica-update.component';
import { MusicaDeletePopupComponent } from './musica-delete-dialog.component';
import { IMusica } from 'app/shared/model/musica.model';

@Injectable({ providedIn: 'root' })
export class MusicaResolve implements Resolve<IMusica> {
    constructor(private service: MusicaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMusica> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Musica>) => response.ok),
                map((musica: HttpResponse<Musica>) => musica.body)
            );
        }
        return of(new Musica());
    }
}

export const musicaRoute: Routes = [
    {
        path: '',
        component: MusicaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Musicas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: MusicaDetailComponent,
        resolve: {
            musica: MusicaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Musicas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: MusicaUpdateComponent,
        resolve: {
            musica: MusicaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Musicas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: MusicaUpdateComponent,
        resolve: {
            musica: MusicaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Musicas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const musicaPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: MusicaDeletePopupComponent,
        resolve: {
            musica: MusicaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Musicas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
