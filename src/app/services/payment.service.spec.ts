import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PaymentService } from './payment.service';
import { PaymentData } from '../models/payment.model';
import { environment } from '../../environments/environment.prod';

describe('paymentService', () => {
  let url: string = environment.processPaymentServiceURL;
  let pollerLambdaUrl: string = environment.pollerlambda;

  let paymentTableTestData: Array<PaymentData> = [
    {
    donorName: "SAKSHI KUMAR",
    arId: 109,
    country: "United States",
    pledgeFundType: "Additional Contribution",
    invoiceId: 59,
    pledgeId: 26,
    creditAmount: 123,
    installmentNo: 1,
    status: "Payment Received"
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PaymentService]
    });
  });

  it('should get all records', inject([HttpTestingController, PaymentService],
    (httpMock: HttpTestingController, dataService: PaymentService) => {
      dataService.getAllProcessPayments().subscribe((res) => {
        expect(res).toEqual(paymentTableTestData);
        expect(res.length).toEqual(1);
      });

      const mockReq = httpMock.expectOne(url+'/generateBillandInvoice/viewProcessInvoice');
      expect(mockReq.request.method).toEqual('GET');
      mockReq.flush(paymentTableTestData);
      httpMock.verify();
    })
  );

  it('should submit', inject([HttpTestingController, PaymentService],
    (httpMock: HttpTestingController, service: PaymentService) => {
      const mockResponse: Object = "Process Payment data has been inserted Successfully";

      service.submitPayment(paymentTableTestData).subscribe((data: Object) => {
        expect(data).toEqual(mockResponse)
      });
      const mockReq = httpMock.expectOne(pollerLambdaUrl);
      expect(mockReq.request.method).toEqual('POST');
      mockReq.flush(mockResponse);
      httpMock.verify();
    }));

  it('should search', inject([HttpTestingController, PaymentService],
    (httpMock: HttpTestingController, service: PaymentService) => {
      const mockBody =
      {
        pledgeId: 2,
        donorId: 2
      }

      service.searchPayment(mockBody).subscribe((data: Object) => {
        expect(data).toEqual(paymentTableTestData)
      });
      const mockReq = httpMock.expectOne(url+'/processPayment/searchProcessPayment');
      expect(mockReq.request.method).toEqual('POST');
      mockReq.flush(paymentTableTestData);
      httpMock.verify();
    }));
});   