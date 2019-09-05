import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { PledgeData } from '../models/pledge.model';
import { environment } from '../../environments/environment';
import { AuthTokenService } from './authToken.service';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';

@Injectable()
export class LegalService {

  public url_pledge : string = environment.pledgeServiceURL;
  public url_legal : string = environment.legalServiceURL;
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

  getAllLegalrecords(): Observable<PledgeData[]> {
    return this.http.get<PledgeData[]>(this.url_pledge+'/pledge/getApproved', { headers: new HttpHeaders().set('Authorization', `Bearer ${this.authtoken}`).set('ROLES', `${this.roleObject}`).set('uniqueName',`${this.authenticationService.userInfo.profile.unique_name}`)});
  }

  getAllLegalRecordedbyDonor(): Observable<PledgeData[]> {
    return this.http.get<PledgeData[]>(this.url_pledge+'/pledge/getLegalRecordedByDonor',{ headers: new HttpHeaders().set('Authorization', `Bearer ${this.authtoken}`).set('ROLES', `${this.roleObject}`).set('uniqueName',`${this.authenticationService.userInfo.profile.unique_name}`)});
  }

  getSign(postObject) {
    return this.http.post(this.url_legal+'/legalAgreement/getSign', postObject, { headers: new HttpHeaders().set('Authorization', `Bearer ${this.authtoken}`).set('ROLES', `${this.roleObject}`).set('uniqueName',`${this.authenticationService.userInfo.profile.unique_name}`)});
  }

  search(postObject) {
    return this.http.post<any>(this.url_legal+'/legalAgreement/searchLegalAgreement', postObject, { headers: new HttpHeaders().set('Authorization', `Bearer ${this.authtoken}`).set('ROLES', `${this.roleObject}`).set('uniqueName',`${this.authenticationService.userInfo.profile.unique_name}`)});
  }

  searchApprover(postObject) {
    return this.http.post<any>(this.url_legal+'/legalAgreement/searchLegalAgreementApprover', postObject, { headers: new HttpHeaders().set('Authorization', `Bearer ${this.authtoken}`).set('ROLES', `${this.roleObject}`).set('uniqueName',`${this.authenticationService.userInfo.profile.unique_name}`)});
  }

  onLegalSubmitWBGUser(postObject): Observable<Object> {
    return this.http.post(this.pollerLambdaUrl, postObject, { headers: new HttpHeaders().set('Authorization', `Bearer ${this.authtoken}`).set('ROLES', `${this.roleObject}`).set('uniqueName',`${this.authenticationService.userInfo.profile.unique_name}`)});
  }

  onLegalSubmitDonor(postObject): Observable<Object> {
    return this.http.post(this.pollerLambdaUrl, postObject,{ headers: new HttpHeaders().set('Authorization', `Bearer ${this.authtoken}`).set('ROLES', `${this.roleObject}`).set('uniqueName',`${this.authenticationService.userInfo.profile.unique_name}`)});
  }


}