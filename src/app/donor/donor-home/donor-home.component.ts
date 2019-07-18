import { Component, OnInit, Input, Output, EventEmitter, HostBinding, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-donor-home',
  templateUrl: './donor-home.component.html',
  styleUrls: ['./donor-home.component.css']
})

export class DonorHomeComponent {
  isDashboardClicked: boolean = true;
  isRecordLegalClicked: boolean = false;
  isPaymentClicked: boolean = false;
  header: string = "PLEDGE";

  constructor(private changeDetectorRefs: ChangeDetectorRef) { }

  // Open Dashboard
  openDashboard() {
    this.header = "PLEDGE";
    this.isDashboardClicked = true;
    this.isRecordLegalClicked = false;
    this.isPaymentClicked = false;
  }

  // Open Record Legal 
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
}

