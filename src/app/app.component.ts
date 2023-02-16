import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'PELITA';
  sideNavStatus: boolean = false;

  isLoginPage!: boolean;

  ngOnInit(): void {
    this.isLoginPage = true;
    console.log(this.isLoginPage);
    
  }

  isGoToLoginPage(e: boolean) {
    this.isLoginPage = e;
  }
}
