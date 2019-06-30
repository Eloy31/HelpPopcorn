import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FilmeMusicaService } from './filme-musica.service';
import { FilmeMusicaComponent } from './filme-musica.component';
import { FilmeMusicaDetailComponent } from './filme-musica-detail.component';
import { FilmeMusicaUpdateComponent } from './filme-musica-update.component';
import { FilmeMusicaDeletePopupComponent } from './filme-musica-delete-dialog.component';
import { IFilmeMusica, FilmeMusica } from 'app/shared/model/filmeMusica.model';

@Injectable({ providedIn: 'root' })
export class FilmeMusicaResolve implements Resolve<IFilmeMusica> {
    constructor(private service: FilmeMusicaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IFilmeMusica> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<FilmeMusica>) => response.ok),
                map((filmeMusica: HttpResponse<FilmeMusica>) => filmeMusica.body)
            );
        }
        return of(new FilmeMusica());
    }
}

export const filmeMusicaRoute: Routes = [
    {
        path: '',
        component: FilmeMusicaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FilmeMusicas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: FilmeMusicaDetailComponent,
        resolve: {
            filmeMusica: FilmeMusicaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FilmeMusicas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: FilmeMusicaUpdateComponent,
        resolve: {
            filmeMusica: FilmeMusicaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FilmeMusicas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: FilmeMusicaUpdateComponent,
        resolve: {
            filmeMusica: FilmeMusicaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FilmeMusicas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const filmeMusicaPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: FilmeMusicaDeletePopupComponent,
        resolve: {
            filmeMusica: FilmeMusicaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FilmeMusicas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
