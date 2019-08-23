import { Component, OnInit } from '@angular/core';
import { Adal6Service } from 'adal-angular6';

import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'WBG-UI';
  /* isDashboardClicked: boolean = true;
  isInitiatePledgeClicked: boolean = false;
  isMenuOpen = true;
  submitted = false;
  contentMargin = 240;
  header: String = "Dashboard"; */

 // goToPledgeList = false;

  constructor(private adalSvc: Adal6Service) {
    this.adalSvc.init(environment.adalConfig);
   }

  ngOnInit() {
    this.adalSvc.handleWindowCallback();
    /* console.log(window.location.pathname);
    if(window.location.pathname === '/pledgelist'){
      this.goToPledgeList = true;
      this.isInitiatePledgeClicked = true;
    this.isDashboardClicked = false;
    } */
  }

  
}



