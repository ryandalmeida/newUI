import { Component } from '@angular/core';

@Component({
  selector: 'app-donor-home',
  templateUrl: './donor-home.component.html',
  styleUrls: ['./donor-home.component.css']
})

export class DonorHomeComponent {
  isDashboardClicked: boolean = true;
  isRecordLegalClicked: boolean = false;
  isPaymentClicked: boolean = false;
  isSideBtnClicked : boolean = false;
  header: string = "PLEDGE";

  constructor() { }

  openDashboard() {
    this.header = "PLEDGE";
    this.isDashboardClicked = true;
    this.isRecordLegalClicked = false;
    this.isPaymentClicked = false;
  }

  openRecordLegal() {
    this.header = "LEGAL";
    this.isDashboardClicked = false;
    this.isRecordLegalClicked = true;
    this.isPaymentClicked = false;
  }

  openPayment() {
    this.header = "INVOICE";
    this.isDashboardClicked = false;
    this.isRecordLegalClicked = false;
    this.isPaymentClicked = true;
  }

  sideBtnClicked(){
    this.isSideBtnClicked = !this.isSideBtnClicked;
  }
}

