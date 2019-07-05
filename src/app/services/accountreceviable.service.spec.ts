import { TestBed, inject } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { Adal6HTTPService, Adal6Service } from 'adal-angular6';


import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { AccountreceivableService } from './accountreceivable.service';
import { accountreceivableData } from '../models/accountReceivable.model';

describe('accountreceivableService', () => {
  let httpClient: HttpClient;

  let accountreceiviableTableTestData: Array<accountreceivableData> = [
    {pledgeId: 3,donorId: 2,donorName: "John",  accountNo:12345,bankName:"SBI",country: "England",pledgeFundType: "regular",startDate: new Date('2017-09-03'), endDate: new Date('2018-09-04'),amount: 2000,paymentPeriod: 3,installments: 3},
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AccountreceivableService, Adal6Service, {
        provide: Adal6HTTPService,
        useFactory: Adal6HTTPService.factory,
        deps: [Adal6Service]
      }]
    });
  });

  beforeEach(() => {
    httpClient = TestBed.get(HttpClient);
  });

  it('should get all ar', inject([HttpTestingController, AccountreceivableService],
    (httpMock: HttpTestingController, dataService: AccountreceivableService) => {

      dataService.getAllAR().subscribe((res) => {
        console.log("res", res)
        expect(res).toEqual(accountreceiviableTableTestData);
        expect(res.length).toEqual(1);
      });

      const mockReq = httpMock.expectOne(dataService.serviceUrl);
      expect(mockReq.request.method).toEqual('GET');
      mockReq.flush(accountreceiviableTableTestData);
      httpMock.verify();
    }
  )
  );

  it('should submit ar', inject([HttpTestingController, AccountreceivableService],
    (httpMock: HttpTestingController, service: AccountreceivableService) => {
      const mockBody =
      {
        /* country: "USA",
        pledgeFundType: "Regular",
        startDate: new Date("2019-01-10"),
        endDate: new Date("2019-01-12"),
        paymentPeriod: 10,
        installments: 10,
        programName: "WBG",
        amount: 500000000 */

        pledgeId:3,
        country:"India",
        accountNo:"12345",
        bankName:"SBI",
        startDate:"2014-09-01 16:34:02",
        endDate:"2015-09-03 16:34:02",
        amount:100.00,
        paymentPeriod:12,
         installments:5
      }

      const mockResponse: Object = "AccountReceivable Inserted Successfully";

      service.submitAccountReceivable(mockBody).subscribe((data: Object) => {
        console.log("data..", data);
        expect(data).toEqual(mockResponse)
      });
      const mockReq = httpMock.expectOne('http://localhost:8300/accountReceivable/submitAccountReceivable');
      expect(mockReq.request.method).toEqual('POST');
      mockReq.flush(mockResponse);
      httpMock.verify();
    }));

  

 

  it('should search accountReceivable', inject([HttpTestingController, AccountreceivableService],
    (httpMock: HttpTestingController, service: AccountreceivableService) => {
      const mockBody =
      {
        pledgeId: 2,
        donorId: 2
      }

      service.searchaccountReceivable(mockBody).subscribe((data: Object) => {
        console.log("data..", data);
        expect(data).toEqual(accountreceiviableTableTestData)
      });
      const mockReq = httpMock.expectOne('http://localhost:8300/accountReceivable/searchAccountReceivable');
      expect(mockReq.request.method).toEqual('POST');
      mockReq.flush(accountreceiviableTableTestData);
      httpMock.verify();
    }));

});