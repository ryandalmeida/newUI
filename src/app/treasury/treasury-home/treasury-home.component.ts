import { Component, OnInit, Input, Output, EventEmitter, HostBinding, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-treasury-home',
  templateUrl: './treasury-home.component.html',
  styleUrls: ['./treasury-home.component.css']
})

export class TreasuryHomeComponent implements OnInit  {
  isDashboardClicked: boolean = false;
  isRecordLegalClicked: boolean = false;
  isInitiateAccountReceivable: boolean = false;
  isGenerateBillClicked: boolean = false;
  isProcessPaymentClicked: boolean = true;
  isUserRoleClicked: boolean = false;
  isPaymentClicked: boolean = false;
  isInitiatePledgeClicked: boolean = false;
  isMatchPaymentClicked: boolean = false;
  isAuditLogDisplayClicked=false;
  submitted = false;
  contentMargin = 240;
  header: string  = "PAYMENT VIEW";
  /* @ViewChild('snav') sidebar; */ 
  
 //@Input() donorMessage: boolean;
  //@Output() messageEvent = new EventEmitter<string>();
  constructor(private changeDetectorRefs: ChangeDetectorRef) { }


  ngOnInit() {
    console.log('/subscriptions/');
    
  }

  openProcessPayment(){
    this.header = "PAYMENT VIEW";
    this.isDashboardClicked = false;
    this.isRecordLegalClicked = false;
    this.isInitiateAccountReceivable = false;
    this.isInitiatePledgeClicked = false;
    this.isGenerateBillClicked = false;
    this.isProcessPaymentClicked = true;
    this.isMatchPaymentClicked= false;
    this.isUserRoleClicked = false;
    this.isPaymentClicked = false;
    this.isAuditLogDisplayClicked=false;
 }

}

