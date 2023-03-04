import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { userPosyandu } from 'src/app/models';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.scss']
})
export class AddUserModalComponent implements OnInit{
  user: userPosyandu | null = null;
  validationForm: FormGroup;

  constructor(public modalRef: MdbModalRef<AddUserModalComponent>,
                                private modalService: MdbModalService) {
    this.validationForm = new FormGroup({
      userName: new FormControl(null, Validators.required),
      nik: new FormControl(null, Validators.required),
      dob: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      phoneNum: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
    
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
