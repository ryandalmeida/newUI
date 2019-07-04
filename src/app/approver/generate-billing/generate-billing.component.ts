
import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { MatPaginator, MatSort, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { BillingService } from '../../services/billing.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { DataSource } from '@angular/cdk/collections';
//import { Adal6Service } from 'adal-angular6';
import { Billing } from 'src/app/models/billing.model';
import { PagerService } from 'src/app/services/pagerService.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { SortService } from 'src/app/services/sortService.service';

@Component({
  selector: 'app-generate-billing',
  templateUrl: './generate-billing.component.html',
  styleUrls: ['./generate-billing.component.css']
})
export class GenerateBillingComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  displayedColumns: string[] = ['select', 'pledgeId','pledgeFundType','amount', 'donorName', 'ar_id','debit', 'country', 'installment_no', 'startDate', 'endDate', 'status'];
  dataSource: MatTableDataSource<Billing>;
  selection = new SelectionModel<Billing>(true, []);
  createPledgeClicked: boolean = false;
  billdata;
  checkedRows;
  private allItems: any[];
  pagedItems: any[];
  checkedRowsObject;
  pager: any = {};
  key: string = 'pledgeId'; 
  order: boolean = false;

   checkedArray: any[]=[];
   isRowClicked:boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() childMessage: boolean;
  @ViewChild(MatSort) sort: MatSort;
  searchForm: FormGroup;
  constructor(private billingService: BillingService, private http: HttpClient, private formBuilder: FormBuilder, public dialog: MatDialog,private pagerService: PagerService, private spinnerService: Ng4LoadingSpinnerService,
    private sortService: SortService) { }

  ngOnInit() {
    console.log("childmsg dashboard", this.childMessage);
    this.pageload();   
    this.searchForm = this.formBuilder.group({
      country: [''],
      pledgeFundType: [''],
      startDate: [''],
      endDate: [''],
      status: [''],
      donorName: [''],
      pledgeId: [''],
      invoice_no: ['']
    }); 
  }

  pageload(){
    this.spinnerService.show();
    this.billingService.getAllAR().subscribe(
      (data) => {
        this.spinnerService.hide();
        this.allItems = data;
        this.tableSort('pledgeId');
        //this.setPage(1);
      },

      (error) => {
        console.log("Error: " + error)
      });
  }

  tableSort(key) {
    this.key = key;
    this.order = !this.order;

    this.allItems = this.sortService.tableSort(this.key, this.order, this.allItems);
    this.setPage(1);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
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
  // this.changeDetectorRefs.detectChanges();
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    debugger;
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => {
        console.log("row", row)
        this.selection.select(row)
      });
  }
  checkboxLabel(row): string {

    if (!row) {
      return `{this.isAllSelected() ? 'select' : 'deselect'} all`;

    }
    this.billdata = JSON.stringify(row);
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.ARId + 1}`;

  }

  store() {
    setTimeout(() => {

      console.log("unselectedRows: ", this.selection.selected);
      this.checkedRows = this.selection.selected;
    }

    )
  }


  generateBilling() {
    
    
console.log("checked rows"+this.checkedRows);
console.log("length"+this.checkedRows.length);

    for (var i = 0; i < ((this.checkedRows).length); i++) {
      var myObject = {
        "arId": null,
        "pledgeId": null,
        "donorName": null,
        "country": null,
        "debit": null,
        "installmentNo": null,
        "startDate": null,
        "endDate": null,
        "pledgeFundType":null,
        "creditAmount":null,
        "status":null
      }
      myObject.pledgeId = this.checkedRows[i]["pledgeId"];
      myObject.arId = this.checkedRows[i]["arId"];
      myObject.country = this.checkedRows[i]["country"];
      myObject.debit = this.checkedRows[i]["debit"];
      myObject.creditAmount = this.checkedRows[i]["amount"];
      myObject.installmentNo = this.checkedRows[i]["installmentNo"];
      myObject.startDate = this.checkedRows[i]["startDate"];
      myObject.endDate = this.checkedRows[i]["endDate"];
      myObject.donorName = this.checkedRows[i]["donorName"];
      myObject.pledgeFundType = this.checkedRows[i]["pledgeFundType"]
      myObject.status = "Bill Generated"
      this.checkedArray.push(myObject)
      console.log("this.checkedRows", this.checkedRows[i]["amount"])
      console.log("amount", myObject.creditAmount)
      console.log("myoobject", myObject)
      
    }
    console.log("array",this.checkedArray)

      let options = {
        //headers: new HttpHeaders().set('Authorization', `${this.adalSvc.userInfo.token}`)
      };

      this.spinnerService.show();
      this.http.post('https://5ufe1v6q92.execute-api.us-east-1.amazonaws.com/test/tasktokenpoller', this.checkedArray, { headers: new HttpHeaders().set('aws-auth', 'true') })
        .subscribe(response => {
          console.log(response);
          if(response === "SUCCESS"){
            var dialogData = {
              "header": "Bill Generated", 
              "data":" Bill generated successfully."
            }
          }
          if(response === "FAILURE"){
            var dialogData = {
              "header": "Bill Failed", 
              "data":"Failed: Bill generation failed."
            }
          }
          this.spinnerService.hide();
          const dialogRef = this.dialog.open(BillCreatedDialog, {
            height: '195px',
            width: '325px',
            data: dialogData
          });
          dialogRef.afterClosed().subscribe(result => {
            this.pageload();
            console.log('The dialog was closed');
          });
        },(err: HttpErrorResponse) => {
          this.spinnerService.hide();
          const dialogRef = this.dialog.open(BillCreatedDialog, {
            height: '195px',
            width: '325px',
            data: err.message
          });
          dialogRef.afterClosed().subscribe(result => {
            this.pageload();
            console.log('The dialog was closed');
          });
          console.log(err);
        });
       
}

searchBilling() {
  var searchFormData = this.searchForm.value;
  this.billingService.search(searchFormData).subscribe(response => {
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
  selector: 'generateBilling.component',
  templateUrl: 'billCreated.component.html',
})
export class BillCreatedDialog {
  constructor(
    public dialogRef: MatDialogRef<BillCreatedDialog>,
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
