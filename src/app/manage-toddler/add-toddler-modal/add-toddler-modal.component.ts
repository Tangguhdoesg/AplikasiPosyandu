import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import * as dayjs from 'dayjs';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Subject, takeUntil } from 'rxjs';
import { AppServiceService } from 'src/app/app-service.service';
import { balita, balitaAddEditRequestBody } from 'src/app/models';

@Component({
  selector: 'app-add-toddler-modal',
  templateUrl: './add-toddler-modal.component.html',
  styleUrls: ['./add-toddler-modal.component.scss']
})
export class AddToddlerModalComponent {
  destroySubject$: Subject<void> = new Subject();
  toddler: balita | null = null;
  validationForm: FormGroup;

  modalTitle: any;
  selectedDate: any;

  isLoading: boolean = false;
  isError: boolean = false;

  constructor(public modalRef: MdbModalRef<AddToddlerModalComponent>,
              private service: AppServiceService,
              private datePipe: DatePipe) {
    this.validationForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      nik: new FormControl(null, Validators.required),
      parentNik: new FormControl(null, Validators.required),
      gender: new FormControl(null, Validators.required),
      pob: new FormControl(null, Validators.required),
      dob: new FormControl(null, Validators.required),
      hob: new FormControl(null, Validators.required),
      wob: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
    this.modalTitle = this.toddler === undefined ? 'Tambah Balita' : 'Ubah Balita';
    if (this.toddler !== undefined) {
      this.validationForm.get('name')?.setValue(this.toddler?.namaBalita);
      this.validationForm.get('nik')?.setValue(this.toddler?.nikBalita);
      this.validationForm.get('parentNik')?.setValue(this.toddler?.nikOrangTua);
      this.validationForm.get('gender')?.setValue(this.toddler?.jenisKelaminBalita);
      this.validationForm.get('pob')?.setValue(this.toddler?.tempatLahirBalita);
      this.selectedDate = this.datePipe.transform(dayjs(this.toddler?.tanggalLahirBalita).format('MM-DD-YYYY'), "yyyy-MM-dd")
      this.validationForm.get('hob')?.setValue(this.toddler?.tinggiSaatLahirBalita);
      this.validationForm.get('wob')?.setValue(this.toddler?.beratSaatLahirBalita);
    }
  }

  onSubmit() {
    console.log(this.toddler);
    let t: balitaAddEditRequestBody = {
      namaBalita: this.validationForm.get('name')?.value,
      nikBalita: this.validationForm.get('nik')?.value,
      nikOrangTua: this.validationForm.get('parentNik')?.value,
      jenisKelaminBalita: this.validationForm.get('gender')?.value,
      beratSaatLahirBalita: this.validationForm.get('wob')?.value,
      tinggiSaatLahirBalita: this.validationForm.get('hob')?.value,
      tempatLahirBalita: this.validationForm.get('pob')?.value,
      tanggalLahirBalita: this.validationForm.get('dob')?.value
    };
    console.log(this.toddler);
    if (this.toddler === undefined) {
      this.addToddler(t);
    } else {
      this.editToddler(t, this.toddler?.idBalita!);
    }
  }

  addToddler(req: balitaAddEditRequestBody) {
    this.isLoading = true;
    this.isError = false;
    this.service.addToddler(req)
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

  editToddler(req: balitaAddEditRequestBody, id: number) {
    this.isLoading = true;
    this.isError = false;
    this.service.editToddler(req, id)
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

  get name(): AbstractControl {
    return this.validationForm.get('name')!;
  }

  get nik(): AbstractControl {
    return this.validationForm.get('nik')!;
  }

  get parentNik(): AbstractControl {
    return this.validationForm.get('parentNik')!;
  }

  get gender(): AbstractControl {
    return this.validationForm.get('gender')!;
  }

  get pob(): AbstractControl {
    return this.validationForm.get('pob')!;
  }

  get dob(): AbstractControl {
    return this.validationForm.get('dob')!;
  }

  get hob(): AbstractControl {
    return this.validationForm.get('hob')!;
  }

  get wob(): AbstractControl {
    return this.validationForm.get('wob')!;
  }


}
