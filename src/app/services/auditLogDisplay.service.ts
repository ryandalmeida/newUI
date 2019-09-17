import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AuditLogData } from '../models/audit.log.model';
import { environment } from 'src/environments/environment.prod';
import { AuthTokenService } from './authToken.service';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';

@Injectable()
export class AuditLogDisplayService {
  public audit_azure_url: string = environment.auditAzure;
  public audit_aws_url: string = environment.auditAWS;
  public headers = environment.headers;
  authtoken: string;
  role_Object;
  roleObject;

  constructor(private http: HttpClient, private authService: AuthTokenService, private authenticationService: MsAdalAngular6Service) { 
    this.authService.getAuthToken().subscribe(response => {
      this.authtoken = response;
    });

    this.role_Object=sessionStorage.getItem('Role');
    this.roleObject=JSON.parse( this.role_Object);
  }

  searchAuditLogData(myPostObject) {
    return this.http.post<any>(this.audit_azure_url+'/auditAzure/searchAuditLogData', myPostObject, { headers: new HttpHeaders().set('Authorization', `Bearer ${this.authtoken}`).set('ROLES', `${this.roleObject}`).set('uniqueName',`${this.authenticationService.userInfo.profile.unique_name}`)});
  }

  getAllAuditLogAzure(): Observable<any[]> {
    return this.http.get<AuditLogData[]>(this.audit_azure_url+'/auditAzure/getAuditAzure', { headers: new HttpHeaders().set('Authorization', `Bearer ${this.authtoken}`).set('ROLES', `${this.roleObject}`).set('uniqueName',`${this.authenticationService.userInfo.profile.unique_name}`)});
  }

  getAllAuditLogAWS(): Observable<AuditLogData[]> {
    return this.http.get<AuditLogData[]>(this.audit_aws_url+'/auditAWS/getAuditAWS', { headers: new HttpHeaders().set('Authorization', `Bearer ${this.authtoken}`).set('ROLES', `${this.roleObject}`).set('uniqueName',`${this.authenticationService.userInfo.profile.unique_name}`)});
  }

  getAllAuditAzure(): Observable<any[]> {
    return this.http.get<AuditLogData[]>(this.audit_azure_url+'/auditAzure/getAuditAzure', { headers: new HttpHeaders().set('Authorization', `Bearer ${this.authtoken}`).set('ROLES', 'ADMIN').set('uniqueName','NEEMA')});
  }
}







