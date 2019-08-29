import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Billing } from '../models/billing.model';
import { environment } from '../../environments/environment';

@Injectable()
export class BillingService {
 
  public url: string = environment.billingServiceURL;
  public pollerLambdaUrl: string = environment.pollerlambda;
  public headers = environment.headers;

  constructor(private http: HttpClient) { }

  getAllAR(): Observable<Billing[]> {
    return this.http.get<Billing[]>(this.url+'/accountReceivable/getActiveAR', this.headers);
  }

  search(searchFormData) {
    return this.http.post<Billing[]>(this.url+'/generateBillandInvoice/searchGenerateBilling', searchFormData, this.headers);
  }

  submitBill(submitObject): Observable<Object> {
    return this.http.post(this.pollerLambdaUrl, submitObject, this.headers);
  }
}