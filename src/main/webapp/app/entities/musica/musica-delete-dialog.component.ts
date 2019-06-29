import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMusica } from 'app/shared/model/musica.model';
import { MusicaService } from './musica.service';

@Component({
    selector: 'jhi-musica-delete-dialog',
    templateUrl: './musica-delete-dialog.component.html'
})
export class MusicaDeleteDialogComponent {
    musica: IMusica;

    constructor(protected musicaService: MusicaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.musicaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'musicaListModification',
                content: 'Deleted an musica'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-musica-delete-popup',
    template: ''
})
export class MusicaDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ musica }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MusicaDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.musica = musica;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/musica', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/musica', { outlets: { popup: null } }]);
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
