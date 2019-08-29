import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AuditLogData } from '../models/audit.log.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuditLogDisplayService {
  public audit_azure_url: string = environment.auditAzure;
  public audit_aws_url: string = environment.auditAWS;
  public headers = environment.headers;
  constructor(private http: HttpClient) { }

  searchAuditLogData(myPostObject) {
    return this.http.post<any>(this.audit_aws_url+'/auditAWS/searchAuditLogDataAWS', myPostObject, this.headers)
  }

  getAllAuditLogAzure(): Observable<any[]> {
    return this.http.get<AuditLogData[]>(this.audit_azure_url+'/auditAzure/getAuditAzure', this.headers);
  }

  getAllAuditLogAWS(): Observable<AuditLogData[]> {
    return this.http.get<AuditLogData[]>(this.audit_aws_url+'/auditAWS/getAuditAWS', this.headers);
  }
}







