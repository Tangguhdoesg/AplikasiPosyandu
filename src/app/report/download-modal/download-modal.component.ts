import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Subject, takeUntil } from 'rxjs';
import { AppServiceService } from 'src/app/app-service.service';
import { downloadExcelRequestBody, sendExcelRequestBody } from 'src/app/models';

@Component({
  selector: 'app-download-modal',
  templateUrl: './download-modal.component.html',
  styleUrls: ['./download-modal.component.scss']
})
export class DownloadModalComponent {
  destroySubject$: Subject<void> = new Subject();
  type: string = '';
  validationForm: FormGroup;

  modalTitle: any;
  startDates: any;
  endDates: any;

  isLoading: boolean = false;
  isError: boolean = false;

  constructor(public modalRef: MdbModalRef<DownloadModalComponent>,
    private service: AppServiceService,
    private datePipe: DatePipe) {
    this.validationForm = new FormGroup({
      startDate: new FormControl(null, Validators.required),
      endDate: new FormControl(null, Validators.required)
    });
  }

  
  ngOnInit(): void {
    this.modalTitle = this.type === 'checkup' ? 'Download Laporan Checkup' : 'Download Laporan Imunisasi';
  }

  onSubmit() {
    let d: downloadExcelRequestBody = {
      tanggalAwal: this.startDates,
      tanggalAkhir: this.endDates
    };
    if (this.type === 'checkup') {
      this.getExcelCheckup(d);
    } else {
      this.getExcelImunisasi(d);
    }
  }

  
  getExcelCheckup(request: downloadExcelRequestBody) {
    this.isLoading = true;
    this.isError = false;
    this.service.getExcelCheckup(request)
      .pipe(takeUntil(this.destroySubject$))
      .subscribe(
        
        response => {
          console.log(response);
          // saveAs(response, 'a')
        let filename = response.headers.get('content-disposition');
        let blob: Blob = response.body as Blob;
        console.log(filename);
        console.log(blob);
        

        // let dataType = response.type;
        //     let binaryData = [];
        //     binaryData.push(response);
        //     let downloadLink = document.createElement('a');
        //     downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
        //     // if (filename)
        //     //     downloadLink.setAttribute('download', filename);
        //     document.body.appendChild(downloadLink);
        //     downloadLink.click();

        
        this.isLoading = false;
      }, err => {
        this.isError = true;
        this.isLoading = false;
      })
  }

  getExcelImunisasi(request: downloadExcelRequestBody) {
    this.isLoading = true;
    this.isError = false;
    this.service.getExcelImunisasi(request)
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

}
