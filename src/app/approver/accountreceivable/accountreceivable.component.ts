import { Component, OnInit, ViewChild,Inject, Input,ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { accountreceivableData } from 'src/app/models/accountreceivable.model';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTabGroup } from '@angular/material';
import { AccountreceivableService } from 'src/app/services/accountreceivable.service';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
import { PagerService } from 'src/app/services/pagerService.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { SortService } from 'src/app/services/sortService.service';
@Component({
  selector: 'app-accountreceivable',
  templateUrl: './accountreceivable.component.html',
  styleUrls: ['./accountreceivable.component.css']
})
export class AccountreceivableComponent implements OnInit {
  displayedColumns: string[] = ['pledgeId', 'pledgeType', 'donorName', 'country', 'amount', 'approver', 'startDate', 'endDate','action'];
  dataSource: MatTableDataSource<accountreceivableData>;
   selection = new SelectionModel<accountreceivableData>(true, []);
   isRowClicked : boolean = false;
   rowData;
   rowIndex;
   private allItems: any[];
   pager: any = {};
   pagedItems: any[];
 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() childMessage: boolean;
  initiateARForm: FormGroup;
  searchForm: FormGroup;
  key: string = 'pledgeId'; 
  order: boolean = false;

  constructor(private AccountreceivableService: AccountreceivableService,private changeDetectorRefs: ChangeDetectorRef,public dialog: MatDialog, private formBuilder: FormBuilder, private http: HttpClient, private msAdalSvc: MsAdalAngular6Service,private pagerService: PagerService,  private spinnerService: Ng4LoadingSpinnerService,
    private sortService: SortService) { }

  ngOnInit() {
    //this.dataSource.paginator = this.paginator;
    console.log("testing")
    this.pageLoad();
    this.searchForm = this.formBuilder.group({
      country:[''],
      pledgeFundType:[''],
      startDate:[''],
      endDate:[''],
      donorName:[''],
      pledgeId:['']
    }); 
      this.initiateARForm = this.formBuilder.group({
        pledgeId:[''],
        donorName:[''],
        country: [''],
        pledgeFundType:[''],
        accountNo: [''],
        bankName: [''],
        startDate: [''],
        endDate: [''],
        amount: [''],
        paymentPeriod: [''],
        installments: [''],
      });
  }

  tableSort(key) {
    this.key = key;
    this.order = !this.order;

    this.allItems = this.sortService.tableSort(this.key, this.order, this.allItems);
    this.setPage(1);
  }

  pageLoad() {
    this.spinnerService.show();
    this.AccountreceivableService.getAllAR().subscribe(
      (data) => {
        this.spinnerService.hide();
        this.allItems = data;
        this.tableSort('pledgeId');
       // this.setPage(1);
      },
      (error) => {
        console.log("Error: " + error)
      });
  }

  setPage(page: number) {
    console.log("In set page")
    if (page < 1 || page > this.pager.totalPages) {
      console.log("inside if")
      return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);
    console.log("this.pager", this.pager)

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    console.log("Table Data", this.pagedItems)
    this.dataSource = new MatTableDataSource(this.pagedItems);
    //this.dataSource.sort = this.sort;
    this.changeDetectorRefs.detectChanges();
  }
  selectRow(row, index){
    this.initiateARForm.reset();
    this.isRowClicked = true;
    this.rowData = row;
    this.rowIndex = index;
    console.log("row details", row, this.rowData, index)
  }

  cancelARSearch(){
    this.pageLoad();
  }

  onCancel(){
    
    this.isRowClicked = false;
    this.pageLoad();
  }

  searchAR(){
    var searchFormData = this.searchForm.value;
    console.log("search",searchFormData)
    this.AccountreceivableService.searchaccountReceivable(searchFormData).subscribe(response => {
      console.log("search", response, typeof (response));
      this.allItems = response;
      console.log(response)
      this.setPage(1);
    }, (err: HttpErrorResponse) => {
      console.log(err);
    });
  }

  onARSubmit(){
   var row = this.rowData;
   this.initiateARForm.value.pledgeId =row.pledgeId;
   this.initiateARForm.value.country =row.country;
   this.initiateARForm.value.amount =row.amount;
   this.initiateARForm.value.paymentPeriod =row.paymentPeriod;
   this.initiateARForm.value.installments = row.installments;
   this.initiateARForm.value.donorName = row.donorName;
   this.initiateARForm.value.pledgeFundType = row.pledgeFundType;
   this.initiateARForm.value.startDate =row.startDate;
   this.initiateARForm.value.endDate =row.endDate;
   this.initiateARForm.value.status = "active";
    console.log(this.initiateARForm);
    var myPostObject = this.initiateARForm.value;
    console.log("myPostObject", myPostObject, this.dataSource)
    this.spinnerService.show();
    this.AccountreceivableService.submitAccountReceivable(myPostObject).subscribe(response => {
        console.log("RES",response);
        if(response === "SUCCESS"){
          var dialogData = {
            "header": "Account Received", 
            "data":" Account receivable initiated successfully."
          }
        }
        if(response === "FAILURE"){
          var dialogData = {
            "header": "Account Receivable Failed", 
            "data":"Failed: Account receivable initiation failed."
          }
        }
        this.spinnerService.hide();
         const dialogRef = this.dialog.open(AccountReceivableDialog, {
          height: '210px',
        width: '330px',
          data: dialogData
        }); 
         dialogRef.afterClosed().subscribe(result => {
          this.pageLoad();
          this.isRowClicked = false;
          console.log('The dialog was closed');
        }); 
      }, (err: HttpErrorResponse) => {
        this.spinnerService.hide();
       const dialogRef = this.dialog.open(AccountReceivableDialog, {
        height: '210px',
        width: '330px',
        data: err.message
      }); 
       dialogRef.afterClosed().subscribe(result => {
        this.pageLoad();
        this.isRowClicked = false;
        console.log('The dialog was closed');
      }); 
      console.log(err.message);
      });
     
  }

}

@Component({
  selector: 'app-accountreceivabledialog',
  templateUrl: './accountreceivabledialog.component.html',
  styles:[

    
    `h1{background-color:#D9E9F5; border-bottom: 1px solid #2497F2 ;}
    
   
    overflow:none;

    .mat-dialog-container{
      padding: 0px !important;
  }
  `
   ]
})
export class AccountReceivableDialog {
  constructor(
    public dialogRef: MatDialogRef<AccountReceivableDialog>,
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