import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import * as dayjs from 'dayjs';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { userPosyandu, userPosyanduRequestBody, userPosyanduType } from 'src/app/models';
import { DatePipe } from '@angular/common';
import { AppServiceService } from 'src/app/app-service.service';
import { Subject } from "rxjs"
import { takeUntil } from "rxjs/operators"

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.scss']
})
export class AddUserModalComponent implements OnInit{
  destroySubject$: Subject<void> = new Subject();
  user: userPosyandu | null = null;
  validationForm: FormGroup;

  modalTitle: any;
  selectedDate: any;

  isLoading: boolean = false;
  isError: boolean = false;
  showErrorMessage: boolean = false;
  errMessage: string = '';

  constructor(public modalRef: MdbModalRef<AddUserModalComponent>,
              private service: AppServiceService,
              private datePipe: DatePipe) {
    this.validationForm = new FormGroup({
      userName: new FormControl(null, Validators.required),
      nik: new FormControl(null, Validators.required),
      dob: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      phoneNum: new FormControl(null, Validators.required),
      userType: new FormControl(2, Validators.required)
    });
  }

  ngOnInit(): void {
    this.modalTitle = this.user === undefined ? 'Tambah Pengguna' : 'Ubah Pengguna';
    if (this.user !== undefined) {
      this.validationForm.get('userName')?.setValue(this.user?.namaUser);
      this.validationForm.get('nik')?.setValue(this.user?.nikUser);
      this.selectedDate = this.datePipe.transform(dayjs(this.user?.tanggalLahirUser).format('MM-DD-YYYY'), "yyyy-MM-dd")
      this.validationForm.get('address')?.setValue(this.user?.alamatUser);
      this.validationForm.get('phoneNum')?.setValue(this.user?.noTeleponUser);
      // this.validationForm.get('userType')?.setValue(this.setUserType(this.user?.tipeUser));
      this.validationForm.get('userType')?.setValue(this.user?.tipeUser);
    }
  }

  // setUserType(type: number | undefined) {
  //   if (type === 0) {
  //     return userPosyanduType.ADMIN;
  //   } else if (type === 1) {
  //     return userPosyanduType.PETUGAS;
  //   } else {
  //     return userPosyanduType.ORANGTUA;
  //   }
  // }

  onSubmit() {
    this.showErrorMessage = false;
    let u: userPosyanduRequestBody = {
      namaUser: this.validationForm.get('userName')?.value,
      nikUser: this.validationForm.get('nik')?.value,
      tanggalLahirUser: this.validationForm.get('dob')?.value,
      noTeleponUser: this.validationForm.get('phoneNum')?.value,
      alamatUser: this.validationForm.get('address')?.value,
      tipeUser: this.validationForm.get('userType')?.value
      // tipeUser: this.validationForm.get('userType')?.value === userPosyanduType.ADMIN ? 0 :
      //           this.validationForm.get('userType')?.value === userPosyanduType.PETUGAS ? 1 : 2
    };
    if (this.user === undefined) {
      this.addUser(u);
    } else {
      this.editUser(u, this.user?.idUser!);
    }
  }

  addUser(req: userPosyanduRequestBody) {
    this.isLoading = true;
    this.isError = false;
    this.service.addUser(req)
      .pipe(takeUntil(this.destroySubject$))
      .subscribe(data => {
        this.isLoading = false;
        this.modalRef.close('submit'); 
      }, err => {
        this.isLoading = false;
        if (err.status === 409) {
          this.showErrorMessage = true;
          this.errMessage = 'NIK user sudah terdaftar dalam sistem.'
        } else {
          this.isError = true;
        }
      })
  }

  editUser(req: userPosyanduRequestBody, id: any) {
    this.isLoading = true;
    this.isError = false;
    this.service.editUser(req, id)
      .pipe(takeUntil(this.destroySubject$))
      .subscribe(data => {
        console.log(data);
        this.isLoading = false;
        this.modalRef.close('submit'); 
      }, err => {
        this.isError = true;
        this.isLoading = false;
      })
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
