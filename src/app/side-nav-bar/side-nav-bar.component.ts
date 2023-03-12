import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.scss']
})
export class SideNavBarComponent implements OnInit {
  @Input() sideNavStatus: boolean = false;

  list = [
    {
      number: '1',
      name: 'Halaman Awal',
      icon: 'fa-solid fa-house',
      path: '/dashboard'
    },
    {
      number: '2',
      name: 'Pengaturan Pengguna',
      icon: 'fa-solid fa-users',
      path: '/manage-user'
    },
    {
      number: '3',
      name: 'Laporan',
      icon: 'fa-solid fa-chart-line',
      path: '/report'
    },
    {
      number: '4',
      name: 'Kegiatan',
      icon: 'fa-solid fa-person-skating',
      path: '/manage-activity'
    },
    {
      number: '5',
      name: 'Balita',
      icon: 'fa-solid fa-baby',
      path: '/manage-toddler'
    },
    {
      number: '6',
      name: 'Imunisasi',
      icon: 'fa-solid fa-syringe',
      path: '/manage-imunisasi'
    },
    {
      number: '7',
      name: 'Pemeriksaan',
      icon: 'fa-solid fa-stethoscope',
      path: '/manage-checkup'
    }
  ]

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    
  }

  goToPage(url: any) {
    this.router.navigateByUrl(url);
  }

}
