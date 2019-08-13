import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AccountreceivableService } from './accountreceivable.service';
import { accountreceivableData } from '../models/accountReceivable.model';
import { environment } from '../../environments/environment';

describe('accountreceivableService', () => {
  let url_pledge: string = environment.pledgeServiceURL;
  let url_ar: string = environment.accountReceivableServiceURL;
  let pollerLambdaUrl: string = environment.pollerlambda;

  let accountreceiviableTableTestData: Array<accountreceivableData> = [
    {
      pledgeId: 3,
      donorId: 2,
      donorName: "John",
      accountNo: 12345,
      bankName: "SBI",
      country: "England",
      pledgeFundType: "regular",
      startDate: new Date('2017-09-03'),
      endDate: new Date('2018-09-04'),
      amount: 2000,
      paymentPeriod: 3,
      installments: 3
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AccountreceivableService]
    });
  });

  it('should get all AR records', inject([HttpTestingController, AccountreceivableService],
    (httpMock: HttpTestingController, dataService: AccountreceivableService) => {
      dataService.getAllAR().subscribe((res) => {
        expect(res).toEqual(accountreceiviableTableTestData);
        expect(res.length).toEqual(1);
      });

      const mockReq = httpMock.expectOne(url_pledge +'/pledge/getLegalRecordedByApprover');
      expect(mockReq.request.method).toEqual('GET');
      mockReq.flush(accountreceiviableTableTestData);
      httpMock.verify();
    })
  );

  it('should submit', inject([HttpTestingController, AccountreceivableService],
    (httpMock: HttpTestingController, service: AccountreceivableService) => {
      const mockBody =
      {
        pledgeId: 3,
        country: "India",
        accountNo: "12345",
        bankName: "SBI",
        startDate: "2014-09-01 16:34:02",
        endDate: "2015-09-03 16:34:02",
        amount: 100.00,
        paymentPeriod: 12,
        installments: 5
      }

      const mockResponse: Object = "AccountReceivable Inserted Successfully";

      service.submitAccountReceivable(mockBody).subscribe((data: Object) => {
        expect(data).toEqual(mockResponse)
      });
      const mockReq = httpMock.expectOne(pollerLambdaUrl);
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
        expect(data).toEqual(accountreceiviableTableTestData)
      });
      const mockReq = httpMock.expectOne(url_ar +'/accountReceivable/searchAccountReceivable');
      expect(mockReq.request.method).toEqual('POST');
      mockReq.flush(accountreceiviableTableTestData);
      httpMock.verify();
    }));
});  