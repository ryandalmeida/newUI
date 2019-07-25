import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatchPaymentService } from './matchPayment.service';
import { PaymentData } from '../models/payment.model';

describe('matchPaymentService', () => {
  let matchPaymentTableTestData: Array<Object> = [
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
    }
 ];

 let getMatchPaymentData: Array<PaymentData> = [
    {
        donorName: "SAKSHI KUMAR",
        arId: 109,
        country: "India",
        pledgeFundType: "Additional Contribution",
        invoiceId: 10,
        pledgeId: 26,
        creditAmount: 123,
        installmentNo: 1,
        status: "Payment Received"
    }
 ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MatchPaymentService]
    });
  });

  it('should get all records', inject([HttpTestingController, MatchPaymentService],
    (httpMock: HttpTestingController, dataService: MatchPaymentService) => {
      dataService.getAllMatchPayments().subscribe((res) => {
        expect(res).toEqual(getMatchPaymentData);
        expect(res.length).toEqual(1);
      });

      const mockReq = httpMock.expectOne('https://5ufe1v6q92.execute-api.us-east-1.amazonaws.com/test/processpayment-viewprocesspayment');
      expect(mockReq.request.method).toEqual('GET');
      mockReq.flush(getMatchPaymentData);
      httpMock.verify();
    })
  );

  it('should submit', inject([HttpTestingController, MatchPaymentService],
    (httpMock: HttpTestingController, service: MatchPaymentService) => {
      const mockResponse: Object = "https://5ufe1v6q92.execute-api.us-east-1.amazonaws.com/test/processpayment-searchmatchpayment";

      service.completed(matchPaymentTableTestData).subscribe((data: Object) => {
        expect(data).toEqual(mockResponse)
      });
      const mockReq = httpMock.expectOne('https://5ufe1v6q92.execute-api.us-east-1.amazonaws.com/test/tasktokenpoller');
      expect(mockReq.request.method).toEqual('POST');
      mockReq.flush(mockResponse);
      httpMock.verify();
    }));

  it('should search', inject([HttpTestingController, MatchPaymentService],
    (httpMock: HttpTestingController, service: MatchPaymentService) => {
      const mockBody =
      {
        pledgeId: 2,
        donorId: 2
      }

      service.searchMatchPaymentService(mockBody).subscribe((data: Object) => {
        expect(data).toEqual(matchPaymentTableTestData)
      });
      const mockReq = httpMock.expectOne('https://5ufe1v6q92.execute-api.us-east-1.amazonaws.com/test/processpayment-searchmatchpayment');
      expect(mockReq.request.method).toEqual('POST');
      mockReq.flush(matchPaymentTableTestData);
      httpMock.verify();
    }));
});