import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { PledgeData } from '../models/pledge.model';
import { environment } from '../../environments/environment.prod';
import { AuthTokenService } from './authToken.service';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';

@Injectable()
export class PledgeService {

  public url: string = environment.pledgeServiceURL;
  public initiatorLambdaUrl: string = environment.initiatorlambda;
  public pollerLambdaUrl: string = environment.pollerlambda;
  public headers = environment.headers;

  authtoken: string;
  role_Object;
  roleObject;

  constructor(private http: HttpClient, private authService: AuthTokenService, private authenticationService: MsAdalAngular6Service) {
    this.authService.getAuthToken().subscribe(response => {
      this.authtoken = response;
    });

    this.role_Object = localStorage.getItem('Role');
    this.roleObject = JSON.parse(this.role_Object);
  }

  getAllPledge(): Observable<PledgeData[]> {
    return this.http.get<PledgeData[]>(this.url + '/pledge/getAll', { headers: new HttpHeaders().set('Authorization', `Bearer ${this.authtoken}`).set('ROLES', `${this.roleObject}`).set('uniqueName', `${this.authenticationService.userInfo.profile.unique_name}`) });
  }

  getNewPledge(): Observable<PledgeData[]> {
    return this.http.get<PledgeData[]>(this.url + '/pledge/getNew', { headers: new HttpHeaders().set('Authorization', `Bearer ${this.authtoken}`).set('ROLES', `${this.roleObject}`).set('uniqueName', `${this.authenticationService.userInfo.profile.unique_name}`) });
  }

  searchPledge(postObject): Observable<Object[]> {
    return this.http.post<Object[]>(this.url + '/pledge/search', postObject, { headers: new HttpHeaders().set('Authorization', `Bearer ${this.authtoken}`).set('ROLES', `${this.roleObject}`).set('uniqueName', `${this.authenticationService.userInfo.profile.unique_name}`) });
  }

  searchPledgeApprover(postObject) {
    return this.http.post<any>(this.url + '/pledge/searchApprover', postObject, { headers: new HttpHeaders().set('Authorization', `Bearer ${this.authtoken}`).set('ROLES', `${this.roleObject}`).set('uniqueName', `${this.authenticationService.userInfo.profile.unique_name}`) });
  }

  submitPledge(postObject): Observable<Object> {
    return this.http.post(this.initiatorLambdaUrl, postObject, { headers: new HttpHeaders().set('Authorization', `Bearer ${this.authtoken}`).set('ROLES', `${this.roleObject}`).set('uniqueName', `${this.authenticationService.userInfo.profile.unique_name}`) });
  }

  approvePledge(postObject) {
    return this.http.post(this.pollerLambdaUrl, postObject, { headers: new HttpHeaders().set('Authorization', `Bearer ${this.authtoken}`).set('ROLES', `${this.roleObject}`).set('uniqueName', `${this.authenticationService.userInfo.profile.unique_name}`) });
  }

  revisePledge(postObject) {
    return this.http.post(this.pollerLambdaUrl, postObject, { headers: new HttpHeaders().set('Authorization', `Bearer ${this.authtoken}`).set('ROLES', `${this.roleObject}`).set('uniqueName', `${this.authenticationService.userInfo.profile.unique_name}`) });
  }
}