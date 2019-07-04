import { Injectable }   from '@angular/core';
import { HttpClient, HttpHeaders }   from '@angular/common/http';
import { Observable }   from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {ProcessInvoice } from '../models/process-invoice.model';
@Injectable()
export class ProcessInvoiceService {
  public serviceUrl = 'http://10.103.42.177:8082/generateBillandInvoice/getAllInvoiceBillGenerated';

  result : ProcessInvoice[]=[];
  
  constructor(private http: HttpClient) { }
  
  getAllBillGenerated(): Observable<ProcessInvoice[]> {
   
    return this.http.get<ProcessInvoice[]>('https://swdgufpck8.execute-api.us-west-2.amazonaws.com/test/generatebillandinvoice-generatebill',{ headers: new HttpHeaders().set('aws-auth', 'true') });

  }


}