import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserRoleService {
  userRole: any[] = [];
  userRoleResponse: any;
  roles:string;
  public url: string = environment.userRoleServiceURL;
  public headers = environment.headers;
  constructor(private http: HttpClient, private msAdalSvc: MsAdalAngular6Service) { }

   getRole() {
    
    var myObject = {
      "emailId": this.msAdalSvc.LoggedInUserEmail
    };

    return new Promise((resolve, reject) => {
      this.http.post<any>(this.url+'/userRole/searchUserRole', myObject, this.headers)
        .subscribe(response => {
          this.userRole=[];
          this.userRoleResponse = response;
          if (response.role != undefined) {
            for (var i = 0; i < response.role.length; i++) {
              this.userRole.push(response.role[i]);
            }
            resolve(this.userRole);
            this.roles=JSON.stringify(this.userRole);
            localStorage.setItem('Role',this.roles );
          }
        });
    });

  }
  searchUserRole(postObject) {
    return this.http.post<any>(this.url+'/userRole/searchUserName', postObject, this.headers)
  }

  updateUserRole(postObject) :Observable<Object> {
    return this.http.post(this.url+'/userRole/updateUserRole', postObject,  this.headers);
  }
  
  
  searchUserName(emailId){
    return this.http.post<any>(this.url+'/userRole/searchUserName', emailId, this.headers)
  } 
  

}



