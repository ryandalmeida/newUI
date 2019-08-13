import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AuditLogData } from '../models/audit.log.model';

@Injectable()
export class AuditLogDisplayService {
  constructor(private http: HttpClient) { }
  searchAuditLogData(myPostObject) {
    return this.http.post<any>('http://localhost:7000/accountReceivable/searchAuditLogData', myPostObject, { headers: new HttpHeaders().set('Azure-Auth', 'true') })
  }

  getAllAuditLogAzure(): Observable<any[]> {
    return this.http.get<AuditLogData[]>('https://wbgeabpmwebalb.worldbankgroup.org/auditAzure/getAuditAzure', { headers: new HttpHeaders().set('Azure-Auth', 'true') });
  }

  getAllAuditLogAWS(): Observable<AuditLogData[]> {
    return this.http.get<AuditLogData[]>('https://wbgeabpmservicesalbaws.worldbankgroup.org/auditAWS/getAuditAWS', { headers: new HttpHeaders().set('Azure-Auth', 'true') });
  }
}







