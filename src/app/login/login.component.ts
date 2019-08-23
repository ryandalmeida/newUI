import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Adal6Service } from 'adal-angular6';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
    private adalSvc: Adal6Service) { }

  ngOnInit() {
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
 
    if (this.adalSvc.userInfo.authenticated) {
      this.router.navigate([returnUrl]);
    } else {
      this.adalSvc.login();
    }
  }

}
