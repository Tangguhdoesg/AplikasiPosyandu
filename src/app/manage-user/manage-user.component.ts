import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../app-service.service';
import { takeUntil } from "rxjs/operators"
import { Subject } from "rxjs"
import { userPosyandu } from '../models';
import * as dayjs from 'dayjs';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AddUserModalComponent } from './add-user-modal/add-user-modal.component';
import { DeleteModalComponent } from '../shared/delete-modal/delete-modal.component';
import { SortService } from '../shared/sort.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {
  destroySubject$: Subject<void> = new Subject();
  allUsers: userPosyandu[] = [];
  totalUsersData: number = 0;
  isLoading: boolean = false;
  isError: boolean = false;
  showSuccessMessage: boolean = false;
  successMessage: string = '';

  modalRef: MdbModalRef<DeleteModalComponent> | null = null;
  modalRefAddEdit: MdbModalRef<AddUserModalComponent> | null = null;
  
  searchValue: string = '';

  sortNama: number = 0;
  sortNik: number = 0;
  sortNoTelp: number = 0;
  sortTanggalLahir: number = 0;
  sortAlamat: number = 0;
  sortTipe: number = 0;

  constructor(private service: AppServiceService,
              private modalService: MdbModalService,
              private sortService: SortService) {
  }

  ngOnInit(): void {
    this.getAllUser();
  }

  changeSortNama() {
    this.sortNik = 0;
    this.sortNoTelp = 0;
    this.sortTanggalLahir = 0;
    this.sortAlamat = 0;
    this.sortTipe = 0;
    if (this.sortNama === 0) this.sortNama = 1;
    else if (this.sortNama === 1) this.sortNama = -1;
    else this.sortNama = 1;
    this.sortService.sort(this.allUsers, 'namaUser', this.sortNama);
  }

  changeSortNik() {
    this.sortNama = 0;
    this.sortNoTelp = 0;
    this.sortTanggalLahir = 0;
    this.sortAlamat = 0;
    this.sortTipe = 0;
    if (this.sortNik === 0) this.sortNik = 1;
    else if (this.sortNik === 1) this.sortNik = -1;
    else this.sortNik = 1;
    this.sortService.sort(this.allUsers, 'nikUser', this.sortNik);
  }

  changeSortNoTelp() {
    this.sortNama = 0;
    this.sortNik = 0;
    this.sortTanggalLahir = 0;
    this.sortAlamat = 0;
    this.sortTipe = 0;
    if (this.sortNoTelp === 0) this.sortNoTelp = 1;
    else if (this.sortNoTelp === 1) this.sortNoTelp = -1;
    else this.sortNoTelp = 1;
    this.sortService.sort(this.allUsers, 'noTeleponUser', this.sortNoTelp);
  }

  changeSortTanggalLahir() {
    this.sortNama = 0;
    this.sortNik = 0;
    this.sortNoTelp = 0;
    this.sortAlamat = 0;
    this.sortTipe = 0;
    if (this.sortTanggalLahir === 0) this.sortTanggalLahir = 1;
    else if (this.sortTanggalLahir === 1) this.sortTanggalLahir = -1;
    else this.sortTanggalLahir = 1;
    this.sortService.sort(this.allUsers, 'tanggalLahirUser', this.sortTanggalLahir);
  }

  changeSortAlamat() {
    this.sortNama = 0;
    this.sortNik = 0;
    this.sortNoTelp = 0;
    this.sortTanggalLahir = 0;
    this.sortTipe = 0;
    if (this.sortAlamat === 0) this.sortAlamat = 1;
    else if (this.sortAlamat === 1) this.sortAlamat = -1;
    else this.sortAlamat = 1;
    this.sortService.sort(this.allUsers, 'alamatUser', this.sortAlamat);
  }

  changeSortTipe() {
    this.sortNama = 0;
    this.sortNik = 0;
    this.sortNoTelp = 0;
    this.sortTanggalLahir = 0;
    this.sortAlamat = 0;
    if (this.sortTipe === 0) this.sortTipe = 1;
    else if (this.sortTipe === 1) this.sortTipe = -1;
    else this.sortTipe = 1;
    this.sortService.sort(this.allUsers, 'tipeUser', this.sortTipe);
  }

  resetSort() {
    this.sortNama = 0;
    this.sortNik = 0;
    this.sortNoTelp = 0;
    this.sortTanggalLahir = 0;
    this.sortAlamat = 0;
    this.sortTipe = 0;
  }

  getAllUser() {
    this.isLoading = true;
    this.isError = false;
    this.service.getAllUser()
      .pipe(takeUntil(this.destroySubject$))
      .subscribe(data => {
        this.allUsers = [...data];
        this.totalUsersData = data.length;
        this.isLoading = false;
      }, err => {
        this.isError = true;
        this.isLoading = false;
      })
  }

  deleteUser(id: number) {
    this.service.deleteUser(id)
      .pipe(takeUntil(this.destroySubject$))
      .subscribe(data => {
        this.isLoading = false;
        this.getAllUser();
      }, err => {
        this.isError = true;
        this.isLoading = false;
      })
  }

  openDialogDeleteUser(id: any) {
    this.modalRef = this.modalService.open(DeleteModalComponent, {
      modalClass: 'modal-dialog-centered'
    });
    this.modalRef.onClose.subscribe((message: any) => {
      if (message === 'delete') {
        this.showSuccessMessage = true;
        this.successMessage = 'Data berhasil dihapus.'
        this.deleteUser(id);
      } else {
        this.showSuccessMessage = false;
      }
    });
  }

  openDialogAddEditUser(user?: userPosyandu) {
    this.modalRefAddEdit = this.modalService.open(AddUserModalComponent, {
      modalClass: 'modal-lg',
      data: {user: user},
      ignoreBackdropClick: true
    });
    this.modalRefAddEdit.onClose.subscribe((message: any) => {
      if (message === 'submit') {
        this.showSuccessMessage = true;
        this.successMessage = 'Data berhasil disimpan.'
        this.getAllUser();
      } else {
        this.showSuccessMessage = false;
      }
    });
  }

}
