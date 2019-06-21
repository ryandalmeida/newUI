import { Injectable }   from '@angular/core';
import { HttpClient,HttpHeaders }   from '@angular/common/http';
import { Observable }   from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { UserRoleData } from '../models/user.model';
import{MsAdalAngular6Service} from 'microsoft-adal-angular6';
import { resolve, reject } from 'q';

@Injectable()
export class UserRoleService {
  public serviceUrl = 'http://localhost:8000/userRole/searchUserName';

  getRoleUrl ='https://5ufe1v6q92.execute-api.us-east-1.amazonaws.com/test/getuserdetails';
  result : UserRoleData[]=[];
  authToken: string="b0f49dbf-f119-4483-9850-1c47b19235a5";
  constructor(private http: HttpClient,private msAdalSvc:MsAdalAngular6Service) { }




  
  getAuthToken() {

    this.msAdalSvc.acquireToken('b0f49dbf-f119-4483-9850-1c47b19235a5').subscribe((resToken: string) => {
      console.log("checking microsoft token")
      console.log("microsoft", resToken);
      this.authToken=resToken;
      
    });
  }

  searchUserRole(myPostObject) {
    return this.http.post<any>('http://localhost:8000/userRole/searchUserName', myPostObject, { headers: new HttpHeaders().set('Azure-Auth', 'true') })
    //return this.http.post<any>('http://localhost:8000/userRole/searchUserName', myPostObject, { headers: new HttpHeaders().set('Azure-Auth', 'true') })
  }
  


public serviceUrl1 = 'http://localhost:8000/userRole/updateUserRole';
result1 : UserRoleData[]=[];
  
updateUserRole(): Observable<UserRoleData[]> {
   return this.http.get<UserRoleData[]>(this.serviceUrl1);
}


getRole(){
  var myObject;
  //this.getAuthToken();
  let options = {
       headers: new HttpHeaders().set('Authorization', this.authToken)
      };

  return new Promise((resolve, reject)=>{
    this.http.post<any>('https://5ufe1v6q92.execute-api.us-east-1.amazonaws.com/test/getuserdetails', myObject,options).subscribe(response=>{
      resolve(response);
    })
  });
}


}

 

