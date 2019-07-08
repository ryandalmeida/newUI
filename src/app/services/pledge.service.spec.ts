import { TestBed, inject } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { Adal6HTTPService, Adal6Service } from 'adal-angular6';


import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { PledgeService } from './pledge.service';
import { PledgeData } from '../models/pledge.model';

describe('PledgeService', () => {
  let httpClient: HttpClient;

  let donoDashboardTableTestData: Array<PledgeData> = [
    { pledgeId: 20, 
      programName: 'Carbon Emission Reduction', 
      pledgeFundType: 'Regular', 
      amount: 500000000, 
      installments: 10, 
      paymentPeriod: 10, 
      startDate: new Date('2017-09-03'), 
      endDate: new Date('2018-09-04'),
      country:'india',
      status:'New'
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PledgeService, Adal6Service, {
        provide: Adal6HTTPService,
        useFactory: Adal6HTTPService.factory,
        deps: [Adal6Service]
      }]
    });
  });

  beforeEach(() => {
    httpClient = TestBed.get(HttpClient);
  });

  it('should get all pledges', inject([HttpTestingController, PledgeService],
    (httpMock: HttpTestingController, dataService: PledgeService) => {

      dataService.getAllPledge().subscribe((res) => {
        console.log("res", res)
        expect(res).toEqual(donoDashboardTableTestData)
        expect(res.length).toEqual(1);
      });

      const mockReq = httpMock.expectOne(dataService.serviceUrl);
      expect(mockReq.request.method).toEqual('GET');
      mockReq.flush(donoDashboardTableTestData);
      httpMock.verify();
    }
  )
  );

  it('should submit pledge', inject([HttpTestingController, PledgeService],
    (httpMock: HttpTestingController, service: PledgeService) => {
      const mockBody =
      {
        country: "USA",
        pledgeFundType: "Regular",
        startDate: new Date("2019-01-10"),
        endDate: new Date("2019-01-12"),
        paymentPeriod: 10,
        installments: 10,
        programName: "WBG",
        amount: 500000000
      }

      const mockResponse: Object = "Pledge Inserted Successfully";

      service.submitPledge(mockBody).subscribe((data: Object) => {
        console.log("data..", data);
        expect(data).toEqual(mockResponse)
      });
      const mockReq = httpMock.expectOne('https://5ufe1v6q92.execute-api.us-east-1.amazonaws.com/test/initiator-lambda');
      expect(mockReq.request.method).toEqual('POST');
      mockReq.flush(mockResponse);
      httpMock.verify();
    }));

  it('should approve pledge', inject([HttpTestingController, PledgeService],
    (httpMock: HttpTestingController, service: PledgeService) => {
      const mockBody =
      {
        amount: 12000000,
        approvedBy: "sam",
        comments: null,
        country: "United States",
        donorId: 2,
        donorName: "John",
        endDate: "2019-05-31",
        installments: 10,
        paymentPeriod: 1,
        pledgeFundType: "regular",
        pledgeId: 47,
        programName: "Carbon Emission Reduction",
        startDate: "2019-05-01",
        status: "New"
      }

      const mockResponse: Object = "Pledge Approved";

      service.approvePledge(mockBody).subscribe((data: Object) => {
        console.log("data..", data);
        expect(data).toEqual(mockResponse)
      });
      const mockReq = httpMock.expectOne('https://5ufe1v6q92.execute-api.us-east-1.amazonaws.com/test/tasktokenpoller');
      expect(mockReq.request.method).toEqual('POST');
      mockReq.flush(mockResponse);
      httpMock.verify();
    }));

  it('should revise pledge', inject([HttpTestingController, PledgeService],
    (httpMock: HttpTestingController, service: PledgeService) => {
      const mockBody =
      {
        comments: "Inadequate fund",
        pledgeId: 2
      }

      const mockResponse: Object = "Pledge Revised";

      service.revisePledge(mockBody).subscribe((data: Object) => {
        console.log("data..", data);
        expect(data).toEqual(mockResponse)
      });
      const mockReq = httpMock.expectOne('https://wbg-bpm-apim.azure-api.net/pledge-api/pledge/revise');
      expect(mockReq.request.method).toEqual('POST');
      mockReq.flush(mockResponse);
      httpMock.verify();
    }));

  it('should search pledge', inject([HttpTestingController, PledgeService],
    (httpMock: HttpTestingController, service: PledgeService) => {
      const mockBody =
      {
        pledgeId: 2,
        donorId: 2
      }

      service.searchPledge(mockBody).subscribe((data: Object) => {
        console.log("data..", data);
        expect(data).toEqual(donoDashboardTableTestData)
      });
      const mockReq = httpMock.expectOne('https://wbg-bpm-apim.azure-api.net/pledge-api/pledge/search');
      expect(mockReq.request.method).toEqual('POST');
      mockReq.flush(donoDashboardTableTestData);
      httpMock.verify();
    }));

});