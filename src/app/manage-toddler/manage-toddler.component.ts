import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Subject, takeUntil } from 'rxjs';
import { AppServiceService } from '../app-service.service';
import { balita } from '../models';
import { DeleteModalComponent } from '../shared/delete-modal/delete-modal.component';
import { AddToddlerModalComponent } from './add-toddler-modal/add-toddler-modal.component';

@Component({
  selector: 'app-manage-toddler',
  templateUrl: './manage-toddler.component.html',
  styleUrls: ['./manage-toddler.component.scss']
})
export class ManageToddlerComponent implements OnInit {
  destroySubject$: Subject<void> = new Subject();
  allToddlers: balita[] = [];
  totalToddlersData: number = 0;
  isLoading: boolean = false;
  isError: boolean = false;

  modalRefDelete: MdbModalRef<DeleteModalComponent> | null = null;
  modalRefAddEdit: MdbModalRef<AddToddlerModalComponent> | null = null;

  constructor(private service: AppServiceService,
              private modalService: MdbModalService) {
  }

  ngOnInit(): void {
    this.getAllToddler();
  }

  getAllToddler() {
    this.isLoading = true;
    this.isError = false;
    this.service.getAllToddler()
      .pipe(takeUntil(this.destroySubject$))
      .subscribe(data => {
        this.allToddlers = [...data];
        this.totalToddlersData = data.length;
        this.isLoading = false;
      }, err => {
        this.isError = true;
        this.isLoading = false;
      })
  }

  deleteToddler(id: number) {
    this.service.deleteToddler(id)
      .pipe(takeUntil(this.destroySubject$))
      .subscribe(data => {
        this.isLoading = false;
        this.getAllToddler();
      }, err => {
        this.isError = true;
        this.isLoading = false;
      })
  }

  openDialogDeleteToddler(id: number) {
    this.modalRefDelete = this.modalService.open(DeleteModalComponent, {
      modalClass: 'modal-dialog-centered'
    });
    this.modalRefDelete.onClose.subscribe((message: any) => {
      if (message === 'delete') {
        this.deleteToddler(id);
      }
    });
  }

  openDialogAddEditToddler(toddler?: balita) {
    this.modalRefAddEdit = this.modalService.open(AddToddlerModalComponent, {
      modalClass: 'modal-lg',
      data: {toddler: toddler},
      ignoreBackdropClick: true
    });
    this.modalRefAddEdit.onClose.subscribe((message: any) => {
      if (message === 'submit') {
        this.getAllToddler();
      }
    });
  }
}
