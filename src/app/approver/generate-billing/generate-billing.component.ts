
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

@Component({
  selector: 'app-generate-billing',
  templateUrl: './generate-billing.component.html',
  styleUrls: ['./generate-billing.component.css']
})
export class GenerateBillingComponent implements OnInit {
  searchForm = new FormGroup({
    pledgeNo: new FormControl(),
    startDate: new FormControl(),
    endDate: new FormControl(),
    amount: new FormControl(),
    
    ar_id: new FormControl(),
   donorName: new FormControl(),
    country: new FormControl(),
    pledgeFundType: new FormControl(),
    status: new FormControl()
  });
  registerForm: FormGroup;
  submitted = false;
  displayedColumns: string[] = ['select', 'pledgeId', 'donorName', 'ar_id', 'amount', 'debit', 'country', 'installment_no', 'startDate', 'endDate', 'status'];
  dataSource: MatTableDataSource<Billing>;
  selection = new SelectionModel<Billing>(true, []);
  createPledgeClicked: boolean = false;
  billdata;
  checkedRows;
   checkedArray: any[]=[];
   isRowClicked:boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() childMessage: boolean;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private billingService: BillingService, private http: HttpClient, private formBuilder: FormBuilder, public dialog: MatDialog) { }

  ngOnInit() {

    console.log("childmsg dashboard", this.childMessage);
    this.billingService.getAllAR().subscribe(
      (data) => {
        console.log(JSON.stringify(data));

        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },

      (error) => {
        console.log("Error: " + error)
      });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
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
        "endDate": null
      }
      myObject.pledgeId = this.checkedRows[i]["pledgeId"];
      myObject.arId = this.checkedRows[i]["arId"];
      myObject.country = this.checkedRows[i]["country"];
      myObject.debit = this.checkedRows[i]["debit"];
      myObject.installmentNo = this.checkedRows[i]["installmentNo"];
      myObject.startDate = this.checkedRows[i]["startDate"];
      myObject.endDate = this.checkedRows[i]["endDate"];
      myObject.donorName = this.checkedRows[i]["donorName"]
      this.checkedArray.push(myObject)
    
      console.log("pledge id",this.checkedRows[i]["pledgeId"])


      console.log("myobject pledgeid",myObject.pledgeId)
      console.log("myoobject", myObject)
      
    }
    console.log("array",this.checkedArray)

      let options = {
        //headers: new HttpHeaders().set('Authorization', `${this.adalSvc.userInfo.token}`)
      };


      this.http.post('http://10.103.42.177:8082/generateBillandInvoice/generateBill', this.checkedArray, { responseType: 'text' })
        .subscribe(response => {
          console.log(response);

          const dialogRef = this.dialog.open(BillCreatedDialog, {
            data: response
          
          });

          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');

           // this.isRowClicked = false;
            this.ngOnInit();
          });
        }, (err: HttpErrorResponse) => {
          console.log(Response);
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
