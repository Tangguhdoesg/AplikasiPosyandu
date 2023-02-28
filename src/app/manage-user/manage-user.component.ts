import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../app-service.service';
import { takeUntil } from "rxjs/operators"
import { Subject } from "rxjs"
import { userPosyandu } from '../models';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {
  destroySubject$: Subject<void> = new Subject();
  allUsers: userPosyandu[] = [];
  totalUsersData: number = 0;
  isLoading: boolean = false;
  isError: boolean = false;

  constructor(private service: AppServiceService) {

  }

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser() {
    this.isLoading = true;
    this.isError = false;
    this.service.getAllUser()
      .pipe(takeUntil(this.destroySubject$))
      .subscribe(data => {
        console.log(data);
        this.allUsers = [...data];
        this.totalUsersData = data.length;
        this.isLoading = false;
      }, err => {
        this.isError = true;
        this.isLoading = false;
      })
  }

}
