import { Component } from '@angular/core';

@Component({
  selector: 'app-approver-home',
  templateUrl: './approver-home.component.html',
  styleUrls: ['./approver-home.component.css']
})
export class ApproverHomeComponent {
  isDashboardClicked: boolean = true;
  isRecordLegalClicked: boolean = false;
  isInitiateARClicked: boolean = false;
  isGenerateBillingClicked: boolean = false;
  isMatchPaymentClicked: boolean = false;
  header: String = "PLEDGE";

  constructor() { }

  openDashboard() {
    this.header = "PLEDGE";
    this.isDashboardClicked = true;
    this.isRecordLegalClicked = false;
    this.isInitiateARClicked = false;
    this.isGenerateBillingClicked = false;
    this.isMatchPaymentClicked = false;
  }

  openRecordLegal() {
    this.header = "LEGAL";
    this.isDashboardClicked = false;
    this.isRecordLegalClicked = true;
    this.isInitiateARClicked = false;
    this.isGenerateBillingClicked = false;
    this.isMatchPaymentClicked = false;
  }

  openGenerateBilling() {
    this.header = "GENERATE BILLING";
    this.isInitiateARClicked = false;
    this.isDashboardClicked = false;
    this.isRecordLegalClicked = false;
    this.isGenerateBillingClicked = true;
    this.isMatchPaymentClicked = false;
  }
  
  openInitiateAR() {
    this.header = "ACCOUNT RECEIVABLE";
    this.isInitiateARClicked = true;
    this.isDashboardClicked = false;
    this.isRecordLegalClicked = false;
    this.isGenerateBillingClicked = false;
    this.isMatchPaymentClicked = false;
  }

  openMatchPayment() {
    this.header = "MATCH PAYMENT";
    this.isDashboardClicked = false;
    this.isRecordLegalClicked = false;
    this.isInitiateARClicked = false;
    this.isGenerateBillingClicked = false;
    this.isMatchPaymentClicked = true;
  }
}
