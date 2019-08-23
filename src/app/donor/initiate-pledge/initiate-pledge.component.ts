import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTabGroup, MatTableDataSource } from '@angular/material';
import { Adal6Service } from 'adal-angular6';

@Component({
  selector: 'app-initiate-pledge',
  templateUrl: './initiate-pledge.component.html',
  styleUrls: ['./initiate-pledge.component.css']
})
export class InitiatePledgeComponent implements OnInit {
  exampleForm = new FormGroup({
    country: new FormControl(),
    wbg_program: new FormControl(),
    pledgeFundType: new FormControl(),
    startDate: new FormControl(),
    endDate: new FormControl(),
    amount: new FormControl(['', Validators.required]),
    paymentPeriod: new FormControl(),
    noOfPayment: new FormControl(),
  });

  registerForm: FormGroup;
  submitted = false;



  constructor(private http: HttpClient, public dialog: MatDialog, private formBuilder: FormBuilder, private adalSvc: Adal6Service) { }

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
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    console.log(this.registerForm.value);

    var postObject = this.registerForm.value;
    let options = {
      headers: new HttpHeaders().set('Authorization', `${this.adalSvc.userInfo.token}`),
  
         };

    console.log("headers:", this.adalSvc.userInfo.token, postObject)
   /*  https://5ufe1v6q92.execute-api.us-east-1.amazonaws.com/test/initiator-lambda */
    this.http.post('https://5ufe1v6q92.execute-api.us-east-1.amazonaws.com/test/initiator-lambda',postObject,  options)
      .subscribe(response => {
        console.log("response",response);
        const dialogRef = this.dialog.open(PledgeCreatedDialog, {
          data: response
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
      }, (err: HttpErrorResponse) => {
        console.log(err);
      });

    this.registerForm.reset();
  }
}

@Component({
  selector: 'pledgeCreated.component',
  templateUrl: 'pledgeCreated.component.html',
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
