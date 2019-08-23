import { Component, OnInit } from '@angular/core';
import { Adal6Service } from 'adal-angular6';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  isAuthenticated = false;

  constructor(private adalSvc: Adal6Service) {
    this.isAuthenticated = this.adalSvc.userInfo.authenticated;
   }

  ngOnInit() {

    if (this.isAuthenticated) {
      this.adalSvc.logOut();
    }  }

}
