import { TestBed, inject } from '@angular/core/testing';
import { HttpEvent, HttpEventType } from '@angular/common/http';

import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { PledgeService } from './pledge.service';

describe('PledgeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PledgeService]
    });
  });

  it(
    'should get users',
    inject(
      [HttpTestingController, PledgeService],
      (httpMock: HttpTestingController, dataService: PledgeService) => {
        const mockUsers = [
          { 
            "pledgeId": 28,
            "donorName": "John",
            "country": "United States",
            "startDate": new Date(2012, 0, 1),
            "endDate": new Date(2012, 0, 1),
            "amount": 455,
            "installments": 0,
            "ar_no": 0,
            "invoice_no": 0
        }
        ];

        dataService.getAllPledge().subscribe((res) => {
            console.log("res", res)
            expect(res).toEqual(mockUsers);
          
        });

        const mockReq = httpMock.expectOne(dataService.serviceUrl);

      /*   expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json'); */
        mockReq.flush(mockUsers);

        httpMock.verify();
      }
    )
  );
});