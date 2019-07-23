import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
@Component({
  selector: 'successDialog.component',
  templateUrl: 'successDialog.component.html',
  styles: [
    `h1{background-color:#D9E9F5; border-bottom: 1px solid #2497F2 ;}
    overflow:none;
    .mat-dialog-container{
      padding: 0px !important;
     }
  `
  ]
})
export class SuccessDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SuccessDialogComponent>,
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
