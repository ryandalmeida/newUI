import { Component, OnInit } from '@angular/core';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
import { UserRoleService } from '../services/userRole.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  emailId: any;
  roleObj: any[] = [];
  isApproverClicked: boolean = true;
  isDonorClicked: boolean = false;
  isTreasuryClicked: boolean = false;
  isAdminClicked: boolean = false;
  selectedItem: any;
  fname:any;
  lname:any;
  constructor(private MsAdalSvc: MsAdalAngular6Service, private userRoleService: UserRoleService, private router: Router, ) {

	if(this.MsAdalSvc.isAuthenticated){
     var object = {
       "emailId":this.MsAdalSvc.LoggedInUserEmail
     }
     this.userRoleService.searchUserName(object).subscribe(
       response =>{
        this.fname = response.firstName;
        this.lname = response.lastName;
        }
     ); 
    
  }
  onAnchorClick(item) {
    this.selectedItem = item;
    if (item == "Approver") {
      this.router.navigate(["/approver"]);
    }
    if (item == "Donor") {
      this.router.navigate(["/"]);
    }
    if (item == "Treasury") {
      this.router.navigate(["/treasury"]);
    }
    if (item == "Admin") {
      this.router.navigate(["/admin"]);
    }
  }

  async ngOnInit() {
    this.roleObj = <any>await this.userRoleService.getRole();
    if (this.roleObj.includes('DONOR')) {
      this.selectedItem = "Donor";
    }
    else if (this.roleObj.includes('APPROVER')) {
      this.selectedItem = "Approver";
    }
    else if (this.roleObj.includes('TREASURY')) {
      this.selectedItem = 'Treasury';
    }
    else if (this.roleObj.includes('ADMIN')) {
      this.selectedItem = 'Admin';
    }

   // this.MsAdalSvc.handleCallback();
  }

  checkAccess(role) {
    return !(this.roleObj && this.roleObj.includes(role));
  }

  approverRoleClicked() {
    this.isApproverClicked = true;
    this.isDonorClicked = false;
    this.isTreasuryClicked = false;
    this.isAdminClicked = false;
  }

  donorRoleClicked() {
    this.isApproverClicked = false;
    this.isDonorClicked = true;
    this.isTreasuryClicked = false;
    this.isAdminClicked = false;
  }

  treasuryRoleClicked() {
    this.isApproverClicked = false;
    this.isDonorClicked = false;
    this.isTreasuryClicked = true;
    this.isAdminClicked = false;
  }

  adminRoleClicked() {
    this.isApproverClicked = false;
    this.isDonorClicked = false;
    this.isTreasuryClicked = false;
    this.isAdminClicked = true;
  }

  onLogout() {
    this.MsAdalSvc.logout();
    this.MsAdalSvc.login();
   // this.MsAdalSvc.handleCallback();
  }
}
