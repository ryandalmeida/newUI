import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { UserRoleData } from '../models/user.model';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';

@Injectable()
export class UserRoleService {
  userRole: any[] = [];
  userRoleResponse: any;
  constructor(private http: HttpClient, private msAdalSvc: MsAdalAngular6Service) { }

  getRole() {
    var myObject = {
      "emailId": this.msAdalSvc.LoggedInUserEmail
    };

    return new Promise((resolve, reject) => {
      //https://5ufe1v6q92.execute-api.us-east-1.amazonaws.com/test/role-searchuserrole
      this.http.post<any>('http://10.177.197.134:9090/userRole/searchUserRole', myObject, { headers: new HttpHeaders().set('Azure-Auth', 'true') })
        .subscribe(response => {
          console.log("RWs", response)
          this.userRoleResponse = response;
          if (response.role != undefined) {
            for (var i = 0; i < response.role.length; i++) {
              this.userRole.push(response.role[i]);
            }
            resolve(this.userRole);
            console.log("this.userRole", this.userRole);
          } else {
            console.log("this.userRole");
           // this.msAdalSvc.logout();
          }
        });
    });

  }
  searchUserRole(myPostObject) {
    return this.http.post<any>('http://localhost:8000/userRole/searchUserName', myPostObject, { headers: new HttpHeaders().set('Azure-Auth', 'true') })
  }

  updateUserRole(): Observable<UserRoleData[]> {
    return this.http.get<UserRoleData[]>('http://localhost:8000/userRole/updateUserRole');
  }
  
  searchUserName(emailId){
    return this.http.post<any>('http://10.177.197.134:9090/userRole/searchUserName', emailId)
  } 
 

}



