import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Subject, takeUntil } from 'rxjs';
import { AppServiceService } from '../app-service.service';
import { imunisasi, userPosyanduType } from '../models';
import { DeleteModalComponent } from '../shared/delete-modal/delete-modal.component';
import { AddImunisasiModalComponent } from './add-imunisasi-modal/add-imunisasi-modal.component';
import { SortService } from '../shared/sort.service';

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
  showSuccessMessage: boolean = false;
  successMessage: string = '';

  userRole = sessionStorage.getItem('tipe');

  modalRefDelete: MdbModalRef<DeleteModalComponent> | null = null;
  modalRefAddEdit: MdbModalRef<AddImunisasiModalComponent> | null = null;

  searchValue: string = '';

  sortNamaBalita: number = 0;
  sortNikBalita: number = 0;
  sortNamaOrangTua: number = 0;
  sortNamaImunisasi: number = 0;
  sortTanggalImunisasi: number = 0;
  sortTanggalBerikutnya: number = 0;

  constructor(private service: AppServiceService,
              private modalService: MdbModalService,
              private sortService: SortService) {
  }

  ngOnInit(): void {
    this.userRole === userPosyanduType.PETUGAS ? this.getAllImunisasi() : this.getAllUserImunisasi();
  }

  
  changeSortNamaBalita() {
    this.sortNikBalita = 0;
    this.sortNamaOrangTua = 0;
    this.sortNamaImunisasi = 0;
    this.sortTanggalImunisasi = 0;
    this.sortTanggalBerikutnya = 0;
    if (this.sortNamaBalita === 0) this.sortNamaBalita = 1;
    else if (this.sortNamaBalita === 1) this.sortNamaBalita = -1;
    else this.sortNamaBalita = 1;
    this.sortService.sort(this.allImunisasi, 'namaBalita', this.sortNamaBalita);
  }

  changeSortNikBalita() {
    this.sortNamaBalita = 0;
    this.sortNamaOrangTua = 0;
    this.sortNamaImunisasi = 0;
    this.sortTanggalImunisasi = 0;
    this.sortTanggalBerikutnya = 0;
    if (this.sortNikBalita === 0) this.sortNikBalita = 1;
    else if (this.sortNikBalita === 1) this.sortNikBalita = -1;
    else this.sortNikBalita = 1;
    this.sortService.sort(this.allImunisasi, 'nikBalita', this.sortNikBalita);
  }

  changeSortNamaOrangTua() {
    this.sortNamaBalita = 0;
    this.sortNikBalita = 0;
    this.sortNamaImunisasi = 0;
    this.sortTanggalImunisasi = 0;
    this.sortTanggalBerikutnya = 0;
    if (this.sortNamaOrangTua === 0) this.sortNamaOrangTua = 1;
    else if (this.sortNamaOrangTua === 1) this.sortNamaOrangTua = -1;
    else this.sortNamaOrangTua = 1;
    this.sortService.sort(this.allImunisasi, 'namaOrangTua', this.sortNamaOrangTua);
  }

  changeSortNamaImunisasi() {
    this.sortNamaBalita = 0;
    this.sortNikBalita = 0;
    this.sortNamaOrangTua = 0;
    this.sortTanggalImunisasi = 0;
    this.sortTanggalBerikutnya = 0;
    if (this.sortNamaImunisasi === 0) this.sortNamaImunisasi = 1;
    else if (this.sortNamaImunisasi === 1) this.sortNamaImunisasi = -1;
    else this.sortNamaImunisasi = 1;
    this.sortService.sort(this.allImunisasi, 'namaImunisasi', this.sortNamaImunisasi);
  }

  changeSortTanggalImunisasi() {
    this.sortNamaBalita = 0;
    this.sortNikBalita = 0;
    this.sortNamaOrangTua = 0;
    this.sortNamaImunisasi = 0;
    this.sortTanggalBerikutnya = 0;
    if (this.sortTanggalImunisasi === 0) this.sortTanggalImunisasi = 1;
    else if (this.sortTanggalImunisasi === 1) this.sortTanggalImunisasi = -1;
    else this.sortTanggalImunisasi = 1;
    this.sortService.sort(this.allImunisasi, 'tanggalImunisasi', this.sortTanggalImunisasi);
  }

  changeSortTanggalBerikutnya() {
    this.sortNamaBalita = 0;
    this.sortNikBalita = 0;
    this.sortNamaOrangTua = 0;
    this.sortNamaImunisasi = 0;
    this.sortTanggalImunisasi = 0;
    if (this.sortTanggalBerikutnya === 0) this.sortTanggalBerikutnya = 1;
    else if (this.sortTanggalBerikutnya === 1) this.sortTanggalBerikutnya = -1;
    else this.sortTanggalBerikutnya = 1;
    this.sortService.sort(this.allImunisasi, 'tanggalImunisasiBerikutnya', this.sortTanggalBerikutnya);
  }

  resetSort() {
    this.sortNamaBalita = 0;
    this.sortNikBalita = 0;
    this.sortNamaOrangTua = 0;
    this.sortNamaImunisasi = 0;
    this.sortTanggalImunisasi = 0;
    this.sortTanggalBerikutnya = 0;
  }

  getAllImunisasi() {
    this.isLoading = true;
    this.isError = false;
    this.service.getAllImunisasi()
      .pipe(takeUntil(this.destroySubject$))
      .subscribe(data => {
        this.resetSort();
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
        this.resetSort();
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
        this.resetSort();
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
        this.showSuccessMessage = true;
        this.successMessage = 'Data berhasil dihapus.'
        this.deleteImunisasi(id);
      } else {
        this.showSuccessMessage = false;
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
        this.showSuccessMessage = true;
        this.successMessage = 'Data berhasil disimpan.'
        this.getAllImunisasi();
      } else {
        this.showSuccessMessage = false;
      }
    });
  }

  checkAddEditAccess(): boolean {
    return this.userRole === userPosyanduType.PETUGAS;
  }
}
