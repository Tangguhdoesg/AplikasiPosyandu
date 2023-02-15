import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @Output() toLoginPage = new EventEmitter<any>();

  constructor(private router: Router) { }

  onSubmit() {
    this.toLoginPage.emit(false);
    this.router.navigateByUrl('/dashboard');
  }
}
