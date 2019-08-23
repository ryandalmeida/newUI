import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-approver-home',
  templateUrl: './approver-home.component.html',
  styleUrls: ['./approver-home.component.css']
})
export class ApproverHomeComponent implements OnInit {
  isDashboardClicked: boolean = true;
  isInitiatePledgeClicked: boolean = false;
  isMenuOpen = true;
  submitted = false;
  contentMargin = 240;
  header: String = "Dashboard";

  constructor() { }

  ngOnInit() {
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
