import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import * as dayjs from 'dayjs';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Subject, takeUntil } from 'rxjs';
import { AppServiceService } from 'src/app/app-service.service';
import { checkup, checkupAddEditRequestBody } from 'src/app/models';

@Component({
  selector: 'app-add-checkup-modal',
  templateUrl: './add-checkup-modal.component.html',
  styleUrls: ['./add-checkup-modal.component.scss']
})
export class AddCheckupModalComponent {
  destroySubject$: Subject<void> = new Subject();
  checkup: checkup | null = null;
  validationForm: FormGroup;

  modalTitle: any;
  selectedCheckupDate: any;
  selectedNextCheckupDate: any;

  isLoading: boolean = false;
  isError: boolean = false;
  showErrorMessage: boolean = false;
  errMessage: string = '';

  constructor(public modalRef: MdbModalRef<AddCheckupModalComponent>,
              private service: AppServiceService,
              private datePipe: DatePipe) {
    this.validationForm = new FormGroup({
      nik: new FormControl(null, Validators.required),
      height: new FormControl(null, Validators.required),
      weight: new FormControl(null, Validators.required),
      headCircum: new FormControl(null, Validators.required),
      armCircum: new FormControl(null, Validators.required),
      notes: new FormControl(null),
      checkupDate: new FormControl(null, Validators.required),
      nextCheckupDate: new FormControl(null)
    });
  }

  ngOnInit(): void {
    this.modalTitle = this.checkup === undefined ? 'Tambah Pemeriksaan' : 'Ubah Pemeriksaan';
    if (this.checkup !== undefined) {
      this.validationForm.get('nik')?.setValue(this.checkup?.nikBalita);
      this.validationForm.get('height')?.setValue(this.checkup?.tinggiBadan);
      this.validationForm.get('weight')?.setValue(this.checkup?.beratBadan);
      this.validationForm.get('headCircum')?.setValue(this.checkup?.lingkarKepala);
      this.validationForm.get('armCircum')?.setValue(this.checkup?.lingkarLengan);
      this.validationForm.get('notes')?.setValue(this.checkup?.catatan);
      this.selectedCheckupDate = this.datePipe.transform(dayjs(this.checkup?.tanggalCheckup).format('MM-DD-YYYY'), "yyyy-MM-dd")
      if (this.checkup?.tanggalCheckupBerikutnya) {
        this.selectedNextCheckupDate = this.datePipe.transform(dayjs(this.checkup?.tanggalCheckupBerikutnya).format('MM-DD-YYYY'), "yyyy-MM-dd")
      }
    }
  }

  onSubmit() {
    console.log(this.checkup);
    this.showErrorMessage = false;
    let t: checkupAddEditRequestBody = {
      nikBalita: this.validationForm.get('nik')?.value,
      tinggiBadan: this.validationForm.get('height')?.value,
      beratBadan: this.validationForm.get('weight')?.value,
      lingkarKepala: this.validationForm.get('headCircum')?.value,
      lingkarLengan: this.validationForm.get('armCircum')?.value,
      catatan: this.validationForm.get('notes')?.value,
      tanggalCheckup: this.validationForm.get('checkupDate')?.value,
      tanggalCheckupBerikutnya: this.validationForm.get('nextCheckupDate')?.value
    };
    console.log(this.checkup);
    if (this.checkup === undefined) {
      this.addCheckup(t);
    } else {
      this.editCheckup(t, this.checkup?.idCheckup!);
    }
  }

  addCheckup(req: checkupAddEditRequestBody) {
    this.isLoading = true;
    this.isError = false;
    this.service.addCheckup(req)
      .pipe(takeUntil(this.destroySubject$))
      .subscribe(data => {
        console.log(data);
        this.isLoading = false;
        this.modalRef.close('submit');
        
      }, err => {
        this.isLoading = false;
        if (err.status === 404) {
          this.showErrorMessage = true;
          this.errMessage = 'NIK tidak terdaftar dalam sistem.'
        } else {
          this.isError = true;
        }
      })
  }

  editCheckup(req: checkupAddEditRequestBody, id: number) {
    this.isLoading = true;
    this.isError = false;
    this.service.editCheckup(req, id)
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

  get height(): AbstractControl {
    return this.validationForm.get('height')!;
  }

  get weight(): AbstractControl {
    return this.validationForm.get('weight')!;
  }

  get headCircum(): AbstractControl {
    return this.validationForm.get('headCircum')!;
  }

  get armCircum(): AbstractControl {
    return this.validationForm.get('armCircum')!;
  }

  get notes(): AbstractControl {
    return this.validationForm.get('notes')!;
  }

  get checkupDate(): AbstractControl {
    return this.validationForm.get('checkupDate')!;
  }

  get nextCheckupDate(): AbstractControl {
    return this.validationForm.get('nextCheckupDate')!;
  }

}
