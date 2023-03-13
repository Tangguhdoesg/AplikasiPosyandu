import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'PELITA';
  sideNavStatus: boolean = false;
  
  user?: any;

  ngOnInit(): void {
    console.log(sessionStorage.getItem('token'));
    if (sessionStorage.getItem('token') !== null) {
      this.user = ['111'];
    }
    
  }
}
