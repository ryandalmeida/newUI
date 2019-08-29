import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { PaymentData } from '../models/payment.model';
import { environment } from '../../environments/environment';
import { AuthTokenService } from './authToken.service';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';

@Injectable()
export class PaymentService {

  public url: string = environment.processPaymentServiceURL;
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
    localStorage.removeItem('Role');
    this.roleObject=JSON.parse( this.role_Object);
   }
  
  searchPayment(postObject) {
    return this.http.post<any>(this.url+'/processPayment/searchProcessPayment', postObject,{ headers: new HttpHeaders().set('Authorization', `Bearer ${this.authtoken}`).set('ROLES', `${this.roleObject}`).set('uniqueName',`${this.authenticationService.userInfo.profile.unique_name}`)});
  }
  
  getAllProcessPayments(): Observable<PaymentData[]> {
    return this.http.get<PaymentData[]>(this.url+'/generateBillandInvoice/viewProcessInvoice', { headers: new HttpHeaders().set('Authorization', `Bearer ${this.authtoken}`).set('ROLES', `${this.roleObject}`).set('uniqueName',`${this.authenticationService.userInfo.profile.unique_name}`)});
  }

  submitPayment(postObject) {
    return this.http.post<any>(this.pollerLambdaUrl, postObject, { headers: new HttpHeaders().set('Authorization', `Bearer ${this.authtoken}`).set('ROLES', `${this.roleObject}`).set('uniqueName',`${this.authenticationService.userInfo.profile.unique_name}`)});
  }

}







