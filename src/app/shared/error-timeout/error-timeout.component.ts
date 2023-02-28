import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-timeout',
  templateUrl: './error-timeout.component.html',
  styleUrls: ['./error-timeout.component.scss']
})
export class ErrorTimeoutComponent {
  urlPage = null;
  
  constructor(private router: Router) {

  }


  reloadPage() {
    window.location.reload();
  }
}
