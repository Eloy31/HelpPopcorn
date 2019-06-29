import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HelpPopcornSharedModule } from 'app/shared';
import {
    CinemaComponent,
    CinemaDetailComponent,
    CinemaUpdateComponent,
    CinemaDeletePopupComponent,
    CinemaDeleteDialogComponent,
    cinemaRoute,
    cinemaPopupRoute
} from './';

const ENTITY_STATES = [...cinemaRoute, ...cinemaPopupRoute];

@NgModule({
    imports: [HelpPopcornSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [CinemaComponent, CinemaDetailComponent, CinemaUpdateComponent, CinemaDeleteDialogComponent, CinemaDeletePopupComponent],
    entryComponents: [CinemaComponent, CinemaUpdateComponent, CinemaDeleteDialogComponent, CinemaDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HelpPopcornCinemaModule {}
