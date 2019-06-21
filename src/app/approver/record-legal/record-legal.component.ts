import { Component, OnInit, ViewChild, Input, Inject, Output, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LegalData } from 'src/app/models/legal.model';
import { LegalService } from 'src/app/services/legal.service';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTabGroup } from '@angular/material';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

import { environment } from 'src/environments/environment';
import { PledgeData } from 'src/app/models/pledge.model';
import { PagerService } from 'src/app/services/pagerService.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-record-legal',
  templateUrl: './record-legal.component.html',
  styleUrls: ['./record-legal.component.css']
})
export class RecordLegalComponent implements OnInit {
  searchForm = new FormGroup({
    /*    country: new FormControl(),
       pledgeFundType: new FormControl(),
       startDate: new FormControl(),
       endDate: new FormControl(),
       status: new FormControl(),
       donorName: new FormControl(),
       pledgeId: new FormControl(),
       donorSign: new FormControl(),
       wbgBusinessUserSign: new FormControl() */

    pledgeNo: new FormControl(),
    pledgeFundType: new FormControl(),
    startDate: new FormControl(),
    endDate: new FormControl(),
    programName: new FormControl(),
    paymentPeriod: new FormControl(),
    amount: new FormControl(),
    installments: new FormControl()

  });


  submitted = false;
  wbgBusinessUserSign: SignaturePad;
  displayedColumns: string[] = ['pledgeId', 'wbgProgram', 'pledgeType', 'donorName', 'country', 'amount', 'approver', 'startDate', 'endDate', 'status', 'recordlegalBtn',];
  dataSource: MatTableDataSource<PledgeData>;
  selection = new SelectionModel<LegalData>(true, []);
  isRowClicked: boolean = false;
  rowData;
  signImage;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  @Input() childMessage: boolean;
  recordLegalForm: FormGroup;
  authToken;
  private allItems: any[];
  pager: any = {};
  pagedItems: any[];

  constructor( private legalService: LegalService,public dialog: MatDialog, private formBuilder: FormBuilder, private pagerService: PagerService, private changeDetectorRefs: ChangeDetectorRef, private spinnerService: Ng4LoadingSpinnerService) { }

  pageload() {
    this.spinnerService.show();
    this.legalService.getAllLegalRecordedbyDonor().subscribe(
      (data) => {
        this.spinnerService.hide();
        this.allItems = data;
        this.setPage(1);
      },
      (error) => {
        console.log("Error: " + error)
      });
  }
  ngOnInit() {
    this.recordLegalForm = this.formBuilder.group({
      pledgeId: [''],
      donorName: [''],
      wbg_program: [''],
      country: [''],
      pledgeFundType: [''],
      startDate: [''],
      endDate: [''],
      amount: [''],
      paymentPeriod: [''],
      noOfPayment: [''],
      donorSign: [''],
      wbgBusinessUserSign: ['', Validators.required]
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

  selectRow(row) {
    this.isRowClicked = true;
    this.rowData = row;
    console.log("row details", row, this.rowData)

    var legalFormData = this.rowData;
console.log("legalFormData",legalFormData)
    this.legalService.getSign(legalFormData).subscribe(response => {
      console.log(response);
       this.signImage = JSON.stringify(response).substr(2).slice(0, -2);
      console.log(this.signImage); 

    }, (err: HttpErrorResponse) => {
   console.log("err",err)
    }
    )
  };

  onCancel() {
    this.isRowClicked = false;
    this.pageload();
  }

  selectRowBtn() {
    console.log("row details-BTN", this.rowData)
  }


  onLegalSubmit(row) {
    this.spinnerService.show();
    this.isRowClicked = true;
    this.rowData = row;
    this.recordLegalForm.value.pledgeId = row.pledgeId;
    this.recordLegalForm.value.wbgBusinessUserSign = this.signaturePad.toDataURL();
    this.recordLegalForm.value.status = "Legal Recorded by WBG User";
    if ((this.signaturePad.toDataURL().length) > 1600) {
      var legalFormData = this.recordLegalForm.value;
      this.legalService.onLegalSubmitWBGUser(legalFormData).subscribe(response => {
        console.log("response", response);
        if(response === "SUCCESS"){
          var dialogData = "Success:Legal document signed by business user successfully."
        }
        if(response === "FAILURE"){
          var dialogData = "Failed:Legal document creation by business user failed."
        }
        this.spinnerService.hide();
        const dialogRef = this.dialog.open(LegalCreatedDialog, {
          height: '250px',
          width: '350px',
          data: dialogData
        });
        dialogRef.afterClosed().subscribe(result => {
          this.isRowClicked = false;
          this.pageload();
          console.log('The dialog was closed');
        });
      }, (err: HttpErrorResponse) => {
        console.log(err);
        this.spinnerService.hide();
        const dialogRef = this.dialog.open(LegalCreatedDialog, {
          height: '250px',
          width: '350px',
          data: err.message
        });
        dialogRef.afterClosed().subscribe(result => {
          this.isRowClicked = false;
          this.pageload();
          console.log('The dialog was closed');
        });
      });
      this.recordLegalForm.reset();
      this.signaturePad.clear();
    }
    else {
      const dialogRef = this.dialog.open(LegalCreatedDialog, {
        data: 'Please sign the legal agreement'
      });
      this.signaturePad.clear();
    }
  }

  cancelLegal() {
    this.pageload();
    this.searchForm.reset();
  }

  searchLegal() {
    var searchFormData = this.searchForm.value;
    this.legalService.search(searchFormData).subscribe(response => {
      console.log("search", response, typeof (response));
      this.allItems = response;
      console.log(response)
      this.setPage(1);
    }, (err: HttpErrorResponse) => {
      console.log(err);
    });
  }

}

@Component({
  selector: 'recordLegal.component',
  templateUrl: 'recordLegaldialog.component.html',
  styles:[

    `h1{background-color:#D9E9F5; border-bottom: 1px solid #2497F2 ;}
    
    p{font-style:Italic;font-style:bold;font-color:black} ;
    overflow:none;
  `
   ]
})
export class LegalCreatedDialog {
  constructor(
    public dialogRef: MatDialogRef<LegalCreatedDialog>,
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
