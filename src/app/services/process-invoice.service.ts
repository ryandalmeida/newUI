import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ProcessInvoice } from '../models/process-invoice.model';
import { environment } from '../../environments/environment.prod';
import { AuthTokenService } from './authToken.service';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';

@Injectable()
export class ProcessInvoiceService {

  public url: string = environment.processInvoiceServiceURL;
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

  getAllBillGenerated(): Observable<ProcessInvoice[]> {
    return this.http.get<ProcessInvoice[]>(this.url+'/generateBillandInvoice/getAllInvoiceBillGenerated', { headers: new HttpHeaders().set('Authorization', `Bearer ${this.authtoken}`).set('ROLES', `${this.roleObject}`).set('uniqueName',`${this.authenticationService.userInfo.profile.unique_name}`)});
  }

  searchInvoice(postObject){
    return this.http.post<any[]>(this.url+'/generateBillandInvoice/searchProcessInvoice', postObject, { headers: new HttpHeaders().set('Authorization', `Bearer ${this.authtoken}`).set('ROLES', `${this.roleObject}`).set('uniqueName',`${this.authenticationService.userInfo.profile.unique_name}`)});
  }

  submitInvoice(postObject): Observable<Object> {
    return this.http.post(this.pollerLambdaUrl, postObject, { headers: new HttpHeaders().set('Authorization', `Bearer ${this.authtoken}`).set('ROLES', `${this.roleObject}`).set('uniqueName',`${this.authenticationService.userInfo.profile.unique_name}`)});
  }
}