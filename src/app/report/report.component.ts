import { Component } from '@angular/core';
import { AppServiceService } from '../app-service.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {
  destroySubject$: Subject<void> = new Subject();

  isLoading: boolean = false;
  isError: boolean = false;

  request = {
    "tanggalAwal":"2023-01-01",
    "tanggalAkhir":"2023-04-11"
  };

  requestSend = {
    "tanggalAwal":"2023-01-01",
    "tanggalAkhir":"2023-04-11",
    "email":"tangguhdoesgaming@gmail.com"
  };

  constructor(private service: AppServiceService) { }

  ngOnInit(): void {

  }

  getExcelCheckup() {
    this.isLoading = true;
    this.isError = false;
    this.service.getExcelCheckup(this.request)
      .pipe(takeUntil(this.destroySubject$))
      .subscribe(response => {
        console.log(response);
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
        // this.isError = true;
        this.isLoading = false;
      })
  }

  getExcelImunisasi() {
    this.isLoading = true;
    this.isError = false;
    this.service.getExcelImunisasi(this.request)
      .pipe(takeUntil(this.destroySubject$))
      .subscribe(datas => {
        console.log(datas);
        
        this.isLoading = false;
      }, err => {
        // this.isError = true;
        this.isLoading = false;
      })
  }

  sendReport() {
    this.isLoading = true;
    this.isError = false;
    this.service.sendReport(this.requestSend)
      .pipe(takeUntil(this.destroySubject$))
      .subscribe(datas => {
        console.log(datas);
        
        this.isLoading = false;
      }, err => {
        // this.isError = true;
        this.isLoading = false;
      })
  }
}
