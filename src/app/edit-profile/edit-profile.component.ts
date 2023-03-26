import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { userPosyandu, userPosyanduType } from '../models';
import { EditProfileModalComponent } from './edit-profile-modal/edit-profile-modal.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {
  
  modalRefAddEdit: MdbModalRef<EditProfileModalComponent> | null = null;
  userType = sessionStorage.getItem('tipe');
  user: userPosyandu = {
    idUser: sessionStorage.getItem('id')!,
    namaUser: sessionStorage.getItem('nama')!,
    nikUser: sessionStorage.getItem('nik')!,
    tanggalLahirUser: sessionStorage.getItem('lahir')!,
    alamatUser: sessionStorage.getItem('alamat')!,
    noTeleponUser: sessionStorage.getItem('telp')!,
    tipeUser: this.userType === userPosyanduType.ADMIN ? 0 :
              this.userType === userPosyanduType.PETUGAS ? 1 : 2
  }

  constructor(private modalService: MdbModalService) {

  }

  openDialogEditProfile(user: userPosyandu) {
    this.modalRefAddEdit = this.modalService.open(EditProfileModalComponent, {
      modalClass: 'modal-lg',
      data: {user: user},
      ignoreBackdropClick: true
    });
    this.modalRefAddEdit.onClose.subscribe((message: any) => {
      if (message === 'submit') {
        location.reload();
      }
    });
  }

}
