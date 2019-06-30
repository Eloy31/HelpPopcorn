import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFilmeMusica } from 'app/shared/model/filmeMusica.model';
import { FilmeMusicaService } from './filme-musica.service';

@Component({
    selector: 'jhi-filme-musica-delete-dialog',
    templateUrl: './filme-musica-delete-dialog.component.html'
})
export class FilmeMusicaDeleteDialogComponent {
    filmeMusica: IFilmeMusica;

    constructor(
        protected filmeMusicaService: FilmeMusicaService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.filmeMusicaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'filmeMusicaListModification',
                content: 'Deleted an filmeMusica'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-filme-musica-delete-popup',
    template: ''
})
export class FilmeMusicaDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ filmeMusica }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(FilmeMusicaDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.filmeMusica = filmeMusica;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/filme-musica', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/filme-musica', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
