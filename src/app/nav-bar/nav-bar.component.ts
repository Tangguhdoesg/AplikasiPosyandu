import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  @Output() sideNavToggled = new EventEmitter<boolean>();
  @Output() toLoginPage = new EventEmitter<any>();

  menuStatus: boolean = false;

  constructor(private router: Router) {
  }


  ngOnInit(): void {
  }

  sideNavToggle() {
    this.menuStatus = !this.menuStatus;
    this.sideNavToggled.emit(this.menuStatus);
  }
  
  logout() {
    // this.toLoginPage.emit(false);
    this.router.navigateByUrl('/login');
  }

}
