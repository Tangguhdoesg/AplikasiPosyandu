import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import * as dayjs from 'dayjs';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { userPosyandu, userPosyanduRequestBody, userPosyanduType } from 'src/app/models';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.scss']
})
export class AddUserModalComponent implements OnInit{
  user: userPosyandu | null = null;
  oldUser: userPosyandu | null = null;
  validationForm: FormGroup;

  modalTitle: any;
  selectedDate: any;

  constructor(public modalRef: MdbModalRef<AddUserModalComponent>,
              private modalService: MdbModalService,
              private datePipe: DatePipe) {
    this.validationForm = new FormGroup({
      userName: new FormControl(null, Validators.required),
      nik: new FormControl(null, Validators.required),
      dob: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      phoneNum: new FormControl(null, Validators.required),
      userType: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
    console.log(this.user);
    this.modalTitle = this.user === undefined ? 'Tambah Pengguna' : 'Ubah Pengguna';
    this.oldUser = this.user;
    if (this.user !== undefined) {
      this.validationForm.get('userName')?.setValue(this.user?.namaUser);
      this.validationForm.get('nik')?.setValue(this.user?.nikUser);
      // this.validationForm.get('dob')?.setValue(dayjs(this.user?.tanggalLahirUser));
      console.log(dayjs(this.user?.tanggalLahirUser.toString()).format('DD-MM-YYYY'));
      this.selectedDate = this.datePipe.transform(dayjs(this.user?.tanggalLahirUser).format('MM-DD-YYYY'), "yyyy-MM-dd")
      this.validationForm.get('address')?.setValue(this.user?.alamatUser);
      this.validationForm.get('phoneNum')?.setValue(this.user?.noTeleponUser);
      this.validationForm.get('userType')?.setValue(this.setUserType(this.user?.tipeUser));
    }
  }

  setUserType(type: number | undefined) {
    if (type === 0) {
      return userPosyanduType.ADMIN;
    } else if (type === 1) {
      return userPosyanduType.PETUGAS;
    } else {
      return userPosyanduType.ORANGTUA;
    }
  }

  onSubmit() {
    console.log(this.oldUser);
    let u: userPosyanduRequestBody = {
      namaUser: this.validationForm.get('userName')?.value,
      nikUser: this.validationForm.get('nik')?.value,
      tanggalLahirUser: dayjs(this.validationForm.get('dob')?.value).format('YYYY-MM-DD'),
      noTeleponUser: this.validationForm.get('phoneNum')?.value,
      alamatUser: this.validationForm.get('address')?.value,
      tipeUser: this.validationForm.get('userType')?.value
    };
    console.log(u);
    
  }

  get userName(): AbstractControl {
    return this.validationForm.get('userName')!;
  }

  get nik(): AbstractControl {
    return this.validationForm.get('nik')!;
  }

  get dob(): AbstractControl {
    return this.validationForm.get('dob')!;
  }

  get address(): AbstractControl {
    return this.validationForm.get('address')!;
  }

  get phoneNum(): AbstractControl {
    return this.validationForm.get('phoneNum')!;
  }

  get userType(): AbstractControl {
    return this.validationForm.get('userType')!;
  }
}
