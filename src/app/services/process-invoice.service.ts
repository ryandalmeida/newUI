import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ProcessInvoice } from '../models/process-invoice.model';
import { environment } from '../../environments/environment';

@Injectable()
export class ProcessInvoiceService {

  public url: string = environment.processInvoiceServiceURL;
  public pollerLambdaUrl: string = environment.pollerlambda;
  public headers = environment.headers;

  constructor(private http: HttpClient) { }

  getAllBillGenerated(): Observable<ProcessInvoice[]> {
    return this.http.get<ProcessInvoice[]>(this.url+'/generateBillandInvoice/getAllInvoiceBillGenerated', this.headers);
  }

  searchInvoice(postObject){
    return this.http.post<any[]>(this.url+'/generateBillandInvoice/searchProcessInvoice', postObject, this.headers);
  }

  submitInvoice(postObject): Observable<Object> {
    return this.http.post(this.pollerLambdaUrl, postObject, this.headers);
  }
}