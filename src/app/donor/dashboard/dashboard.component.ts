import { Component, OnInit, Input, ViewChild, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse, } from '@angular/common/http';
import { MatPaginator, MatSort, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { PledgeService } from '../../services/pledge.service';
import { PledgeData } from '../../models/pledge.model';
import { PagerService } from '../../services/pagerService.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  searchForm: FormGroup;
  registerForm: FormGroup;
  submitted = false;
  displayedColumns: string[] = ['pledgeId', 'programName', 'pledgeFundType', 'amount', 'installments', 'paymentPeriod', 'startDate', 'endDate'];
  dataSource: MatTableDataSource<PledgeData>;
  createPledgeClicked: boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() childMessage: boolean;
  @ViewChild(MatSort) sort: MatSort;
  private allItems: any[];
  pager: any = {};
  pagedItems: any[];
  lastPage: number;
  cancelClicked: boolean = false;
  constructor(private pledgeService: PledgeService, private formBuilder: FormBuilder, public dialog: MatDialog, private pagerService: PagerService, private changeDetectorRefs: ChangeDetectorRef,  private spinnerService: Ng4LoadingSpinnerService) { }
  pageload() {
    this.spinnerService.show();
    this.pledgeService.getAllPledge().subscribe(
      (data) => {
        this.spinnerService.hide();
        this.allItems = data;
        console.log(data)
        this.setPage(1);
      },
      (error) => {
        console.log("Error: " + error)
      });
  }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      country: ['', Validators.required],
      programName: ['', Validators.required],
      pledgeFundType: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      amount: ['', Validators.required],
      paymentPeriod: ['', Validators.required],
      installments: ['', Validators.required]
    });
    this.searchForm = this.formBuilder.group({
      pledgeId: [''],
      pledgeFundType: [''],
      startDate: [''],
      endDate: [''],
      programName: [''],
      paymentPeriod: [''],
      amount: [''],
      installments: [''],
    });
    this.pageload();
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    console.log("Table Data", this.pagedItems)
    this.dataSource = new MatTableDataSource(this.pagedItems);
    this.dataSource.sort = this.sort;
    this.changeDetectorRefs.detectChanges();
  }

  createPledge() {
    this.createPledgeClicked = true;
  }

  onCancel() {
    this.createPledgeClicked = false;
  }

  get f() {
    return this.registerForm.controls;
  }

  cancelPledge() {
    this.pageload();
    this.searchForm.reset();
  }

  searchPledge() {
    var searchFormData = this.searchForm.value;
    console.log("searchFormData", searchFormData)
    this.pledgeService.searchPledge(searchFormData).subscribe(response => {
      console.log("search", response, typeof (response));
      this.allItems = response;
      console.log(response)
      this.setPage(1);
    }, (err: HttpErrorResponse) => {
      this.dataSource = new MatTableDataSource(this.pagedItems);
    this.dataSource.sort = this.sort;
    this.changeDetectorRefs.detectChanges();
      console.log(err);
    });
  }

  onSubmit() {
    this.submitted = true;
    this.spinnerService.show();
    if (this.registerForm.invalid) {
      return;
    }

    var submitPledgeData = this.registerForm.value;
    this.pledgeService.submitPledge(submitPledgeData).subscribe(response => {
      console.log(response.toString());
      this.spinnerService.hide();
      const dialogRef = this.dialog.open(PledgeCreatedDialog, {
        data: response
      });
      dialogRef.afterClosed().subscribe(result => {
        this.createPledgeClicked = false;
        this.pageload();
        console.log('The dialog was closed');
      });
    }, (err: HttpErrorResponse) => {
      this.spinnerService.hide();
      const dialogRef = this.dialog.open(PledgeCreatedDialog, {
        data: err.message
      });
      dialogRef.afterClosed().subscribe(result => {
        this.createPledgeClicked = false;
        this.pageload();
        console.log('The dialog was closed');
      });
      console.log(err.message);
    });
    this.registerForm.reset();
  }
};

@Component({
  selector: 'pledgeCreated.component',
  templateUrl: 'pledgeCreated.component.html',
  styles:[

    `h1{background-color:#D9E9F5; border-bottom: 1px solid #2497F2 ;}
    
    p{font-style:Italic;font-style:bold;font-color:black} ;
    overflow:none;
  `
   ]
})
export class PledgeCreatedDialog {
  constructor(
    public dialogRef: MatDialogRef<PledgeCreatedDialog>,
    @Inject(MAT_DIALOG_DATA) public data) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick() {
    console.log("DATA", this.data);
    this.dialogRef.close();
  }
}
