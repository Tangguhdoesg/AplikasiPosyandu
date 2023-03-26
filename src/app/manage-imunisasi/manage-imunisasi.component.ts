import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Subject, takeUntil } from 'rxjs';
import { AppServiceService } from '../app-service.service';
import { imunisasi, userPosyanduType } from '../models';
import { DeleteModalComponent } from '../shared/delete-modal/delete-modal.component';
import { AddImunisasiModalComponent } from './add-imunisasi-modal/add-imunisasi-modal.component';

@Component({
  selector: 'app-manage-imunisasi',
  templateUrl: './manage-imunisasi.component.html',
  styleUrls: ['./manage-imunisasi.component.scss']
})
export class ManageImunisasiComponent {
  destroySubject$: Subject<void> = new Subject();
  allImunisasi: imunisasi[] = [];
  totalImunisasiData: number = 0;
  isLoading: boolean = false;
  isError: boolean = false;

  userRole = sessionStorage.getItem('tipe');

  modalRefDelete: MdbModalRef<DeleteModalComponent> | null = null;
  modalRefAddEdit: MdbModalRef<AddImunisasiModalComponent> | null = null;

  constructor(private service: AppServiceService,
              private modalService: MdbModalService) {
  }

  ngOnInit(): void {
    this.userRole === userPosyanduType.PETUGAS ? this.getAllImunisasi() : this.getAllUserImunisasi();
  }

  getAllImunisasi() {
    this.isLoading = true;
    this.isError = false;
    this.service.getAllImunisasi()
      .pipe(takeUntil(this.destroySubject$))
      .subscribe(data => {
        this.allImunisasi = [...data];
        this.totalImunisasiData = data.length;
        this.isLoading = false;
      }, err => {
        this.isError = true;
        this.isLoading = false;
      })
  }

  getAllUserImunisasi() {
    this.isLoading = true;
    this.isError = false;
    this.service.getAllUserImunisasi(sessionStorage.getItem('id'))
      .pipe(takeUntil(this.destroySubject$))
      .subscribe(data => {
        this.allImunisasi = [...data];
        this.totalImunisasiData = data.length;
        this.isLoading = false;
      }, err => {
        this.isError = true;
        this.isLoading = false;
      })
  }

  deleteImunisasi(id: number) {
    this.service.deleteImunisasi(id)
      .pipe(takeUntil(this.destroySubject$))
      .subscribe(data => {
        this.isLoading = false;
        this.getAllImunisasi();
      }, err => {
        this.isError = true;
        this.isLoading = false;
      })
  }

  openDialogDeleteImunisasi(id: number) {
    this.modalRefDelete = this.modalService.open(DeleteModalComponent, {
      modalClass: 'modal-dialog-centered'
    });
    this.modalRefDelete.onClose.subscribe((message: any) => {
      if (message === 'delete') {
        this.deleteImunisasi(id);
      }
    });
  }

  openDialogAddEditImunisasi(imunisasi?: imunisasi) {
    this.modalRefAddEdit = this.modalService.open(AddImunisasiModalComponent, {
      modalClass: 'modal-lg',
      data: {imunisasi: imunisasi},
      ignoreBackdropClick: true
    });
    this.modalRefAddEdit.onClose.subscribe((message: any) => {
      if (message === 'submit') {
        this.getAllImunisasi();
      }
    });
  }

  checkAddEditAccess(): boolean {
    return this.userRole === userPosyanduType.PETUGAS;
  }
}
