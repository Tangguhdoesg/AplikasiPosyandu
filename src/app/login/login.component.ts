import { OnInit, Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppServiceService } from '../app-service.service';
import { takeUntil } from "rxjs/operators"
import { Subject } from "rxjs"
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { loginRequestBody, userPosyandu, userPosyanduType } from '../models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  destroySubject$: Subject<void> = new Subject();
  @Output() userLogin = new EventEmitter<any>();
  validationForm: FormGroup;
  // userLogin: userPosyandu | undefined;

  isLoading: boolean = false;
  isError: boolean = false;

  constructor(private router: Router,
              private service: AppServiceService) {
    this.validationForm = new FormGroup({
      phoneNum: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('nama');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('nik');
    sessionStorage.removeItem('telp');
    sessionStorage.removeItem('tipe');
    sessionStorage.removeItem('alamat');
    sessionStorage.removeItem('lahir');
  }

  onSubmit() {
    let req: loginRequestBody = {
      notelepon: this.validationForm.get('phoneNum')?.value,
      password: this.validationForm.get('password')?.value,
    }
    this.login(req);
  }

  login(req: loginRequestBody) {
    this.isLoading = true;
    this.isError = false;
    this.service.login(req)
      .pipe(takeUntil(this.destroySubject$))
      .subscribe(data => {
        console.log(data);
        sessionStorage.setItem('token', data.accessToken!);
        sessionStorage.setItem('nama', data.namaUser!);
        sessionStorage.setItem('nik', data.nikUser!);
        sessionStorage.setItem('telp', data.noTeleponUser!);
        sessionStorage.setItem('id', data.idUser!.toString());
        let tipeUser = data.tipeUser === 0 ? userPosyanduType.ADMIN :
                        data.tipeUser === 1 ? userPosyanduType.PETUGAS : userPosyanduType.ORANGTUA;
        sessionStorage.setItem('tipe', tipeUser);
        sessionStorage.setItem('alamat', data.alamatUser!);
        sessionStorage.setItem('lahir', data.tanggalLahirUser!);
        this.isLoading = false;
        this.userLogin.emit(true);
        this.router.navigate(['/dashboard']);
      }, err => {
        this.isError = true;
        this.isLoading = false;
      })
  }

  get phoneNum(): AbstractControl {
    return this.validationForm.get('phoneNum')!;
  }

  get password(): AbstractControl {
    return this.validationForm.get('password')!;
  }

}
