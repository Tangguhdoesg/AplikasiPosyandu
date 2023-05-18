import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Subject, takeUntil } from 'rxjs';
import { AppServiceService } from '../app-service.service';
import { kegiatan, userPosyanduType } from '../models';
import { DeleteModalComponent } from '../shared/delete-modal/delete-modal.component';
import { AddActivityModalComponent } from './add-activity-modal/add-activity-modal.component';
import { SortService } from '../shared/sort.service';

@Component({
  selector: 'app-manage-activity',
  templateUrl: './manage-activity.component.html',
  styleUrls: ['./manage-activity.component.scss']
})
export class ManageActivityComponent {
  destroySubject$: Subject<void> = new Subject();
  allActivity: kegiatan[] = [];
  totalActivityData: number = 0;
  isLoading: boolean = false;
  isError: boolean = false;
  showSuccessMessage: boolean = false;
  successMessage: string = '';

  userRole = sessionStorage.getItem('tipe');

  modalRefDelete: MdbModalRef<DeleteModalComponent> | null = null;
  modalRefAddEdit: MdbModalRef<AddActivityModalComponent> | null = null;

  searchValue: string = '';

  sortNamaKegiatan: number = 0;
  sortPenanggungJawab: number = 0;
  sortLokasi: number = 0;
  sortTanggalKegiatan: number = 0;

  constructor(private service: AppServiceService,
    private modalService: MdbModalService,
    private sortService: SortService) {
  }

  ngOnInit(): void {
    this.getAllActivity();
  }

  changeSortNamaKegiatan() {
    this.sortPenanggungJawab = 0;
    this.sortLokasi = 0;
    this.sortTanggalKegiatan = 0;
    if (this.sortNamaKegiatan === 0) this.sortNamaKegiatan = 1;
    else if (this.sortNamaKegiatan === 1) this.sortNamaKegiatan = -1;
    else this.sortNamaKegiatan = 1;
    this.sortService.sort(this.allActivity, 'namaKegiatan', this.sortNamaKegiatan);
  }

  changeSortPenanggungJawab() {
    this.sortNamaKegiatan = 0;
    this.sortLokasi = 0;
    this.sortTanggalKegiatan = 0;
    if (this.sortPenanggungJawab === 0) this.sortPenanggungJawab = 1;
    else if (this.sortPenanggungJawab === 1) this.sortPenanggungJawab = -1;
    else this.sortPenanggungJawab = 1;
    this.sortService.sort(this.allActivity, 'namaPetugas', this.sortPenanggungJawab);
  }

  changeSortLokasi() {
    this.sortNamaKegiatan = 0;
    this.sortPenanggungJawab = 0;
    this.sortTanggalKegiatan = 0;
    if (this.sortLokasi === 0) this.sortLokasi = 1;
    else if (this.sortLokasi === 1) this.sortLokasi = -1;
    else this.sortLokasi = 1;
    this.sortService.sort(this.allActivity, 'lokasiKegiatan', this.sortLokasi);
  }

  changeSortTanggalKegiatan() {
    this.sortNamaKegiatan = 0;
    this.sortPenanggungJawab = 0;
    this.sortLokasi = 0;
    if (this.sortTanggalKegiatan === 0) this.sortTanggalKegiatan = 1;
    else if (this.sortTanggalKegiatan === 1) this.sortTanggalKegiatan = -1;
    else this.sortTanggalKegiatan = 1;
    this.sortService.sort(this.allActivity, 'tanggalKegiatan', this.sortTanggalKegiatan);
  }

  resetSort() {
    this.sortNamaKegiatan = 0;
    this.sortPenanggungJawab = 0;
    this.sortLokasi = 0;
    this.sortTanggalKegiatan = 0;
  }

  getAllActivity() {
    this.isLoading = true;
    this.isError = false;
    this.service.getAllActivity()
      .pipe(takeUntil(this.destroySubject$))
      .subscribe(data => {
        this.resetSort();
        this.allActivity = [...data];
        this.totalActivityData = data.length;
        this.isLoading = false;
      }, err => {
        this.isError = true;
        this.isLoading = false;
      })
  }

  deleteActivity(id: number) {
    this.service.deleteActivity(id)
      .pipe(takeUntil(this.destroySubject$))
      .subscribe(data => {
        this.resetSort();
        this.isLoading = false;
        this.getAllActivity();
      }, err => {
        this.isError = true;
        this.isLoading = false;
      })
  }

  openDialogDeleteActivity(id: number) {
    this.modalRefDelete = this.modalService.open(DeleteModalComponent, {
      modalClass: 'modal-dialog-centered'
    });
    this.modalRefDelete.onClose.subscribe((message: any) => {
      if (message === 'delete') {
        this.showSuccessMessage = true;
        this.successMessage = 'Data berhasil dihapus.'
        this.deleteActivity(id);
      } else {
        this.showSuccessMessage = false;
      }
    });
  }

  openDialogAddEditActivity(activity?: kegiatan) {
    this.modalRefAddEdit = this.modalService.open(AddActivityModalComponent, {
      modalClass: 'modal-lg',
      data: { activity: activity },
      ignoreBackdropClick: true
    });
    this.modalRefAddEdit.onClose.subscribe((message: any) => {
      if (message === 'submit') {
        this.showSuccessMessage = true;
        this.successMessage = 'Data berhasil disimpan.'
        this.getAllActivity();
      } else {
        this.showSuccessMessage = false;
      }
    });
  }

  checkAddEditAccess(): boolean {
    return this.userRole === userPosyanduType.PETUGAS;
  }
}
