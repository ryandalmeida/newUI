import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
import { DonorHomeComponent } from '../donor/donor-home/donor-home.component';
import { UserRoleService } from '../services/userRole.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'WBG-UI';
  username;
  newHeader: any;
  roleObj;
  @ViewChild(DonorHomeComponent) child;
  message:string;
  //@ViewChild(DonorHomeComponent) child: DonorHomeComponent;
  constructor(private router: Router, private MsAdalSvc: MsAdalAngular6Service, private userRoleService: UserRoleService) {
    this.username = this.MsAdalSvc.LoggedInUserName;
    // this.newHeader=this.child.header; 
  }

  /* receiveMessage($event) {
    this.message = $event
  } */

  /*  ngAfterViewInit() {
    this.message = this.child.header
    console.log("measahe",this.message)
  }  */

  ngOnInit() {
   
  /*   this.userRoleService.getRole().then(response => {
      if(response.hasOwnProperty('role')) {
        this.roleObj = response['role'];
        console.log("testing response of role",this.roleObj);
        console.log(response['role'])
      }
     
      
    }).catch(error => {
      console.log(error);
    });
 */
    this.roleObj = [
      'WBG USER',
      'DONOR'
      ] 
  }

  checkAccess(role){
    return !(this.roleObj && this.roleObj.includes(role));
  }

  onLogout() {
    this.MsAdalSvc.logout();

  }
}
