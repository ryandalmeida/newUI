import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PledgeData } from 'src/app/models/pledge.model';
import { PledgeService } from 'src/app/services/pledge.service';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Adal6Service } from 'adal-angular6';


@Component({
  selector: 'app-approve-pledge',
  templateUrl: './approve-pledge.component.html',
  styleUrls: ['./approve-pledge.component.css']
})
export class ApprovePledgeComponent implements OnInit {
  searchForm = new FormGroup({
    country: new FormControl(),
    pledgeFundType: new FormControl(),
    startDate: new FormControl(),
    endDate: new FormControl(),
    status: new FormControl(),
    donorName: new FormControl(),
    ar_no: new FormControl(),
    invoice_no: new FormControl()
  });

  /*  approvePledgeForm = new FormGroup({
     donorName: new FormControl(''),
     wbg_program: new FormControl(''),
     country: new FormControl(''),
     pledgeFundType: new FormControl(''),
     startDate: new FormControl(''),
     endDate: new FormControl(''),
     amount: new FormControl(''),
     paymentPeriod: new FormControl(''),
     noOfPayment: new FormControl(''),
     comments: new FormControl('')
   }); */


  displayedColumns: string[] = ['select', 'pledgeId', 'wbgProgram', 'pledgeType', 'donorName', 'country', 'amount', 'approver', 'startDate', 'endDate', 'status'];
  dataSource: MatTableDataSource<PledgeData>;
  selection = new SelectionModel<PledgeData>(true, []);
  isRowClicked: boolean = false;
  rowData;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() childMessage: boolean;
  approvePledgeForm: FormGroup;
  checkedRowsObject;


  constructor(private pledgeService: PledgeService, private formBuilder: FormBuilder, private http: HttpClient, private adalSvc: Adal6Service) { }

  ngOnInit() {
    //this.dataSource.paginator = this.paginator;
    console.log("testing")
    this.pledgeService.getAllPledge().subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.log("Error: " , error)
      });

    this.approvePledgeForm = this.formBuilder.group({
      donorName: [''],
      wbg_program: [''],
      country: [''],
      pledgeFundType: [''],
      startDate: [''],
      endDate: [''],
      amount: [''],
      paymentPeriod: [''],
      noOfPayment: [''],
      comments: ['']
    });
  }

  selectRow(row) {
    this.isRowClicked = true;
    this.rowData = row;
    console.log("row details", row, this.rowData)
  }

  onCancel() {
    this.isRowClicked = false;
  }

  onRevise() {
    //this.rowData
    // this.rowData.comments = "test";
    // this.rowData = row;
    console.log(this.approvePledgeForm);
    var myPostObject = this.approvePledgeForm.value;
    console.log("myPostObject", myPostObject)

    /* this.http.post("http://10.103.42.177:8080/pledge/submit", myPostObject, { responseType: 'text' })
      .subscribe(response => {
        console.log(response);
        const dialogRef = this.dialog.open(PledgeCreatedDialog, {
          data: response
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
      }, (err: HttpErrorResponse) => {
        console.log(err);
      });
 */
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

  /** The label for the checkbox on the passed row */
  checkboxLabel(row): string {
    if (!row) {
      return `{this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.pledgeId + 1}`;
  }

  store() {
    setTimeout(() => {
      //this.unselectedRows = this.selection.selected;
      console.log("unselectedRows: ", this.selection.selected);
      this.checkedRowsObject = this.selection.selected;
     
    });
  }

  approvePledge(){
    let options = {
      headers: new HttpHeaders().set('Authorization',`${this.adalSvc.userInfo.token}`)
    };
    console.log("checkedRowsObject: ", Object.assign({},this.selection.selected), this.selection.selected, this.adalSvc.userInfo.token);
     /* "http://10.103.42.177:8080/pledge/approve" , tasktokenpoller*/
        //'https://5ufe1v6q92.execute-api.us-east-1.amazonaws.com/test/pledge-approve', this.checkedRowsObject, options)
     this.http.post( 'https://5ufe1v6q92.execute-api.us-east-1.amazonaws.com/test/tasktokenpoller', this.checkedRowsObject, options)
     .subscribe(response => {
       console.log(response);
     }, (err: HttpErrorResponse) => {
       console.log(err);
     });

  }
}
