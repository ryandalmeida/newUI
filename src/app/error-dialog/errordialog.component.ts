import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
@Component({
  selector: 'app-root',
  templateUrl: './errordialog.component.html'
})
export class ErrorDialogComponent {
  title = 'Angular-Interceptor';
  constructor(@Inject(MAT_DIALOG_DATA) public data: string, public dialogRef: MatDialogRef<ErrorDialogComponent>,private MsadalSvc:MsAdalAngular6Service) {}
  onClick() {
    console.log("DATA", this.data);
    this.dialogRef.close();
   // this.MsadalSvc.logout();
  }

}
