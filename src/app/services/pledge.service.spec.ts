import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PledgeService } from './pledge.service';
import { PledgeData } from '../models/pledge.model';
import { environment } from '../../environments/environment.prod';

describe('PledgeService', () => {
  let url : string = environment.pledgeServiceURL;
  let initiatorLambdaUrl: string = environment.initiatorlambda;
  let pollerLambdaUrl: string = environment.pollerlambda;

  let donoDashboardTableTestData: Array<PledgeData> = [
    {
      pledgeId: 2,
      programName: 'Carbon Emission Reduction',
      pledgeFundType: 'Regular',
      amount: 500000000,
      installments: 10,
      paymentPeriod: 10,
      startDate: new Date('2017-09-03'),
      endDate: new Date('2018-09-04'),
      country: 'India',
      status: 'New'
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PledgeService]
    });
  });

  it('should get all pledges', inject([HttpTestingController, PledgeService],
    (httpMock: HttpTestingController, dataService: PledgeService) => {
      dataService.getAllPledge().subscribe((res) => {
        expect(res).toEqual(donoDashboardTableTestData)
        expect(res.length).toEqual(1);
      });

      const mockReq = httpMock.expectOne(url+'/pledge/getAll');
      expect(mockReq.request.method).toEqual('GET');
      mockReq.flush(donoDashboardTableTestData);
      httpMock.verify();
    }));

  it('should get pledges with status New', inject([HttpTestingController, PledgeService],
    (httpMock: HttpTestingController, dataService: PledgeService) => {
      dataService.getNewPledge().subscribe((res) => {
        expect(res).toEqual(donoDashboardTableTestData)
        expect(res.length).toEqual(1);
      });

      const mockReq = httpMock.expectOne(url+'/pledge/getNew');
      expect(mockReq.request.method).toEqual('GET');
      mockReq.flush(donoDashboardTableTestData);
      httpMock.verify();
    }));

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
        amount: 500000000,
        status: "New"
      }

      const mockResponse: Object = "Pledge Inserted Successfully";
      service.submitPledge(mockBody).subscribe((data: Object) => {
        expect(data).toEqual(mockResponse)
      });
      const mockReq = httpMock.expectOne(initiatorLambdaUrl);
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
        status: "Approved"
      }

      const mockResponse: Object = "Pledge Approved";
      service.approvePledge(mockBody).subscribe((data: Object) => {
        expect(data).toEqual(mockResponse)
      });
      const mockReq = httpMock.expectOne(pollerLambdaUrl);
      expect(mockReq.request.method).toEqual('POST');
      mockReq.flush(mockResponse);
      httpMock.verify();
    }));

  it('should revise pledge', inject([HttpTestingController, PledgeService],
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
        status: "Revise"
      }

      const mockResponse: Object = "Pledge Revised";
      service.revisePledge(mockBody).subscribe((data: Object) => {
        expect(data).toEqual(mockResponse)
      });
      const mockReq = httpMock.expectOne(pollerLambdaUrl);
      expect(mockReq.request.method).toEqual('POST');
      mockReq.flush(mockResponse);
      httpMock.verify();
    }));

  it('should search pledge for donor', inject([HttpTestingController, PledgeService],
    (httpMock: HttpTestingController, service: PledgeService) => {
      const mockBody =
      {
        pledgeId: 2
      }

      service.searchPledge(mockBody).subscribe((data: Object) => {
        expect(data).toEqual(donoDashboardTableTestData)
      });
      const mockReq = httpMock.expectOne(url+'/pledge/search');
      expect(mockReq.request.method).toEqual('POST');
      mockReq.flush(donoDashboardTableTestData);
      httpMock.verify();
    }));

  it('should search pledge for approver', inject([HttpTestingController, PledgeService],
    (httpMock: HttpTestingController, service: PledgeService) => {
      const mockBody =
      {
        pledgeId: 2
      }

      service.searchPledgeApprover(mockBody).subscribe((data: Object) => {
        expect(data).toEqual(donoDashboardTableTestData)
      });
      const mockReq = httpMock.expectOne(url+'/pledge/searchApprover');
      expect(mockReq.request.method).toEqual('POST');
      mockReq.flush(donoDashboardTableTestData);
      httpMock.verify();
    }));
}); 