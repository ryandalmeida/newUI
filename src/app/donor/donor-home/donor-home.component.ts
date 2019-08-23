import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-donor-home',
  templateUrl: './donor-home.component.html',
  styleUrls: ['./donor-home.component.css']
})
export class DonorHomeComponent implements OnInit {
  isDashboardClicked: boolean = true;
  isInitiatePledgeClicked: boolean = false;
  isMenuOpen = true;
  submitted = false;
  contentMargin = 240;
  header: String = "Dashboard";

  //@Input() donorMessage: boolean;

  constructor() { }

  ngOnInit() {
    //console.log("childMessage", this.donorMessage)
  }

  openDashboard() {
    this.header = "Dashboard";
    this.isDashboardClicked = true;
    this.isInitiatePledgeClicked = false;
   // this.goToPledgeList = false;
  }

  openInitiatePledge() {
    this.header = "Initiate Pledge";
    this.isInitiatePledgeClicked = true;
    this.isDashboardClicked = false;
    //this.goToPledgeList = false;
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
