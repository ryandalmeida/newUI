import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-donor-home',
  templateUrl: './donor-home.component.html',
  styleUrls: ['./donor-home.component.css']
})

export class DonorHomeComponent implements OnInit {
  isDashboardClicked: boolean = true;
  isRecordLegalClicked: boolean = false;
  isInitiateAccountReceivable: boolean = false;
  isGenerateBillClicked: boolean = false;
  isProcessPaymentClicked: boolean = false;
  isUserRoleClicked: boolean = false;
  isPaymentClicked: boolean = false;
  isInitiatePledgeClicked: boolean = false;
  isMatchPaymentClicked: boolean = false;
  isMenuOpen = true;
  submitted = false;
  contentMargin = 240;
  header: string  = "Pledge";

  //@Input() donorMessage: boolean;
  //@Output() messageEvent = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

// Open Dashboard
  openDashboard() {
    this.header = "Pledge";
  //  this.messageEvent.emit(this.header)
    this.isDashboardClicked = true;
    this.isRecordLegalClicked =  false;
    this.isInitiateAccountReceivable = false;
    this.isGenerateBillClicked = false;
    this.isProcessPaymentClicked = false;
    this.isProcessPaymentClicked = false;
    this.isMatchPaymentClicked= false;
    this.isUserRoleClicked = false;
    this.isPaymentClicked = false;
    this.isInitiatePledgeClicked = false;
     
   }

   // Open Initiate Pledge
   openInitiatePledge() {
    this.header = "Initiate Pledge";
    this.isInitiatePledgeClicked = true;
    this.isDashboardClicked = false;
    this.isRecordLegalClicked =  false;
    this.isInitiateAccountReceivable = false;
    this.isGenerateBillClicked = false;
    this.isProcessPaymentClicked = false;
    this.isMatchPaymentClicked= false;
    this.isUserRoleClicked = false;
    
  }

   // Open Record Legal 
  openRecordLegal(){
    this.header = "Legal";
    this.isDashboardClicked = false;
    this.isRecordLegalClicked = true;
    this.isInitiateAccountReceivable = false;
    this.isGenerateBillClicked = false;
    this.isProcessPaymentClicked = false;
    this.isUserRoleClicked = false;
    this.isPaymentClicked = false;
    this.isMatchPaymentClicked= false;
    this.isInitiatePledgeClicked = false;
  }


  // Open Initiate Account Receivable 
  openInitiateAccountReceivable() {
    this.header = "Initiate Account Receivable";
    this.isInitiatePledgeClicked = false;
    this.isDashboardClicked = false;
    this.isRecordLegalClicked =  false;
    this.isInitiateAccountReceivable = true;
    this.isGenerateBillClicked = false;
    this.isProcessPaymentClicked = false;
    this.isMatchPaymentClicked= false;
    this.isUserRoleClicked = false;
  }

  // Open Generate Bill 
  openGenerateBill() {
    this.header = "Generate Bill";
    this.isInitiatePledgeClicked = false;
    this.isDashboardClicked = false;
    this.isRecordLegalClicked =  false;
    this.isInitiateAccountReceivable = false;
    this.isGenerateBillClicked = true;
    this.isProcessPaymentClicked = false;
    this.isMatchPaymentClicked= false;
    this.isUserRoleClicked = false;
  }
  
  // Open Process Payment 

  openProcessPayment(){
    this.header = "Payment View for Treasury";
    this.isDashboardClicked = false;
    this.isRecordLegalClicked = false;
    this.isInitiateAccountReceivable = false;
    this.isInitiatePledgeClicked = false;
    this.isGenerateBillClicked = false;
    this.isProcessPaymentClicked = true;
    this.isMatchPaymentClicked= false;
    this.isUserRoleClicked = false;
    this.isPaymentClicked = false;
 }

// Open Process Payment 

openMatchPayment(){
  this.header = "Match Payment";
  this.isDashboardClicked = false;
  this.isRecordLegalClicked = false;
  this.isInitiateAccountReceivable = false;
  this.isInitiatePledgeClicked = false;
  this.isGenerateBillClicked = false;
  this.isProcessPaymentClicked = false;
  this.isUserRoleClicked = false;
  this.isPaymentClicked = false;
  this.isMatchPaymentClicked=true;
}

  // Open User Role 
  openUserRole(){
    this.header = "User Role";
    this.isDashboardClicked = false;
    this.isRecordLegalClicked = false;
    this.isInitiateAccountReceivable = false;
    this.isInitiatePledgeClicked = false;
    this.isGenerateBillClicked = false;
    this.isProcessPaymentClicked = false;
    this.isUserRoleClicked = true;
    this.isPaymentClicked = false;
    this.isMatchPaymentClicked=false;
  }
  
  openPayment(){
  	this.header = "Payment";
   	this.isDashboardClicked = false;
   	this.isRecordLegalClicked = false;
     this.isInitiateAccountReceivable = false;
     this.isInitiatePledgeClicked = false;
    this.isGenerateBillClicked = false;
    this.isProcessPaymentClicked = false;
    this.isUserRoleClicked = false;
     this.isPaymentClicked = true;
     this.isMatchPaymentClicked=false;
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

