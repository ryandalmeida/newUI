import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AuthTokenService } from 'src/app/services/authToken.service';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
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
  authtoken: string;
  role_Object;
  roleObject;
  constructor(
    public dialogRef: MatDialogRef<SuccessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private http: HttpClient,
    private authService: AuthTokenService,
    private authenticationService: MsAdalAngular6Service) {

      this.authService.getAuthToken().subscribe(response => {
        this.authtoken = response;
      });

      this.role_Object=sessionStorage.getItem('Role');
    this.roleObject=JSON.parse( this.role_Object);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  

  onClick() {
    if(((this.data.header).toString()).includes("Account Received")){
      this.http.get('http://10.103.42.177/pledge/updateAr', { headers: new HttpHeaders().set('Authorization', `Bearer ${this.authtoken}`).set('ROLES', `${this.roleObject}`).set('uniqueName',`${this.authenticationService.userInfo.profile.unique_name}`)});
    }
    this.dialogRef.close();
  }
}
