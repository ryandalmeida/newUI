import { Component, OnInit } from '@angular/core';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
import { UserRoleService } from '../services/userRole.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  username: any;
  roleObj: any;
  isApproverClicked: boolean = true;
  isDonorClicked: boolean = false;
  isTreasuryClicked: boolean = false;
  isAdminClicked: boolean = false;
  roleForm: FormGroup;
 // selectedItem:any;
  constructor(private formBuilder: FormBuilder, private MsAdalSvc: MsAdalAngular6Service, private userRoleService: UserRoleService,private router: Router,) {
    this.username = this.MsAdalSvc.LoggedInUserName;
  }
  onAnchorClick(item){
    console.log("item",item);
    //this.selectedItem = "Donor";
    if(item == "Approver"){
      this.router.navigate(["/approver"]);
    }
    if(item == "Donor"){
      this.router.navigate(["/"]);
    }
    if(item == "Treasury"){
      this.router.navigate(["/treasury"]);
    }
    if(item == "Admin"){
      this.router.navigate(["/admin"]);
    }
          
}

  async ngOnInit() {
    this.roleForm = this.formBuilder.group({
      role: [''],
    });

    this.roleObj = <any>await this.userRoleService.getRole();
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
  }
}
