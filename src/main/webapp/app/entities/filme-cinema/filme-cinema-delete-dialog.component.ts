import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFilmeCinema } from 'app/shared/model/filmeCinema.model';
import { FilmeCinemaService } from './filme-cinema.service';

@Component({
    selector: 'jhi-filme-cinema-delete-dialog',
    templateUrl: './filme-cinema-delete-dialog.component.html'
})
export class FilmeCinemaDeleteDialogComponent {
    filmeCinema: IFilmeCinema;

    constructor(
        protected filmeCinemaService: FilmeCinemaService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.filmeCinemaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'filmeCinemaListModification',
                content: 'Deleted an filmeCinema'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-filme-cinema-delete-popup',
    template: ''
})
export class FilmeCinemaDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ filmeCinema }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(FilmeCinemaDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.filmeCinema = filmeCinema;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/filme-cinema', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/filme-cinema', { outlets: { popup: null } }]);
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
