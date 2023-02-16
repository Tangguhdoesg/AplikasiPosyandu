import { OnInit, Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppServiceService } from '../app-service.service';
import { takeUntil } from "rxjs/operators"
import { Subject } from "rxjs"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  destroySubject$: Subject<void> = new Subject();
  @Output() toLoginPage = new EventEmitter<any>();

  constructor(private router: Router,
              private service: AppServiceService) { }

  ngOnInit(): void {
    this.getAllUser();
  }

  onSubmit() {
    this.toLoginPage.emit(false);
    this.router.navigateByUrl('/dashboard');
  }

  getAllUser() {
    this.service.getAllUser()
      .pipe(takeUntil(this.destroySubject$))
      .subscribe(data => {
        console.log(data);
        
      })
  }
}
