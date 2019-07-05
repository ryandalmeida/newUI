import { Component, OnInit, ViewChild, Input, Inject, Output, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LegalData } from 'src/app/models/legal.model';
import { LegalService } from 'src/app/services/legal.service';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTabGroup } from '@angular/material';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
// import { Adal6Service } from 'adal-angular6';
import { PledgeData } from 'src/app/models/pledge.model';
import { PagerService } from 'src/app/services/pagerService.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { SortService } from 'src/app/services/sortService.service';
@Component({
  selector: 'app-record-legal-donor',
  templateUrl: './record-legal-donor.component.html',
  styleUrls: ['./record-legal-donor.component.css']
})
export class RecordLegalComponentDonor implements OnInit {
  submitted = false;
  wbgBusinessUserSign: SignaturePad;
  displayedColumns: string[] = ['pledgeId', 'wbgProgram', 'pledgeType', 'donorName', 'country', 'amount', 'approver', 'startDate', 'endDate', 'status', 'recordlegalBtn',];
  dataSource: MatTableDataSource<PledgeData>;
  selection = new SelectionModel<LegalData>(true, []);
  isRowClicked: boolean = false;
  rowData;
 

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  @Input() childMessage: boolean;
  recordLegalForm: FormGroup;
  searchForm: FormGroup;
  private allItems: any[];
  pager: any = {};
  pagedItems: any[];
  key: string = 'pledgeId'; 
  order: boolean = false;

  constructor( private legalService: LegalService,public dialog: MatDialog, private formBuilder: FormBuilder, private http: HttpClient,  private pagerService : PagerService, private changeDetectorRefs: ChangeDetectorRef, private spinnerService: Ng4LoadingSpinnerService,
    private sortService: SortService) { }

pageload(){
  this.spinnerService.show();
  this.searchForm = this.formBuilder.group({
    pledgeId: [''],
    pledgeFundType: [''],
    startDate: [''],
    endDate: [''],
    programName: [''],
    paymentPeriod: [''],
    amount: [''],
    installments:['']

  });

  this.legalService.getAllLegalrecords().subscribe(
    (data) => {
      this.spinnerService.hide();
      this.allItems = data;
      this.tableSort('pledgeId');
     // this.setPage(1);
    },
    (error) => {
      console.log("Error: " + error)
    });

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
    donorSign: ['',Validators.required],
    wbgBusinessUserSign: ['']
  });
}
  ngOnInit() {
    console.log("childmsg legal", this.childMessage);
   this.pageload(); 
  }

  tableSort(key) {
    this.key = key;
    this.order = !this.order;

    this.allItems = this.sortService.tableSort(this.key, this.order, this.allItems);
    this.setPage(1);
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
    //this.dataSource.sort = this.sort;
    this.changeDetectorRefs.detectChanges();
}


  selectRow(row) {
    this.recordLegalForm.reset();
   // this.signaturePad.clear();  
    this.isRowClicked = true;
    this.rowData = row;
    console.log("row details", row, this.rowData);
   }
      
  onCancel() {
    this.isRowClicked = false;
    this.pageload();
  }

  selectRowBtn() {
   	console.log("row details-BTN", this.rowData)
    console.log("1")
  }

  onLegalSubmit(row) {
    this.isRowClicked = true;
    this.rowData = row;
    this.spinnerService.show();
    console.log("legal submit clicked", row);
    this.recordLegalForm.value.pledgeId = row.pledgeId;
    this.recordLegalForm.value.donorName = row.donorName;
    this.recordLegalForm.value.status = "Legal Recorded by Donor";
    this.recordLegalForm.value.donorSign = this.signaturePad.toDataURL();
    if((this.signaturePad.toDataURL().length)>1600){
    var legalFormData = this.recordLegalForm.value;
    this.legalService.onLegalSubmitDonor (legalFormData) 
    .subscribe(response => {
        console.log(response);
        if(response === "SUCCESS"){
          var dialogData = {
            "header": "Legal Document Signed", 
            "data":" Legal document signed by donor successfully."
          }
        }
        if(response === "FAILURE"){
          var dialogData = {
            "header": "Legal Document Failed", 
            "data":"Failed: Legal document creation by donor failed."
          }
        }
        this.spinnerService.hide();
        const dialogRef = this.dialog.open(LegalCreatedDialogDonor, {
          height: '210px',
        width: '330px',
          data: dialogData
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          this.isRowClicked = false;
    	  this.pageload();
        }); 
      }, (err: HttpErrorResponse) => {
        this.spinnerService.hide();
      const dialogRef = this.dialog.open(LegalCreatedDialogDonor, {
        height: '210px',
        width: '330px',
        data: err.message
      });
      dialogRef.afterClosed().subscribe(result => {
        this.isRowClicked = false;
        console.log('The dialog was closed');
      });
        console.log(err);
        this.isRowClicked = false;
    this.pageload();
      });
    
   
  }
  else{
    const dialogRef = this.dialog.open(LegalCreatedDialogDonor, {
      data: 'Please sign the legal agreement'
    });

    this.signaturePad.clear();
  }
}

cancelLegal() {
  this.pageload();
  //this.searchForm.reset();
}

searchLegal() {
  var searchFormData = this.searchForm.value;
  console.log("inside legal search",searchFormData);
  console.log("inside legal search",this.searchForm.value);
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
  templateUrl: 'recordLegaldialog-donor.component.html',
  styles:[

   
    `h1{background-color:#D9E9F5; border-bottom: 1px solid #2497F2 ;}
    
   
    overflow:none;

    .mat-dialog-container{
      padding: 0px !important;
  }
  `
   ]
})
export class LegalCreatedDialogDonor {
  constructor(
    public dialogRef: MatDialogRef<LegalCreatedDialogDonor>,
    @Inject(MAT_DIALOG_DATA) public data) {
  }
  onClick() {
    console.log("DATA", this.data);
    this.dialogRef.close();

    
  }
}








