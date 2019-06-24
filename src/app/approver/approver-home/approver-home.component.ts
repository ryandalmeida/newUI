import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-approver-home',
  templateUrl: './approver-home.component.html',
  styleUrls: ['./approver-home.component.css']
})
export class ApproverHomeComponent implements OnInit {
  isDashboardClicked: boolean = true;
  isInitiatePledgeClicked: boolean = false;
  isRecordLegalClicked:boolean = false;
  isInitiateARClicked: boolean = false;
  isGenerateBillingClicked: boolean =false;
  isMenuOpen = true;
  submitted = false;
  contentMargin = 240;
  header: String = "Pledge";

  constructor() { }

  ngOnInit() {
  }

  openDashboard() {
    this.header = "Pledge";
    this.isDashboardClicked = true;
    this.isInitiatePledgeClicked = false;
    this.isRecordLegalClicked  = false;
    this.isInitiateARClicked = false;
    this.isGenerateBillingClicked=false;
  }


  openRecordLegal(){
    this.header = "Legal";
    this.isInitiatePledgeClicked = false;
    this.isDashboardClicked = false;
    this.isRecordLegalClicked = true;
    this.isInitiateARClicked = false;
    this.isGenerateBillingClicked=false;
  }

  openGenerateBilling() {
    this.header = "Account Receivable";
      this.isInitiateARClicked = false;
      this.isDashboardClicked = false;
      this.isInitiatePledgeClicked = false;
      this.isRecordLegalClicked = false;
      this.isGenerateBillingClicked=true;
  }
  openInitiateAR() {
    this.header = "Account Receivable";
      this.isInitiateARClicked = true;
      this.isDashboardClicked = false;
      this.isInitiatePledgeClicked = false;
      this.isRecordLegalClicked = false;
      this.isGenerateBillingClicked=false;
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
