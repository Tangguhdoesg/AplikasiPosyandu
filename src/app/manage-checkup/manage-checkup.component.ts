import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Subject, takeUntil } from 'rxjs';
import { AppServiceService } from '../app-service.service';
import { checkup, userPosyanduType } from '../models';
import { DeleteModalComponent } from '../shared/delete-modal/delete-modal.component';
import { AddCheckupModalComponent } from './add-checkup-modal/add-checkup-modal.component';

@Component({
  selector: 'app-manage-checkup',
  templateUrl: './manage-checkup.component.html',
  styleUrls: ['./manage-checkup.component.scss']
})
export class ManageCheckupComponent {
  destroySubject$: Subject<void> = new Subject();
  allCheckup: checkup[] = [];
  totalCheckupData: number = 0;
  isLoading: boolean = false;
  isError: boolean = false;
  showSuccessMessage: boolean = false;
  successMessage: string = '';

  userRole = sessionStorage.getItem('tipe');

  modalRefDelete: MdbModalRef<DeleteModalComponent> | null = null;
  modalRefAddEdit: MdbModalRef<AddCheckupModalComponent> | null = null;

  constructor(private service: AppServiceService,
              private modalService: MdbModalService) {
  }

  ngOnInit(): void {
    this.userRole === userPosyanduType.PETUGAS ? this.getAllCheckup() : this.getAllUserCheckup();
  }

  getAllUserCheckup() {
    this.isLoading = true;
    this.isError = false;
    this.service.getAllUserCheckup(sessionStorage.getItem('id'))
      .pipe(takeUntil(this.destroySubject$))
      .subscribe(data => {
        this.allCheckup = [...data];
        this.totalCheckupData = data.length;
        this.isLoading = false;
      }, err => {
        this.isError = true;
        this.isLoading = false;
      })
  }

  getAllCheckup() {
    this.isLoading = true;
    this.isError = false;
    this.service.getAllCheckup()
      .pipe(takeUntil(this.destroySubject$))
      .subscribe(data => {
        this.allCheckup = [...data];
        this.totalCheckupData = data.length;
        this.isLoading = false;
      }, err => {
        this.isError = true;
        this.isLoading = false;
      })
  }

  deleteCheckup(id: number) {
    this.service.deleteCheckup(id)
      .pipe(takeUntil(this.destroySubject$))
      .subscribe(data => {
        this.isLoading = false;
        this.getAllCheckup();
      }, err => {
        this.isError = true;
        this.isLoading = false;
      })
  }

  openDialogDeleteCheckup(id: number) {
    this.modalRefDelete = this.modalService.open(DeleteModalComponent, {
      modalClass: 'modal-dialog-centered'
    });
    this.modalRefDelete.onClose.subscribe((message: any) => {
      if (message === 'delete') {
        this.showSuccessMessage = true;
        this.successMessage = 'Data berhasil dihapus.'
        this.deleteCheckup(id);
      } else {
        this.showSuccessMessage = false;
      }
    });
  }

  openDialogAddEditCheckup(checkup?: checkup) {
    this.modalRefAddEdit = this.modalService.open(AddCheckupModalComponent, {
      modalClass: 'modal-lg',
      data: {checkup: checkup},
      ignoreBackdropClick: true
    });
    this.modalRefAddEdit.onClose.subscribe((message: any) => {
      if (message === 'submit') {
        this.showSuccessMessage = true;
        this.successMessage = 'Data berhasil disimpan.'
        this.getAllCheckup();
      } else {
        this.showSuccessMessage = false;
      }
    });
  }

  checkAddEditAccess(): boolean {
    return this.userRole === userPosyanduType.PETUGAS;
  }

}
