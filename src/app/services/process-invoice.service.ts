import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ProcessInvoice } from '../models/process-invoice.model';
import { environment } from '../../environments/environment';

@Injectable()
export class ProcessInvoiceService {

  public baseUrl_aws : string = environment.awsService;
  public aws_headers = { headers: new HttpHeaders().set('aws-auth', 'true') }

  constructor(private http: HttpClient) { }

  getAllBillGenerated(): Observable<ProcessInvoice[]> {
    return this.http.get<ProcessInvoice[]>(this.baseUrl_aws+'/generatebillandinvoice-getallinvoicebillgenerated', this.aws_headers);
  }

  submitInvoice(postObject): Observable<Object> {
    return this.http.post(this.baseUrl_aws+'/tasktokenpoller', postObject, this.aws_headers);
  }

  searchInvoice(postObject){
    return this.http.post<any[]>(this.baseUrl_aws+'/generatebillandinvoice-searchprocessinvoice', postObject, this.aws_headers);
  }
}