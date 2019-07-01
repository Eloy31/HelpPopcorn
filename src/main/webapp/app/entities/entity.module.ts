import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'filme',
                loadChildren: './filme/filme.module#HelpPopcornFilmeModule'
            },
            {
                path: 'avaliacao',
                loadChildren: './avaliacao/avaliacao.module#HelpPopcornAvaliacaoModule'
            },
            {
                path: 'cinema',
                loadChildren: './cinema/cinema.module#HelpPopcornCinemaModule'
            },
            {
                path: 'musica',
                loadChildren: './musica/musica.module#HelpPopcornMusicaModule'
            },
            {
                path: 'filme-musica',
                loadChildren: './filme-musica/filme-musica.module#HelpPopcornFilmeMusicaModule'
            },
            {
                path: 'filme-cinema',
                loadChildren: './filme-cinema/filme-cinema.module#HelpPopcornFilmeCinemaModule'
            }
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HelpPopcornEntityModule {}
