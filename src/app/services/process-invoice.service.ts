import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ProcessInvoice } from '../models/process-invoice.model';

@Injectable()
export class ProcessInvoiceService {

  result: ProcessInvoice[] = [];

  constructor(private http: HttpClient) { }

  getAllBillGenerated(): Observable<ProcessInvoice[]> {
    return this.http.get<ProcessInvoice[]>('https://5ufe1v6q92.execute-api.us-east-1.amazonaws.com/test/generatebillandinvoice-getallinvoicebillgenerated', { headers: new HttpHeaders().set('aws-auth', 'true') });
  }

  submitInvoice(postObject): Observable<Object> {
    return this.http.post('https://5ufe1v6q92.execute-api.us-east-1.amazonaws.com/test/tasktokenpoller', postObject, { headers: new HttpHeaders().set('aws-auth', 'true') });
  }
}