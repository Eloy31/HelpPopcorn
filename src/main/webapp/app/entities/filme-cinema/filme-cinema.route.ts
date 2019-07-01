import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FilmeCinemaService } from './filme-cinema.service';
import { FilmeCinemaComponent } from './filme-cinema.component';
import { FilmeCinemaDetailComponent } from './filme-cinema-detail.component';
import { FilmeCinemaUpdateComponent } from './filme-cinema-update.component';
import { FilmeCinemaDeletePopupComponent } from './filme-cinema-delete-dialog.component';
import { IFilmeCinema, FilmeCinema } from 'app/shared/model/filmeCinema.model';

@Injectable({ providedIn: 'root' })
export class FilmeCinemaResolve implements Resolve<IFilmeCinema> {
    constructor(private service: FilmeCinemaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IFilmeCinema> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<FilmeCinema>) => response.ok),
                map((filmeCinema: HttpResponse<FilmeCinema>) => filmeCinema.body)
            );
        }
        return of(new FilmeCinema());
    }
}

export const filmeCinemaRoute: Routes = [
    {
        path: '',
        component: FilmeCinemaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FilmeCinemas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: FilmeCinemaDetailComponent,
        resolve: {
            filmeCinema: FilmeCinemaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FilmeCinemas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: FilmeCinemaUpdateComponent,
        resolve: {
            filmeCinema: FilmeCinemaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FilmeCinemas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: FilmeCinemaUpdateComponent,
        resolve: {
            filmeCinema: FilmeCinemaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FilmeCinemas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const filmeCinemaPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: FilmeCinemaDeletePopupComponent,
        resolve: {
            filmeCinema: FilmeCinemaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FilmeCinemas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
