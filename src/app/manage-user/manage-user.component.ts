import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../app-service.service';
import { takeUntil } from "rxjs/operators"
import { Subject } from "rxjs"
import { userPosyandu } from '../models';
import * as dayjs from 'dayjs';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { DeleteUserModalComponent } from './delete-user-modal/delete-user-modal.component';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {
  destroySubject$: Subject<void> = new Subject();
  allUsers: userPosyandu[] = [
      {"tanggalLahirUser":"2023-02-10T14:22:12.728+00:00",
      "idUser":1,
      "alamatUser":"Rumah Rafli",
      "namaUser":"rafli",
      "userType":0,
      "noTeleponUser":"987654321",
      "nikUser":"1627892910293332",
      "passwordUser": ""
    }
  ];
  totalUsersData: number = 0;
  isLoading: boolean = false;
  isError: boolean = false;

  modalRef: MdbModalRef<DeleteUserModalComponent> | null = null;

  constructor(private service: AppServiceService,
              private modalService: MdbModalService) {

  }

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser() {
    this.isLoading = true;
    this.isError = false;
    this.service.getAllUser()
      .pipe(takeUntil(this.destroySubject$))
      .subscribe(data => {
        this.allUsers = [...data];
        this.totalUsersData = data.length;
        this.allUsers.forEach(i => {
          i.tanggalLahirUser = dayjs(i.tanggalLahirUser).format('DD-MM-YYYY').toString();
        })
        this.isLoading = false;
      }, err => {
        this.isError = true;
        this.isLoading = false;
      })
  }

  openDialogDeleteUser() {
    this.modalRef = this.modalService.open(DeleteUserModalComponent, {
      modalClass: 'modal-dialog-centered'
    });
    this.modalRef.onClose.subscribe((message: any) => {
      if (message === 'delete') {
        // add delete function
        this.getAllUser();
      }
    });
  }

}
