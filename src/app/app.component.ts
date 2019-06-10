import { Component, OnInit } from '@angular/core';
// import { Adal6Service } from 'adal-angular6';
import{MsAdalAngular6Service}from  'microsoft-adal-angular6';
import { environment } from '../environments/environment';
import { PledgeService } from './services/pledge.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'WBG-UI';
  

  // constructor(private adalSvc: Adal6Service) {
  //   this.adalSvc.init(environment.adalConfig);
    
 //}

 constructor(private pledgeService: PledgeService){

 }
  

  ngOnInit() {
    //this.adalSvc.handleWindowCallback();
    console.log(window.location.pathname);
    this.pledgeService.localUrl = window.location.pathname;
  }
}



