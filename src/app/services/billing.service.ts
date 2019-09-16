import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Billing } from '../models/billing.model';
import { environment } from '../../environments/environment.prod';
import { AuthTokenService } from './authToken.service';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';

@Injectable()
export class BillingService {
 
  public url: string = environment.billingServiceURL;
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

  getAllAR(): Observable<Billing[]> {
    return this.http.get<Billing[]>(this.url+'/accountReceivable/getActiveAR', { headers: new HttpHeaders().set('Authorization', `Bearer ${this.authtoken}`).set('ROLES', `${this.roleObject}`).set('uniqueName',`${this.authenticationService.userInfo.profile.unique_name}`)});
  }

  search(searchFormData) {
    return this.http.post<Billing[]>(this.url+'/generateBillandInvoice/searchGenerateBilling', searchFormData,{ headers: new HttpHeaders().set('Authorization', `Bearer ${this.authtoken}`).set('ROLES', `${this.roleObject}`).set('uniqueName',`${this.authenticationService.userInfo.profile.unique_name}`)});
  }

  submitBill(submitObject): Observable<Object> {
    return this.http.post(this.pollerLambdaUrl, submitObject, { headers: new HttpHeaders().set('Authorization', `Bearer ${this.authtoken}`).set('ROLES', `${this.roleObject}`).set('uniqueName',`${this.authenticationService.userInfo.profile.unique_name}`)});
  }
}