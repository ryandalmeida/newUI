import { Injectable }   from '@angular/core';
import { HttpClient, HttpHeaders }   from '@angular/common/http';
import { Observable }   from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AuditLogData } from '../models/audit.log.model';
import { Adal6Service } from 'adal-angular6';
import { RequestOptions } from '@angular/http';

@Injectable()
export class AuditLogDisplayService {

  result : AuditLogData[]=[];
  
  constructor(private http: HttpClient) { }
  

  searchAuditLogData(myPostObject) {
   
    // AWS to AZURE// AWS to AZURE(Open below link when you are watching the audit log display from aws)
    return this.http.post<any>('http://localhost:7000/accountReceivable/searchAuditLogData', myPostObject, { headers: new HttpHeaders().set('Azure-Auth', 'true') })
    
    // AZURE to AWS (Open below link when you are watching the audit log display from azure)
   
    //return this.http.post<any>('http://localhost:5000/pledge/viewAuditLogData', myPostObject, { headers: new HttpHeaders().set('Azure-Auth', 'true') })
   
    }

  
// AWS to AZURE(Open below link when you are watching the audit log display from aws)
public serviceUrl1 = 'http://localhost:7000/accountReceivable/viewAuditLogData';

// AZURE to AWS (Open below link when you are watching the audit log display from azure)
//public serviceUrl1 = 'http://localhost:5000/pledge/viewAuditLogData';


result2 : AuditLogData[]=[];
  
getAllAuditLog(): Observable<AuditLogData[]> {
   return this.http.get<AuditLogData[]>(this.serviceUrl1);
}



}







