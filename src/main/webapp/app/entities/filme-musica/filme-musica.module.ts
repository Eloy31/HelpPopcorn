import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HelpPopcornSharedModule } from 'app/shared';
import {
    FilmeMusicaComponent,
    FilmeMusicaDetailComponent,
    FilmeMusicaUpdateComponent,
    FilmeMusicaDeletePopupComponent,
    FilmeMusicaDeleteDialogComponent,
    filmeMusicaRoute,
    filmeMusicaPopupRoute
} from './';

const ENTITY_STATES = [...filmeMusicaRoute, ...filmeMusicaPopupRoute];

@NgModule({
    imports: [HelpPopcornSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FilmeMusicaComponent,
        FilmeMusicaDetailComponent,
        FilmeMusicaUpdateComponent,
        FilmeMusicaDeleteDialogComponent,
        FilmeMusicaDeletePopupComponent
    ],
    entryComponents: [FilmeMusicaComponent, FilmeMusicaUpdateComponent, FilmeMusicaDeleteDialogComponent, FilmeMusicaDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HelpPopcornFilmeMusicaModule {}
