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
  isMatchPaymentClicked: boolean = false;
  isMenuOpen = true;
  submitted = false;
  contentMargin = 240;
  header: String = "PLEDGE";

  constructor() { }

  ngOnInit() {
  }

  openDashboard() {
    this.header = "PLEDGE";
    this.isDashboardClicked = true;
    this.isInitiatePledgeClicked = false;
    this.isRecordLegalClicked  = false;
    this.isInitiateARClicked = false;
    this.isGenerateBillingClicked=false;
    this.isMatchPaymentClicked=false;
  }


  openRecordLegal(){
    this.header = "LEGAL";
    this.isInitiatePledgeClicked = false;
    this.isDashboardClicked = false;
    this.isRecordLegalClicked = true;
    this.isInitiateARClicked = false;
    this.isGenerateBillingClicked=false;
    this.isMatchPaymentClicked=false;
  }

  openGenerateBilling() {
    this.header = "GENERATE BILLING";
      this.isInitiateARClicked = false;
      this.isDashboardClicked = false;
      this.isInitiatePledgeClicked = false;
      this.isRecordLegalClicked = false;
      this.isGenerateBillingClicked=true;
      this.isMatchPaymentClicked=false;
  }
  openInitiateAR() {
    this.header = "ACCOUNT RECEIVABLE";
      this.isInitiateARClicked = true;
      this.isDashboardClicked = false;
      this.isInitiatePledgeClicked = false;
      this.isRecordLegalClicked = false;
      this.isGenerateBillingClicked=false;
      this.isMatchPaymentClicked=false;
  }

  openMatchPayment(){
    this.header = "MATCH PAYMENT";
    this.isDashboardClicked = false;
    this.isInitiatePledgeClicked = false;
    this.isRecordLegalClicked  = false;
    this.isInitiateARClicked = false;
    this.isGenerateBillingClicked=false;
    this.isMatchPaymentClicked=true;
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
