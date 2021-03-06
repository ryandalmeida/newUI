import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
import { environment } from 'src/environments/environment.prod';
import { AuthTokenService } from './authToken.service';

@Injectable()
export class UserRoleService {
  userRole: any[] = [];
  userRoleResponse: any;
  roles:string;
  public url: string = environment.userRoleServiceURL;
  public headers = environment.headers;
  authtoken: string;
  roleObject;
  role_Object;
  constructor(private http: HttpClient, private msAdalSvc: MsAdalAngular6Service, private authenticationService: MsAdalAngular6Service,  private authService: AuthTokenService,) {
    this.authService.getAuthToken().subscribe(response => {
      this.authtoken = response;
    });
   }

   getRole() {
    
    var myObject = {
      "emailId": this.msAdalSvc.LoggedInUserEmail
    };
    return new Promise((resolve, reject) => {
      
      this.http.post<any>(this.url+'/userRole/searchUserRole', myObject,{ headers: new HttpHeaders().set('Authorization', `Bearer ${this.authtoken}`).set('ROLES', 'DONOR,APPROVER,TREASURY,ADMIN').set('uniqueName','WBG') })
        .subscribe(response => {
          this.userRole=[];
          this.userRoleResponse = response;
          if (response.role != undefined) {
            for (var i = 0; i < response.role.length; i++) {
              this.userRole.push(response.role[i]);
            }
            resolve(this.userRole);
            this.roles=JSON.stringify(this.userRole);
            sessionStorage.setItem('Role',this.roles );
          }
        });
    });

  }
  searchUserRole(postObject) {
    return this.http.post<any>(this.url+'/userRole/searchUserName', postObject, this.headers)
  }

  updateUserRole(postObject) :Observable<Object> {
    this.role_Object=sessionStorage.getItem('Role');
    this.roleObject=JSON.parse( this.role_Object);
    return this.http.post(this.url+'/userRole/updateUserRole', postObject,  { headers: new HttpHeaders().set('Authorization', `Bearer ${this.authtoken}`).set('ROLES', `${this.roleObject}`).set('uniqueName',`${this.authenticationService.userInfo.profile.unique_name}`)});
  }
  
  
  searchUserName(emailId){
    return this.http.post<any>(this.url+'/userRole/searchUserName', emailId, { headers: new HttpHeaders().set('Authorization', `Bearer ${this.authtoken}`).set('ROLES', 'DONOR,APPROVER,TREASURY,ADMIN').set('uniqueName','WBG') })
  } 
  

}



