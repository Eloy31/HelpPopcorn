import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HelpPopcornSharedModule } from 'app/shared';
import {
    MusicaComponent,
    MusicaDetailComponent,
    MusicaUpdateComponent,
    MusicaDeletePopupComponent,
    MusicaDeleteDialogComponent,
    musicaRoute,
    musicaPopupRoute
} from '.';

const ENTITY_STATES = [...musicaRoute, ...musicaPopupRoute];

@NgModule({
    imports: [HelpPopcornSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [MusicaComponent, MusicaDetailComponent, MusicaUpdateComponent, MusicaDeleteDialogComponent, MusicaDeletePopupComponent],
    entryComponents: [MusicaComponent, MusicaUpdateComponent, MusicaDeleteDialogComponent, MusicaDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HelpPopcornMusicaModule {}
