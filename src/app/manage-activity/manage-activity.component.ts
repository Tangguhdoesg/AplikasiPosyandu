import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Subject, takeUntil } from 'rxjs';
import { AppServiceService } from '../app-service.service';
import { kegiatan } from '../models';
import { DeleteModalComponent } from '../shared/delete-modal/delete-modal.component';
import { AddActivityModalComponent } from './add-activity-modal/add-activity-modal.component';

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

  modalRefDelete: MdbModalRef<DeleteModalComponent> | null = null;
  modalRefAddEdit: MdbModalRef<AddActivityModalComponent> | null = null;

  constructor(private service: AppServiceService,
    private modalService: MdbModalService) {
  }

  ngOnInit(): void {
    this.getAllActivity();
  }

  getAllActivity() {
    this.isLoading = true;
    this.isError = false;
    this.service.getAllActivity()
      .pipe(takeUntil(this.destroySubject$))
      .subscribe(data => {
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
        this.deleteActivity(id);
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
        this.getAllActivity();
      }
    });
  }
}
