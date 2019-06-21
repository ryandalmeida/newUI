import { Injectable }   from '@angular/core';
import { HttpClient }   from '@angular/common/http';
import { Observable }   from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {ProcessInvoice } from '../models/process-invoice.model';
@Injectable()
export class ProcessInvoiceService {
  public serviceUrl = 'http://10.103.42.177:8082/generateBillandInvoice/getAllInvoiceBillGenerated';

  result : ProcessInvoice[]=[];
  
  constructor(private http: HttpClient) { }
  
  getAllBillGenerated(): Observable<ProcessInvoice[]> {
   
    return this.http.get<ProcessInvoice[]>(this.serviceUrl);

  }


}