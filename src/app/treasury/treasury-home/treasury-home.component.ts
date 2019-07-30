import { Component } from '@angular/core';

@Component({
  selector: 'app-treasury-home',
  templateUrl: './treasury-home.component.html',
  styleUrls: ['./treasury-home.component.css']
})

export class TreasuryHomeComponent {
  isMatchPaymentClicked: boolean = true;
  header: string = "PAYMENT VIEW";

  constructor() { }

  openProcessPayment() {
    this.header = "PAYMENT VIEW";
    this.isMatchPaymentClicked = true;
  }
}

