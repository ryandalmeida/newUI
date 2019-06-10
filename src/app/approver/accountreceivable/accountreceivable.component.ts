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
@Component({
  selector: 'app-accountreceivable',
  templateUrl: './accountreceivable.component.html',
  styleUrls: ['./accountreceivable.component.css']
})
export class AccountreceivableComponent implements OnInit {
  searchForm = new FormGroup({
    country: new FormControl(),
    ARFundType: new FormControl(),
    startDate: new FormControl(),
    endDate: new FormControl(),
    status: new FormControl(),
    donorName: new FormControl(),
    ar_no: new FormControl(),
    invoice_no: new FormControl()
  }); 


  displayedColumns: string[] = ['pledgeId', 'pledgeType', 'donorName', 'country', 'amount', 'approver', 'startDate', 'endDate','action'];
  dataSource: MatTableDataSource<accountreceivableData>;
   selection = new SelectionModel<accountreceivableData>(true, []);
   isRowClicked : boolean = false;
   rowData;
   private allItems: any[];
   pager: any = {};
   pagedItems: any[];
 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() childMessage: boolean;
  initiateARForm: FormGroup;
  //searchForm: FormGroup;
  
  constructor(private AccountreceivableService: AccountreceivableService,private changeDetectorRefs: ChangeDetectorRef,public dialog: MatDialog, private formBuilder: FormBuilder, private http: HttpClient, private msAdalSvc: MsAdalAngular6Service,private pagerService: PagerService,  private spinnerService: Ng4LoadingSpinnerService) { }


  ngOnInit() {
    //this.dataSource.paginator = this.paginator;
    console.log("testing")
    this.pageLoad();
    

      this.initiateARForm = this.formBuilder.group({
        pledgeId:[''],
        country: [''],
        accountNo: [''],
        bankName: [''],
        startDate: [''],
        endDate: [''],
        amount: [''],
        paymentPeriod: [''],
        installments: [''],
      });
  }


  pageLoad() {
    this.spinnerService.show();
    this.AccountreceivableService.getAllAR().subscribe(
      (data) => {
        this.spinnerService.hide();
        this.allItems = data;
        this.setPage(1);
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
    this.dataSource.sort = this.sort;
    this.changeDetectorRefs.detectChanges();
  }
  selectRow(row){
    this.isRowClicked = true;
    this.rowData = row;
    console.log("row details", row, this.rowData)
  }

  onCancel(){
    this.isRowClicked = false;
  }

  onARSubmit(){
    //this.rowData
   // this.rowData.comments = "test";
   var row = this.rowData;
   this.initiateARForm.value.pledgeId =row.pledgeId;
   this.initiateARForm.value.country =row.country;
   this.initiateARForm.value.amount =row.amount;
   //this.initiateARForm.value.accNo =row.accNo;
   //this.initiateARForm.value.bankName =row.bankName;
   this.initiateARForm.value.paymentPeriod =row.paymentPeriod;
   this.initiateARForm.value.installments = row.installments;
   //this.initiateARForm.value.installmentsDue = 4;
   //this.initiateARForm.value.status =null;
   //this.initiateARForm.value.approver = null;
   //this.initiateARForm.value.donorId = null;
   this.initiateARForm.value.donorName = row.donorName;
   //this.initiateARForm.value.noOfPayment =row.installments;
   this.initiateARForm.value.startDate =row.startDate;
   this.initiateARForm.value.endDate =row.endDate;
    console.log(this.initiateARForm);
    var myPostObject = this.initiateARForm.value;
    console.log("myPostObject", myPostObject)

    this.AccountreceivableService.submitAccountReceivable(myPostObject).subscribe(response => {
     
        console.log(response);
        const dialogRef = this.dialog.open(AccountReceivableDialog, {
          data: response
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
      }, (err: HttpErrorResponse) => {
        console.log(err);
      });
      this.initiateARForm.reset();
  }


    /** Whether the number of selected elements matches the total number of rows. */
    // isAllSelected() {
    //   const numSelected = this.selection.selected.length;
    //   const numRows = this.dataSource.data.length;
    //   return numSelected === numRows;
    // }
  
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    // masterToggle() {
    //   debugger;
    //   this.isAllSelected() ?
    //       this.selection.clear() :
    //       this.dataSource.data.forEach(row => {
    //         console.log("row",row)
    //         this.selection.select(row)
    //       });
    // }
  
    /** The label for the checkbox on the passed row */
    // checkboxLabel(row): string {
    //   if (!row) {
    //     return `{this.isAllSelected() ? 'select' : 'deselect'} all`;
    //   }
    //   return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.ARId + 1}`;
    // }
  
}

@Component({
  selector: 'app-accountreceivabledialog',
  templateUrl: './accountreceivabledialog.component.html',
   styleUrls: ['./accountreceivable.component.css']
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