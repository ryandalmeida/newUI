import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BillingService } from './billing.service';
import { Billing } from '../models/billing.model';

describe('generateBillingService', () => {
  let billingTableTestData: Array<Billing> = [
    {
      arId: 109,
      donorName: "SAKSHI KUMAR",
      country: "United States",
      endDate: new Date("2019-07-20"),
      pledgeFundType: "Additional Contribution",
      pledgeId: 26,
      debit: 24,
      creditAmount: 123,
      installmentNo: 1,
      startDate: new Date("2019-07-06"),
      status: "Bill Generated"
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BillingService]
    });
  });

  it('should get all records', inject([HttpTestingController, BillingService],
    (httpMock: HttpTestingController, dataService: BillingService) => {
      dataService.getAllAR().subscribe((res) => {
        expect(res).toEqual(billingTableTestData);
        expect(res.length).toEqual(1);
      });

      const mockReq = httpMock.expectOne('https://5ufe1v6q92.execute-api.us-east-1.amazonaws.com/test/accountreceivable-getactivear');
      expect(mockReq.request.method).toEqual('GET');
      mockReq.flush(billingTableTestData);
      httpMock.verify();
    })
  );

  it('should submit', inject([HttpTestingController, BillingService],
    (httpMock: HttpTestingController, service: BillingService) => {
      const mockResponse: Object = "Bill Generated Successfully";

      service.submitBill(billingTableTestData).subscribe((data: Object) => {
        expect(data).toEqual(mockResponse)
      });
      const mockReq = httpMock.expectOne('https://5ufe1v6q92.execute-api.us-east-1.amazonaws.com/test/tasktokenpoller');
      expect(mockReq.request.method).toEqual('POST');
      mockReq.flush(mockResponse);
      httpMock.verify();
    }));

  it('should search', inject([HttpTestingController, BillingService],
    (httpMock: HttpTestingController, service: BillingService) => {
      const mockBody =
      {
        pledgeId: 2,
        donorId: 2
      }

      service.search(mockBody).subscribe((data: Object) => {
        expect(data).toEqual(billingTableTestData)
      });
      const mockReq = httpMock.expectOne('https://5ufe1v6q92.execute-api.us-east-1.amazonaws.com/test/generateBillandInvoice-searchGenerateBilling');
      expect(mockReq.request.method).toEqual('POST');
      mockReq.flush(billingTableTestData);
      httpMock.verify();
    }));
});  