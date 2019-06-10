import { Injectable }   from '@angular/core';
import { HttpClient }   from '@angular/common/http';
import { Observable }   from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Billing } from '../models/billing.model';
@Injectable()
export class BillingService {
  public serviceUrl = 'http://10.103.42.177:8081/accountReceivable/getActiveAR ';
  result : Billing[]=[];
  
  constructor(private http: HttpClient) { }
  
  getAllAR(): Observable<Billing[]> {
   
    return this.http.get<Billing[]>(this.serviceUrl);

  }


}