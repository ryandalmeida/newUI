import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AuditLogData } from '../models/audit.log.model';

@Injectable()
export class AuditLogDisplayService {
  result: AuditLogData[] = [];
  constructor(private http: HttpClient) { }
  searchAuditLogData(myPostObject) {
    return this.http.post<any>('http://localhost:7000/accountReceivable/searchAuditLogData', myPostObject, { headers: new HttpHeaders().set('Azure-Auth', 'true') })
  }

  public serviceUrl1 = 'http://localhost:7000/accountReceivable/viewAuditLogData';
  result2: AuditLogData[] = [];
  getAllAuditLogAzure(): Observable<AuditLogData[]> {
	  //'http://10.103.42.177:8001/auditAzure/getAuditAzure'
	 return this.http.get<AuditLogData[]>('http://10.168.42.112:8080/auditAzure/getAuditAzure', { headers: new HttpHeaders().set('Azure-Auth', 'true') });
  }

  getAllAuditLogAWS(): Observable<AuditLogData[]> {
	  //'http://10.103.42.177:8000/auditAWS/getAuditAWS'
	return this.http.get<AuditLogData[]>('http://internal-ea-paas-backend-alb-738279272.us-east-1.elb.amazonaws.com/auditAWS/getAuditAWS', { headers: new HttpHeaders().set('aws-auth', 'true') });
  }
}







