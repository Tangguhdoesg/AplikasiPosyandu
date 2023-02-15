import {Component, Input, OnInit} from '@angular/core';

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
      name: 'Home',
      icon: 'fa-solid fa-house'
    },
    {
      number: '2',
      name: 'Analytics',
      icon: 'fa-solid fa-chart-line'
    },
    {
      number: '3',
      name: 'Settings',
      icon: 'fa-solid fa-gear'
    },
    {
      number: '4',
      name: 'About',
      icon: 'fa-solid fa-circle-info'
    },
    {
      number: '5',
      name: 'Contact',
      icon: 'fa-solid fa-phone'
    }
  ]

  constructor() {
  }

  ngOnInit(): void {
  }

}
