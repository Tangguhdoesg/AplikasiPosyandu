import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Subject, takeUntil } from 'rxjs';
import { AppServiceService } from 'src/app/app-service.service';
import { sendExcelRequestBody } from 'src/app/models';

@Component({
  selector: 'app-send-modal',
  templateUrl: './send-modal.component.html',
  styleUrls: ['./send-modal.component.scss']
})
export class SendModalComponent {
  destroySubject$: Subject<void> = new Subject();
  validationForm: FormGroup;

  modalTitle: any;
  startDates: any;
  endDates: any;

  isLoading: boolean = false;
  isError: boolean = false;

  constructor(public modalRef: MdbModalRef<SendModalComponent>,
    private service: AppServiceService) {
    this.validationForm = new FormGroup({
      startDate: new FormControl(null, Validators.required),
      endDate: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required)
    });
  }

  
  ngOnInit(): void {
    this.modalTitle = 'Kirim Laporan';
  }

  onSubmit() {
    let s: sendExcelRequestBody = {
      tanggalAwal: this.startDates,
      tanggalAkhir: this.endDates,
      email: this.validationForm.get('email')?.value
    };
    this.sendReport(s);
  }

  sendReport(request: sendExcelRequestBody) {
    this.isLoading = true;
    this.isError = false;
    this.service.sendReport(request)
      .pipe(takeUntil(this.destroySubject$))
      .subscribe(datas => {
        console.log(datas);
        
        this.isLoading = false;
      }, err => {
        this.isError = true;
        this.isLoading = false;
      })
  }

  get start(): AbstractControl {
    return this.validationForm.get('startDate')!;
  }

  get end(): AbstractControl {
    return this.validationForm.get('endDate')!;
  }

  get email(): AbstractControl {
    return this.validationForm.get('email')!;
  }
}
