import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { UserRoleData } from '../models/user.model';
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
      this.http.post<any>('https://10.177.197.134:9090/userRole/searchUserRole', myObject, this.headers)
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
    return this.http.post<any>('http://10.177.197.134:9090/userRole/searchUserName', myPostObject, { headers: new HttpHeaders().set('Azure-Auth', 'true') })
  }

  updateUserRole(): Observable<UserRoleData[]> {
    return this.http.get<UserRoleData[]>('http://10.177.197.134:9090/userRole/updateUserRole');
  }
  
  searchUserName(emailId){
    return this.http.post<any>('https://10.177.197.134:9090/userRole/searchUserName', emailId, this.headers)
  } 
  

}



