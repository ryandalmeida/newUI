import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  isUserRoleClicked: boolean = true;
  isAuditLogDisplayClicked: boolean = false;
  isSideBtnClicked: boolean = false;
  header: String = "USER ROLE";

  constructor() { }

  ngOnInit() { }

  openUserRole() {
    this.header = "USER ROLE";
    this.isUserRoleClicked = true;
    this.isAuditLogDisplayClicked = false;
  }

  openAuditLogDisplay(){
    this.header = "AUDIT LOG";
    this.isUserRoleClicked = false;
    this.isAuditLogDisplayClicked = true;
  }
  
  sideBtnClicked(){
    this.isSideBtnClicked = !this.isSideBtnClicked;
  }
}
