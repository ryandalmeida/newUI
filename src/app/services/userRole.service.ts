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
  public headers = environment.headers;
  constructor(private http: HttpClient, private msAdalSvc: MsAdalAngular6Service) { }

   getRole() {
    var myObject = {
      "emailId": this.msAdalSvc.LoggedInUserEmail
    };

    return new Promise((resolve, reject) => {
      this.http.post<any>('https://wbgeabpmservicesprem.worldbankgroup.org:9090/userRole/searchUserRole', myObject, this.headers)
        .subscribe(response => {
          this.userRoleResponse = response;
          if (response.role != undefined) {
            for (var i = 0; i < response.role.length; i++) {
              this.userRole.push(response.role[i]);
            }
            resolve(this.userRole);
          }
        });
    });

  }
  searchUserRole(myPostObject) {
    return this.http.post<any>('https://wbgeabpmservicesprem.worldbankgroup.org:9090/userRole/searchUserName', myPostObject, this.headers)
  }

  updateUserRole(myPostObject) :Observable<Object> {
    return this.http.post('https://wbgeabpmservicesprem.worldbankgroup.org:9090/userRole/updateUserRole', myPostObject,  this.headers);
  }
  
  
  searchUserName(emailId){
    return this.http.post<any>('https://wbgeabpmservicesprem.worldbankgroup.org:9090/userRole/searchUserName', emailId, this.headers)
  } 
  

}



