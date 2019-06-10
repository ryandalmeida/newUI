import { Injectable }   from '@angular/core';
import { HttpClient }   from '@angular/common/http';
import { Observable }   from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { UserRoleData } from '../models/userRole.model';

@Injectable()
export class UserRoleService {
  public serviceUrl = 'http://localhost:8000/userRole/searchUserRole';
  result : UserRoleData[]=[];
  
  constructor(private http: HttpClient) { }
  
searchUserRole(): Observable<UserRoleData[]> {
    return this.http.get<UserRoleData[]>(this.serviceUrl);
  }
  
public serviceUrl1 = 'http://localhost:8000/userRole/updateUserRole';
result1 : UserRoleData[]=[];
  
updateUserRole(): Observable<UserRoleData[]> {
   return this.http.get<UserRoleData[]>(this.serviceUrl1);
}


}

 

