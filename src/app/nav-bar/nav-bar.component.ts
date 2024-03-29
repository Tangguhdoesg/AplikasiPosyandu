import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  @Output() sideNavToggled = new EventEmitter<boolean>();
  @Output() toLoginPage = new EventEmitter<any>();

  @Input() menuStatus: boolean = false;

  constructor(private router: Router) {
  }


  ngOnInit(): void {
  }

  sideNavToggle() {
    this.menuStatus = !this.menuStatus;
    this.sideNavToggled.emit(this.menuStatus);
    console.log(this.menuStatus);
    
  }
  
  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('nama');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('nik');
    sessionStorage.removeItem('telp');
    sessionStorage.removeItem('tipe');
    sessionStorage.removeItem('alamat');
    sessionStorage.removeItem('lahir');
    this.router.navigateByUrl('/login');
  }
  
  goToPage(url: any) {
    this.router.navigateByUrl(url);
  }
}
