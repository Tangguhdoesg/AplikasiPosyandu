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
      icon: 'fa-solid fa-user',
      path: '/dashboard'
    },
    {
      number: '3',
      name: 'Laporan',
      icon: 'fa-solid fa-chart-line',
      path: '/dashboard'
    },
    {
      number: '4',
      name: 'Kegiatan',
      icon: 'fa-solid fa-gear',
      path: '/dashboard'
    },
    {
      number: '5',
      name: 'Balita',
      icon: 'fa-solid fa-baby',
      path: '/dashboard'
    }
  ]

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    
  }

  goToHomePage() {
    console.log('aa');
    this.router.navigateByUrl('/dashboard');
  }

}
