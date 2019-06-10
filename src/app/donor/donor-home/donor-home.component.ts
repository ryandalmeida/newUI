import { Component, OnInit, Input } from '@angular/core';
import { PledgeService } from 'src/app/services/pledge.service';

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
  isMenuOpen = true;
  submitted = false;
  contentMargin = 240;
  header: String = "Pledge";

  //@Input() donorMessage: boolean;

  constructor(private pledgeService: PledgeService) { }

  ngOnInit() {
    //console.log("childMessage", this.donorMessage)
    console.log("Fetuched url:" + this.pledgeService.localUrl);
  }

  openDashboard() {
    this.header = "Pledge";
    this.isDashboardClicked = true;
    this.isRecordLegalClicked =  false;
    this.isInitiateAccountReceivable = false;
    this.isGenerateBillClicked = false;
    this.isProcessPaymentClicked = false;
    this.isUserRoleClicked = false;
     this.isPaymentClicked = false;
   }

  openRecordLegal(){
    this.header = "Legal";
    this.isDashboardClicked = false;
    this.isRecordLegalClicked = true;
    this.isInitiateAccountReceivable = false;
    this.isGenerateBillClicked = false;
    this.isProcessPaymentClicked = false;
    this.isUserRoleClicked = false;
    this.isPaymentClicked = false;
  }

  openProcessPayment(){
    this.header = "Payment View for Treasury";
    this.isDashboardClicked = false;
    this.isRecordLegalClicked = false;
    this.isInitiateAccountReceivable = false;
    this.isGenerateBillClicked = false;
    this.isProcessPaymentClicked = true;
    this.isUserRoleClicked = false;
    this.isPaymentClicked = false;
 }


  openUserRole(){
    this.header = "User Role";
    this.isDashboardClicked = false;
    this.isRecordLegalClicked = false;
    this.isInitiateAccountReceivable = false;
    this.isGenerateBillClicked = false;
    this.isProcessPaymentClicked = false;
    this.isUserRoleClicked = true;
    this.isPaymentClicked = false;
  }
  
  openPayment(){
  	this.header = "Payment";
   	this.isDashboardClicked = false;
   	this.isRecordLegalClicked = false;
   	this.isInitiateAccountReceivable = false;
    this.isGenerateBillClicked = false;
    this.isProcessPaymentClicked = false;
    this.isUserRoleClicked = false;
   	this.isPaymentClicked = true;
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
