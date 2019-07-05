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
  contentMargin = 240;
  header: String = "User Role";

  constructor() { }

  ngOnInit() {
  }

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

  toggle() {
    console.log("ismenuopen", this.isMenuOpen);

    this.isMenuOpen = !this.isMenuOpen;

    if (!this.isMenuOpen) {
      this.contentMargin = 100;
    } else {
      this.contentMargin = 240;
    }
  }

}
