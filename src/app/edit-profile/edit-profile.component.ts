import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {
  validationForm: FormGroup;

  constructor() {
    this.validationForm = new FormGroup({
      userName: new FormControl(null, Validators.required),
      nik: new FormControl(null, Validators.required),
      dob: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      phoneNum: new FormControl(null, Validators.required)
    });
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
