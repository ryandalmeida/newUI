import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  isUserRoleClicked: boolean = true;
  isAuditLogDisplayClicked: boolean = false;
  isMenuOpen = true;
  submitted = false;
  header: String = "User Role";

  constructor() { }

  ngOnInit() { }

  openUserRole() {
    this.header = "User Role";
    this.isUserRoleClicked = true;
    this.isAuditLogDisplayClicked = false;
  }

  openAuditLogDisplay(){
    this.header = "Audit Log Display";
    this.isUserRoleClicked = false;
    this.isAuditLogDisplayClicked = true;
  }
}
