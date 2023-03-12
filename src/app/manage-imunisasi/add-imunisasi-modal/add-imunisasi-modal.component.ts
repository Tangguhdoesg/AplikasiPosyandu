import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import * as dayjs from 'dayjs';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Subject, takeUntil } from 'rxjs';
import { AppServiceService } from 'src/app/app-service.service';
import { imunisasi, imunisasiAddEditRequestBody } from 'src/app/models';

@Component({
  selector: 'app-add-imunisasi-modal',
  templateUrl: './add-imunisasi-modal.component.html',
  styleUrls: ['./add-imunisasi-modal.component.scss']
})
export class AddImunisasiModalComponent {
  destroySubject$: Subject<void> = new Subject();
  imunisasi: imunisasi | null = null;
  validationForm: FormGroup;

  modalTitle: any;
  selectedImunisasiDate: any;
  selectedNextImunisasiDate: any;

  isLoading: boolean = false;
  isError: boolean = false;

  constructor(public modalRef: MdbModalRef<AddImunisasiModalComponent>,
              private service: AppServiceService,
              private datePipe: DatePipe) {
    this.validationForm = new FormGroup({
      nik: new FormControl(null, Validators.required),
      imunisasiName: new FormControl(null, Validators.required),
      notes: new FormControl(null),
      ImunisasiDate: new FormControl(null, Validators.required),
      nextImunisasiDate: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
    this.modalTitle = this.imunisasi === undefined ? 'Tambah Pemeriksaan' : 'Ubah Pemeriksaan';
    if (this.imunisasi !== undefined) {
      this.validationForm.get('nik')?.setValue(this.imunisasi?.nikBalita);
      this.validationForm.get('imunisasiName')?.setValue(this.imunisasi?.namaImunisasi);
      this.validationForm.get('notes')?.setValue(this.imunisasi?.catatan);
      this.selectedImunisasiDate = this.datePipe.transform(dayjs(this.imunisasi?.tanggalImunisasi).format('MM-DD-YYYY'), "yyyy-MM-dd")
      this.selectedNextImunisasiDate = this.datePipe.transform(dayjs(this.imunisasi?.tanggalImunisasiBerikutnya).format('MM-DD-YYYY'), "yyyy-MM-dd")
    }
  }

  onSubmit() {
    console.log(this.imunisasi);
    let i: imunisasiAddEditRequestBody = {
      nikBalita: this.validationForm.get('nik')?.value,
      namaImunisasi: this.validationForm.get('imunisasiName')?.value,
      catatan: this.validationForm.get('notes')?.value,
      tanggalImunisasi: this.validationForm.get('imunisasiDate')?.value,
      tanggalImunisasiBerikutnya: this.validationForm.get('nextImunisasiDate')?.value
    };
    console.log(this.imunisasi);
    if (this.imunisasi === undefined) {
      this.addImunisasi(i);
    } else {
      this.editImunisasi(i, this.imunisasi?.idImunisasi!);
    }
  }

  addImunisasi(req: imunisasiAddEditRequestBody) {
    this.isLoading = true;
    this.isError = false;
    this.service.addImunisasi(req)
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

  editImunisasi(req: imunisasiAddEditRequestBody, id: number) {
    this.isLoading = true;
    this.isError = false;
    this.service.editImunisasi(req, id)
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

  get nik(): AbstractControl {
    return this.validationForm.get('nik')!;
  }

  get imunisasiName(): AbstractControl {
    return this.validationForm.get('imunisasiName')!;
  }

  get notes(): AbstractControl {
    return this.validationForm.get('notes')!;
  }

  get imunisasiDate(): AbstractControl {
    return this.validationForm.get('imunisasiDate')!;
  }

  get nextImunisasiDate(): AbstractControl {
    return this.validationForm.get('nextImunisasiDate')!;
  }
}
