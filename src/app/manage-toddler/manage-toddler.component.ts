import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Subject, takeUntil } from 'rxjs';
import { AppServiceService } from '../app-service.service';
import { balita, userPosyanduType } from '../models';
import { DeleteModalComponent } from '../shared/delete-modal/delete-modal.component';
import { AddToddlerModalComponent } from './add-toddler-modal/add-toddler-modal.component';
import { SortService } from '../shared/sort.service';

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
  showSuccessMessage: boolean = false;
  successMessage: string = '';

  userRole = sessionStorage.getItem('tipe');

  modalRefDelete: MdbModalRef<DeleteModalComponent> | null = null;
  modalRefAddEdit: MdbModalRef<AddToddlerModalComponent> | null = null;

  searchValue: string = '';

  sortNamaBalita: number = 0;
  sortNikBalita: number = 0;
  sortJenisKelamin: number = 0;
  sortTempatLahir: number = 0;
  sortTanggalLahir: number = 0;
  sortTinggiLahir: number = 0;
  sortBeratLahir: number = 0;
  sortNamaOrangTua: number = 0;

  constructor(private service: AppServiceService,
              private modalService: MdbModalService,
              private sortService: SortService) {
  }

  ngOnInit(): void {
    this.userRole === userPosyanduType.PETUGAS ? this.getAllToddler() : this.getAllUserToddler();
  }

  changeSortNamaBalita() {
    this.sortNikBalita = 0;
    this.sortJenisKelamin = 0;
    this.sortTempatLahir = 0;
    this.sortTanggalLahir = 0;
    this.sortTinggiLahir = 0;
    this.sortBeratLahir = 0;
    this.sortNamaOrangTua = 0;
    if (this.sortNamaBalita === 0) this.sortNamaBalita = 1;
    else if (this.sortNamaBalita === 1) this.sortNamaBalita = -1;
    else this.sortNamaBalita = 1;
    this.sortService.sort(this.allToddlers, 'namaBalita', this.sortNamaBalita);
  }

  changeSortNikBalita() {
    this.sortNamaBalita = 0;
    this.sortJenisKelamin = 0;
    this.sortTempatLahir = 0;
    this.sortTanggalLahir = 0;
    this.sortTinggiLahir = 0;
    this.sortBeratLahir = 0;
    this.sortNamaOrangTua = 0;
    if (this.sortNikBalita === 0) this.sortNikBalita = 1;
    else if (this.sortNikBalita === 1) this.sortNikBalita = -1;
    else this.sortNikBalita = 1;
    this.sortService.sort(this.allToddlers, 'nikBalita', this.sortNikBalita);
  }

  changeSortJenisKelamin() {
    this.sortNamaBalita = 0;
    this.sortNikBalita = 0;
    this.sortTempatLahir = 0;
    this.sortTanggalLahir = 0;
    this.sortTinggiLahir = 0;
    this.sortBeratLahir = 0;
    this.sortNamaOrangTua = 0;
    if (this.sortJenisKelamin === 0) this.sortJenisKelamin = 1;
    else if (this.sortJenisKelamin === 1) this.sortJenisKelamin = -1;
    else this.sortJenisKelamin = 1;
    this.sortService.sort(this.allToddlers, 'jenisKelaminBalita', this.sortJenisKelamin);
  }

  changeSortTempatLahir() {
    this.sortNamaBalita = 0;
    this.sortNikBalita = 0;
    this.sortJenisKelamin = 0;
    this.sortTanggalLahir = 0;
    this.sortTinggiLahir = 0;
    this.sortBeratLahir = 0;
    this.sortNamaOrangTua = 0;
    this.sortTempatLahir = 0;
    if (this.sortTempatLahir === 0) this.sortTempatLahir = 1;
    else if (this.sortTempatLahir === 1) this.sortTempatLahir = -1;
    else this.sortTempatLahir = 1;
    this.sortService.sort(this.allToddlers, 'tempatLahirBalita', this.sortTempatLahir);
  }

  changeSortTanggalLahir() {
    this.sortNamaBalita = 0;
    this.sortNikBalita = 0;
    this.sortJenisKelamin = 0;
    this.sortTempatLahir = 0;
    this.sortTinggiLahir = 0;
    this.sortBeratLahir = 0;
    this.sortNamaOrangTua = 0;
    if (this.sortTanggalLahir === 0) this.sortTanggalLahir = 1;
    else if (this.sortTanggalLahir === 1) this.sortTanggalLahir = -1;
    else this.sortTanggalLahir = 1;
    this.sortService.sort(this.allToddlers, 'tanggalLahirBalita', this.sortTanggalLahir);
  }

  changeSortTinggiLahir() {
    this.sortNamaBalita = 0;
    this.sortNikBalita = 0;
    this.sortJenisKelamin = 0;
    this.sortTempatLahir = 0;
    this.sortTanggalLahir = 0;
    this.sortBeratLahir = 0;
    this.sortNamaOrangTua = 0;
    if (this.sortTinggiLahir === 0) this.sortTinggiLahir = 1;
    else if (this.sortTinggiLahir === 1) this.sortTinggiLahir = -1;
    else this.sortTinggiLahir = 1;
    this.sortService.sort(this.allToddlers, 'tinggiSaatLahirBalita', this.sortTinggiLahir);
  }

  changeSortBeratLahir() {
    this.sortNamaBalita = 0;
    this.sortNikBalita = 0;
    this.sortJenisKelamin = 0;
    this.sortTempatLahir = 0;
    this.sortTanggalLahir = 0;
    this.sortTinggiLahir = 0;
    this.sortNamaOrangTua = 0;
    if (this.sortBeratLahir === 0) this.sortBeratLahir = 1;
    else if (this.sortBeratLahir === 1) this.sortBeratLahir = -1;
    else this.sortBeratLahir = 1;
    this.sortService.sort(this.allToddlers, 'beratSaatLahirBalita', this.sortBeratLahir);
  }

  changeSortNamaOrangTua() {
    this.sortNamaBalita = 0;
    this.sortNikBalita = 0;
    this.sortJenisKelamin = 0;
    this.sortTempatLahir = 0;
    this.sortTanggalLahir = 0;
    this.sortTinggiLahir = 0;
    this.sortBeratLahir = 0;
    if (this.sortNamaOrangTua === 0) this.sortNamaOrangTua = 1;
    else if (this.sortNamaOrangTua === 1) this.sortNamaOrangTua = -1;
    else this.sortNamaOrangTua = 1;
    this.sortService.sort(this.allToddlers, 'namaOrangTua', this.sortNamaOrangTua);
  }

  resetSort() {
    this.sortNamaBalita = 0;
    this.sortNikBalita = 0;
    this.sortJenisKelamin = 0;
    this.sortTempatLahir = 0;
    this.sortTanggalLahir = 0;
    this.sortTinggiLahir = 0;
    this.sortBeratLahir = 0;
    this.sortNamaOrangTua = 0;
  }

  getAllUserToddler() {
    this.isLoading = true;
    this.isError = false;
    this.service.getAllUserToddler(sessionStorage.getItem('id'))
      .pipe(takeUntil(this.destroySubject$))
      .subscribe(data => {
        this.resetSort();
        this.allToddlers = [...data];
        this.totalToddlersData = data.length;
        this.isLoading = false;
      }, err => {
        this.isError = true;
        this.isLoading = false;
      })
  }

  getAllToddler() {
    this.isLoading = true;
    this.isError = false;
    this.service.getAllToddler()
      .pipe(takeUntil(this.destroySubject$))
      .subscribe(data => {
        this.resetSort();
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
        this.resetSort();
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
        this.showSuccessMessage = true;
        this.successMessage = 'Data berhasil dihapus.'
        this.deleteToddler(id);
      } else {
        this.showSuccessMessage = false;
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
        this.showSuccessMessage = true;
        this.successMessage = 'Data berhasil disimpan.'
        this.getAllToddler();
      } else {
        this.showSuccessMessage = false;
      }
    });
  }

  checkAddEditAccess(): boolean {
    return this.userRole === userPosyanduType.PETUGAS;
  }
}
