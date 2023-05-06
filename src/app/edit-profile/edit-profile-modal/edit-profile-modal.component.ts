import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { userPosyandu, userPosyanduRequestBody, userPosyanduType } from 'src/app/models';
import { DatePipe } from '@angular/common';
import * as dayjs from 'dayjs';
import { AppServiceService } from 'src/app/app-service.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-edit-profile-modal',
  templateUrl: './edit-profile-modal.component.html',
  styleUrls: ['./edit-profile-modal.component.scss']
})
export class EditProfileModalComponent {
  destroySubject$: Subject<void> = new Subject();
  isLoading: boolean = false;
  isError: boolean = false;  
  showErrorMessage: boolean = false;
  errMessage: string = '';

  user: userPosyandu | null = null;
  selectedDate: any;

  validationForm: FormGroup;

  constructor(public modalRef: MdbModalRef<EditProfileModalComponent>,
              private datePipe: DatePipe,
              private service: AppServiceService) {
    this.validationForm = new FormGroup({
      userName: new FormControl(null, Validators.required),
      nik: new FormControl(null, Validators.required),
      dob: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      phoneNum: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
    if (this.user !== undefined) {
      this.validationForm.get('userName')?.setValue(this.user?.namaUser);
      this.validationForm.get('nik')?.setValue(this.user?.nikUser);
      this.selectedDate = this.datePipe.transform(dayjs(this.user?.tanggalLahirUser).format('MM-DD-YYYY'), "yyyy-MM-dd")
      this.validationForm.get('address')?.setValue(this.user?.alamatUser);
      this.validationForm.get('phoneNum')?.setValue(this.user?.noTeleponUser);
    }
  }

  onSubmit() {
    this.showErrorMessage = false;
    let request: userPosyanduRequestBody = {
      namaUser: this.validationForm.get('userName')?.value,
      nikUser: this.validationForm.get('nik')?.value,
      tanggalLahirUser: this.validationForm.get('dob')?.value,
      noTeleponUser: this.validationForm.get('phoneNum')?.value,
      alamatUser: this.validationForm.get('address')?.value,
      tipeUser: this.user?.tipeUser!
    }
    this.editProfile(request);
  }

  editProfile(req: userPosyanduRequestBody) {
    this.isLoading = true;
    this.isError = false;
    this.service.editUser(req, this.user?.idUser)
      .pipe(takeUntil(this.destroySubject$))
      .subscribe(data => {
        console.log(data);
        sessionStorage.setItem('nama', data.namaUser!);
        sessionStorage.setItem('nik', data.nikUser!);
        sessionStorage.setItem('telp', data.noTeleponUser!);
        let tipeUser = data.tipeUser === 0 ? userPosyanduType.ADMIN :
                        data.tipeUser === 1 ? userPosyanduType.PETUGAS : userPosyanduType.ORANGTUA;
        sessionStorage.setItem('tipe', tipeUser);
        sessionStorage.setItem('alamat', data.alamatUser!);
        sessionStorage.setItem('lahir', data.tanggalLahirUser!);
        this.isLoading = false;
        this.modalRef.close('submit'); 
      }, err => {
        this.isLoading = false;
        if (err.status === 409) {
          this.showErrorMessage = true;
          this.errMessage = 'NIK Pengguna atau Nomor Telepon sudah terdaftar dalam sistem.'
        } else {
          this.isError = true;
        }
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

}
