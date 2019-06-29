import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAvaliacao } from 'app/shared/model/avaliacao.model';
import { AvaliacaoService } from './avaliacao.service';

@Component({
    selector: 'jhi-avaliacao-delete-dialog',
    templateUrl: './avaliacao-delete-dialog.component.html'
})
export class AvaliacaoDeleteDialogComponent {
    avaliacao: IAvaliacao;

    constructor(
        protected avaliacaoService: AvaliacaoService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.avaliacaoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'avaliacaoListModification',
                content: 'Deleted an avaliacao'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-avaliacao-delete-popup',
    template: ''
})
export class AvaliacaoDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ avaliacao }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AvaliacaoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.avaliacao = avaliacao;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/avaliacao', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/avaliacao', { outlets: { popup: null } }]);
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
