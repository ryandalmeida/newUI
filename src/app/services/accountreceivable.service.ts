import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { accountreceivableData } from '../models/accountreceivable.model';
import { environment } from '../../environments/environment';
import { AuthTokenService } from './authToken.service';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';

@Injectable()
export class AccountreceivableService {

  public url_pledge: string = environment.pledgeServiceURL;
  public url_ar: string = environment.accountReceivableServiceURL;
  public pollerLambdaUrl: string = environment.pollerlambda;
  public headers = environment.headers;
  authtoken: string;
  role_Object;
  roleObject;

  constructor(private http: HttpClient, private authService: AuthTokenService, private authenticationService: MsAdalAngular6Service) {
    this.authService.getAuthToken().subscribe(response => {
      this.authtoken = response;
    });

    this.role_Object=localStorage.getItem('Role');
    this.roleObject=JSON.parse( this.role_Object);
   }

  getAllAR(): Observable<accountreceivableData[]> {
    return this.http.get<accountreceivableData[]>(this.url_pledge + '/pledge/getLegalRecordedByApprover', { headers: new HttpHeaders().set('Authorization', `Bearer ${this.authtoken}`).set('ROLES', `${this.roleObject}`).set('uniqueName',`${this.authenticationService.userInfo.profile.unique_name}`)});
  }

  searchaccountReceivable(postObject) {
    return this.http.post<accountreceivableData[]>(this.url_pledge+'/pledge/searchAR', postObject, { headers: new HttpHeaders().set('Authorization', `Bearer ${this.authtoken}`).set('ROLES', `${this.roleObject}`).set('uniqueName',`${this.authenticationService.userInfo.profile.unique_name}`)});
  }

  submitAccountReceivable(postObject): Observable<Object> {
    return this.http.post(this.pollerLambdaUrl, postObject, { headers: new HttpHeaders().set('Authorization', `Bearer ${this.authtoken}`).set('ROLES', `${this.roleObject}`).set('uniqueName',`${this.authenticationService.userInfo.profile.unique_name}`)});
  }
}