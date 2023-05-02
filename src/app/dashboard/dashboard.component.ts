import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { AppServiceService } from '../app-service.service';
import { kegiatan } from '../models';
import { Subject, takeUntil } from 'rxjs';
import { userPosyanduType } from '../models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  destroySubject$: Subject<void> = new Subject();
  allActivity: kegiatan[] = [];
  posterLen: number = 0;
  posterActivity: any[] = [];
  summaryData: any[] = ['-', '-', '-', '-'];

  username: string | undefined;
  userType: string | undefined;

  isLoading: boolean = false;

  constructor(private service: AppServiceService) {
  }

  ngOnInit() {
    this.username = sessionStorage.getItem('nama')!;
    this.userType = sessionStorage.getItem('tipe')!;
    console.log(this.userType);
    
    if (this.userType === userPosyanduType.PETUGAS) {
      this.summaryOfReport();
    }
    this.getAllActivity();
  }

  getAllActivity() {
    this.isLoading = true;
    this.service.getAllActivity()
      .pipe(takeUntil(this.destroySubject$))
      .subscribe(data => {
        this.allActivity = [...data];
        this.allActivity.forEach(act => {
          if (act.posterKegiatan !== null) {
            this.posterActivity.push(act.posterKegiatan);
          }
          this.posterLen = this.posterActivity.length;
        })
        this.isLoading = false;
      }, err => {
        this.isLoading = false;
      })
  }

  summaryOfReport() {
    this.isLoading = true;
    this.service.summaryOfReport()
      .pipe(takeUntil(this.destroySubject$))
      .subscribe(data => {
        this.summaryData = [...data];
        this.isLoading = false;
      }, err => {
        this.summaryData = ['-', '-', '-', '-'];
        this.isLoading = false;
      })
  }

}
