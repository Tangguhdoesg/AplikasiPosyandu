import {Component, Output, OnInit, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { userPosyanduType } from '../models';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.scss']
})
export class SideNavBarComponent implements OnInit {
  // @Input() sideNavStatus: boolean = false;
  @Output() sideNavToggled = new EventEmitter<boolean>();
  userRole = sessionStorage.getItem('tipe');

  list = [
    {
      number: '1',
      name: 'Dashboard',
      icon: 'fa-solid fa-house',
      path: '/dashboard',
      access: [userPosyanduType.ADMIN, userPosyanduType.PETUGAS, userPosyanduType.ORANGTUA]
    },
    {
      number: '2',
      name: 'Pengaturan Pengguna',
      icon: 'fa-solid fa-users',
      path: '/manage-user',
      access: [userPosyanduType.ADMIN]
    },
    {
      number: '3',
      name: 'Informasi Kesehatan',
      icon: 'fa-solid fa-chart-line',
      path: '/health-info',
      access: [userPosyanduType.ORANGTUA]
    },
    {
      number: '3',
      name: 'Laporan',
      icon: 'fa-solid fa-chart-line',
      path: '/report',
      access: [userPosyanduType.PETUGAS]
    },
    {
      number: '4',
      name: 'Kegiatan',
      icon: 'fa-solid fa-person-skating',
      path: '/manage-activity',
      access: [userPosyanduType.PETUGAS, userPosyanduType.ORANGTUA]
    },
    {
      number: '5',
      name: 'Balita',
      icon: 'fa-solid fa-baby',
      path: '/manage-toddler',
      access: [userPosyanduType.PETUGAS, userPosyanduType.ORANGTUA]
    },
    {
      number: '6',
      name: 'Imunisasi',
      icon: 'fa-solid fa-syringe',
      path: '/manage-imunisasi',
      access: [userPosyanduType.PETUGAS, userPosyanduType.ORANGTUA]
    },
    {
      number: '7',
      name: 'Checkup',
      icon: 'fa-solid fa-stethoscope',
      path: '/manage-checkup',
      access: [userPosyanduType.PETUGAS, userPosyanduType.ORANGTUA]
    }
  ]

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    
  }

  goToPage(url: any) {
    // this.sideNavStatus = false;
    this.sideNavToggled.emit(false);
    this.router.navigateByUrl(url);
  }

  checkAccess(access: any): boolean {
    return access.includes(this.userRole);
  }

}
