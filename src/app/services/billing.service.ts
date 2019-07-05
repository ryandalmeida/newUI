import { Injectable }   from '@angular/core';
import { HttpClient, HttpHeaders }   from '@angular/common/http';
import { Observable }   from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Billing } from '../models/billing.model';
@Injectable()
export class BillingService {
  public serviceUrl = 'https://5ufe1v6q92.execute-api.us-east-1.amazonaws.com/test/accountreceivable-getactivear';
  result : Billing[]=[];
  
  constructor(private http: HttpClient) { }
  
  getAllAR(): Observable<Billing[]> {
    //https://5ufe1v6q92.execute-api.us-east-1.amazonaws.com/test/accountreceivable-getactivear
    //https://swdgufpck8.execute-api.us-west-2.amazonaws.com/test/accountreceivable-getactivear
    return this.http.get<Billing[]>('https://5ufe1v6q92.execute-api.us-east-1.amazonaws.com/test/accountreceivable-getactivear', { headers: new HttpHeaders().set('aws-auth', 'true') });

  }

  search(searchFormData){
    return this.http.post<Billing[]>('https://5ufe1v6q92.execute-api.us-east-1.amazonaws.com/test/generateBillandInvoice-searchGenerateBilling' ,searchFormData, { headers: new HttpHeaders().set('aws-auth', 'true') });
  }


}