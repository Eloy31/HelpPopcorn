import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HelpPopcornSharedModule } from 'app/shared';
import {
    FilmeCinemaComponent,
    FilmeCinemaDetailComponent,
    FilmeCinemaUpdateComponent,
    FilmeCinemaDeletePopupComponent,
    FilmeCinemaDeleteDialogComponent,
    filmeCinemaRoute,
    filmeCinemaPopupRoute
} from '.';

const ENTITY_STATES = [...filmeCinemaRoute, ...filmeCinemaPopupRoute];

@NgModule({
    imports: [HelpPopcornSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FilmeCinemaComponent,
        FilmeCinemaDetailComponent,
        FilmeCinemaUpdateComponent,
        FilmeCinemaDeleteDialogComponent,
        FilmeCinemaDeletePopupComponent
    ],
    entryComponents: [FilmeCinemaComponent, FilmeCinemaUpdateComponent, FilmeCinemaDeleteDialogComponent, FilmeCinemaDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HelpPopcornFilmeCinemaModule {}
