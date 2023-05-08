import { Component } from '@angular/core';
import { AppServiceService } from '../app-service.service';
import { Subject, takeUntil } from 'rxjs';
import { saveAs } from 'file-saver';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { DownloadModalComponent } from './download-modal/download-modal.component';
import { SendModalComponent } from './send-modal/send-modal.component';
import { totalInfo } from '../models';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {
  destroySubject$: Subject<void> = new Subject();

  isLoading: boolean = false;
  isError: boolean = false;
  showSuccessMessage: boolean = false;
  successMessage: string = 'a';
  
  summaryData: totalInfo | undefined;

  modalRefDownload: MdbModalRef<DownloadModalComponent> | null = null;
  modalRefSend: MdbModalRef<SendModalComponent> | null = null;

  // request = {
  //   "tanggalAwal":"2023-01-01",
  //   "tanggalAkhir":"2023-04-11"
  // };

  // requestSend = {
  //   "tanggalAwal":"2023-01-01",
  //   "tanggalAkhir":"2023-04-11",
  //   "email":"tangguhdoesgaming@gmail.com"
  // };

  constructor(private service: AppServiceService,
    private modalService: MdbModalService) { }

  ngOnInit(): void {
     this.summaryOfReport();
  }
  
  summaryOfReport() {
    this.isLoading = true;
    this.service.summaryOfReport()
      .pipe(takeUntil(this.destroySubject$))
      .subscribe(data => {
        this.summaryData = data;
        this.isLoading = false;
      }, err => {
        this.summaryData!.start = '-';
        this.summaryData!.end = '-';
        this.summaryData!.ListNumber = ['-', '-', '-', '-'];
        this.isLoading = false;
      })
  }

  openDialogDownload(type: string) {
    this.modalRefDownload = this.modalService.open(DownloadModalComponent, {
      modalClass: 'modal-lg',
      data: { type: type },
      ignoreBackdropClick: true
    });
    this.modalRefDownload.onClose.subscribe((message: any) => {
      if (message === 'submit') {
        
      } else {
        this.showSuccessMessage = false;
      }
    });
  }

  openDialogSend() {
    this.modalRefSend = this.modalService.open(SendModalComponent, {
      modalClass: 'modal-lg',
      ignoreBackdropClick: true
    });
    this.modalRefSend.onClose.subscribe((message: any) => {
      if (message === 'submit') {
        this.showSuccessMessage = true;
        this.successMessage = 'Laporan berhasil dikirim.'
      } else {
        this.showSuccessMessage = false;
      }
    });
  }

}
