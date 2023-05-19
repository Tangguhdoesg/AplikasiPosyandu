import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Subject, takeUntil } from 'rxjs';
import { AppServiceService } from '../app-service.service';
import { checkup, userPosyanduType } from '../models';
import { DeleteModalComponent } from '../shared/delete-modal/delete-modal.component';
import { AddCheckupModalComponent } from './add-checkup-modal/add-checkup-modal.component';
import { SortService } from '../shared/sort.service';

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

  searchValue: string = '';

  sortNamaBalita: number = 0;
  sortNikBalita: number = 0;
  sortNamaOrangTua: number = 0;
  sortUmurBalita: number = 0;
  sortTanggalPemeriksaan: number = 0;
  sortTanggalBerikutnya: number = 0;
  sortTinggiBadan: number = 0;
  sortBeratBadan: number = 0;
  sortLingkarKepala: number = 0;
  sortLingkarLengan: number = 0;

  constructor(private service: AppServiceService,
              private modalService: MdbModalService,
              private sortService: SortService) {
  }

  ngOnInit(): void {
    this.userRole === userPosyanduType.PETUGAS ? this.getAllCheckup() : this.getAllUserCheckup();
  }

  changeSortNamaBalita() {
    this.sortNikBalita = 0;
    this.sortNamaOrangTua = 0;
    this.sortUmurBalita = 0;
    this.sortTanggalPemeriksaan = 0;
    this.sortTanggalBerikutnya = 0;
    this.sortTinggiBadan = 0;
    this.sortBeratBadan = 0;
    this.sortLingkarKepala = 0;
    this.sortLingkarLengan = 0;
    if (this.sortNamaBalita === 0) this.sortNamaBalita = 1;
    else if (this.sortNamaBalita === 1) this.sortNamaBalita = -1;
    else this.sortNamaBalita = 1;
    this.sortService.sort(this.allCheckup, 'namaBalita', this.sortNamaBalita);
  }

  changeSortNikBalita() {
    this.sortNamaBalita = 0;
    this.sortNamaOrangTua = 0;
    this.sortUmurBalita = 0;
    this.sortTanggalPemeriksaan = 0;
    this.sortTanggalBerikutnya = 0;
    this.sortTinggiBadan = 0;
    this.sortBeratBadan = 0;
    this.sortLingkarKepala = 0;
    this.sortLingkarLengan = 0;
    if (this.sortNikBalita === 0) this.sortNikBalita = 1;
    else if (this.sortNikBalita === 1) this.sortNikBalita = -1;
    else this.sortNikBalita = 1;
    this.sortService.sort(this.allCheckup, 'nikBalita', this.sortNikBalita);
  }

  changeSortNamaOrangTua() {
    this.sortNamaBalita = 0;
    this.sortNikBalita = 0;
    this.sortUmurBalita = 0;
    this.sortTanggalPemeriksaan = 0;
    this.sortTanggalBerikutnya = 0;
    this.sortTinggiBadan = 0;
    this.sortBeratBadan = 0;
    this.sortLingkarKepala = 0;
    this.sortLingkarLengan = 0;
    if (this.sortNamaOrangTua === 0) this.sortNamaOrangTua = 1;
    else if (this.sortNamaOrangTua === 1) this.sortNamaOrangTua = -1;
    else this.sortNamaOrangTua = 1;
    this.sortService.sort(this.allCheckup, 'namaOrangTua', this.sortNamaOrangTua);
  }

  changeSortUmurBalita() {
    this.sortNamaBalita = 0;
    this.sortNikBalita = 0;
    this.sortNamaOrangTua = 0;
    this.sortTanggalPemeriksaan = 0;
    this.sortTanggalBerikutnya = 0;
    this.sortTinggiBadan = 0;
    this.sortBeratBadan = 0;
    this.sortLingkarKepala = 0;
    this.sortLingkarLengan = 0;
    if (this.sortUmurBalita === 0) this.sortUmurBalita = 1;
    else if (this.sortUmurBalita === 1) this.sortUmurBalita = -1;
    else this.sortUmurBalita = 1;
    this.sortService.sort(this.allCheckup, 'umurBalita', this.sortUmurBalita);
  }

  changeSortTanggalPemeriksaan() {
    this.sortNamaBalita = 0;
    this.sortNikBalita = 0;
    this.sortNamaOrangTua = 0;
    this.sortUmurBalita = 0;
    this.sortTanggalBerikutnya = 0;
    this.sortTinggiBadan = 0;
    this.sortBeratBadan = 0;
    this.sortLingkarKepala = 0;
    this.sortLingkarLengan = 0;
    if (this.sortTanggalPemeriksaan === 0) this.sortTanggalPemeriksaan = 1;
    else if (this.sortTanggalPemeriksaan === 1) this.sortTanggalPemeriksaan = -1;
    else this.sortTanggalPemeriksaan = 1;
    this.sortService.sort(this.allCheckup, 'tanggalCheckup', this.sortTanggalPemeriksaan);
  }

  changeSortTanggalBerikutnya() {
    this.sortNamaBalita = 0;
    this.sortNikBalita = 0;
    this.sortNamaOrangTua = 0;
    this.sortUmurBalita = 0;
    this.sortTanggalPemeriksaan = 0;
    this.sortTinggiBadan = 0;
    this.sortBeratBadan = 0;
    this.sortLingkarKepala = 0;
    this.sortLingkarLengan = 0;
    if (this.sortTanggalBerikutnya === 0) this.sortTanggalBerikutnya = 1;
    else if (this.sortTanggalBerikutnya === 1) this.sortTanggalBerikutnya = -1;
    else this.sortTanggalBerikutnya = 1;
    this.sortService.sort(this.allCheckup, 'tanggalCheckupBerikutnya', this.sortTanggalBerikutnya);
  }

  changeSortTinggiBadan() {
    this.sortNamaBalita = 0;
    this.sortNikBalita = 0;
    this.sortNamaOrangTua = 0;
    this.sortUmurBalita = 0;
    this.sortTanggalPemeriksaan = 0;
    this.sortTanggalBerikutnya = 0;
    this.sortBeratBadan = 0;
    this.sortLingkarKepala = 0;
    this.sortLingkarLengan = 0;
    if (this.sortTinggiBadan === 0) this.sortTinggiBadan = 1;
    else if (this.sortTinggiBadan === 1) this.sortTinggiBadan = -1;
    else this.sortTinggiBadan = 1;
    this.sortService.sort(this.allCheckup, 'tinggiBadan', this.sortTinggiBadan);
  }

  changeSortBeratBadan() {
    this.sortNamaBalita = 0;
    this.sortNikBalita = 0;
    this.sortNamaOrangTua = 0;
    this.sortUmurBalita = 0;
    this.sortTanggalPemeriksaan = 0;
    this.sortTanggalBerikutnya = 0;
    this.sortTinggiBadan = 0;
    this.sortLingkarKepala = 0;
    this.sortLingkarLengan = 0;
    if (this.sortBeratBadan === 0) this.sortBeratBadan = 1;
    else if (this.sortBeratBadan === 1) this.sortBeratBadan = -1;
    else this.sortBeratBadan = 1;
    this.sortService.sort(this.allCheckup, 'beratBadan', this.sortBeratBadan);
  }

  changeSortLingkarKepala() {
    this.sortNamaBalita = 0;
    this.sortNikBalita = 0;
    this.sortNamaOrangTua = 0;
    this.sortUmurBalita = 0;
    this.sortTanggalPemeriksaan = 0;
    this.sortTanggalBerikutnya = 0;
    this.sortTinggiBadan = 0;
    this.sortBeratBadan = 0;
    this.sortLingkarLengan = 0;
    if (this.sortLingkarKepala === 0) this.sortLingkarKepala = 1;
    else if (this.sortLingkarKepala === 1) this.sortLingkarKepala = -1;
    else this.sortLingkarKepala = 1;
    this.sortService.sort(this.allCheckup, 'lingkarKepala', this.sortLingkarKepala);
  }

  changeSortLingkarLengan() {
    this.sortNamaBalita = 0;
    this.sortNikBalita = 0;
    this.sortNamaOrangTua = 0;
    this.sortUmurBalita = 0;
    this.sortTanggalPemeriksaan = 0;
    this.sortTanggalBerikutnya = 0;
    this.sortTinggiBadan = 0;
    this.sortBeratBadan = 0;
    this.sortLingkarKepala = 0;
    if (this.sortLingkarLengan === 0) this.sortLingkarLengan = 1;
    else if (this.sortLingkarLengan === 1) this.sortLingkarLengan = -1;
    else this.sortLingkarLengan = 1;
    this.sortService.sort(this.allCheckup, 'lingkarLengan', this.sortLingkarLengan);
  }

  resetSort() {
    this.sortNamaBalita = 0;
    this.sortNikBalita = 0;
    this.sortNamaOrangTua = 0;
    this.sortUmurBalita = 0;
    this.sortTanggalPemeriksaan = 0;
    this.sortTanggalBerikutnya = 0;
    this.sortTinggiBadan = 0;
    this.sortBeratBadan = 0;
    this.sortLingkarKepala = 0;
    this.sortLingkarLengan = 0;
  }

  getAllUserCheckup() {
    this.isLoading = true;
    this.isError = false;
    this.service.getAllUserCheckup(sessionStorage.getItem('id'))
      .pipe(takeUntil(this.destroySubject$))
      .subscribe(data => {
        this.resetSort();
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
        this.resetSort();
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
        this.resetSort();
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
