import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProcessInvoiceService } from './process-invoice.service';
import { ProcessInvoice } from '../models/process-invoice.model';

describe('processInvoiceService', () => {
  let invoiceTableTestData: Array<Object> = [
    {
      donorName: "SAKSHI KUMAR",
      arId: 109,
      country: "United States",
      endDate: new Date("2019-07-20"),
      pledgeFundType: "Additional Contribution",
      invoiceId: 59,
      pledgeId: 26,
      creditAmount: 123,
      debit: 24,
      installmentNo: 1,
      startDate: new Date("2019-07-06"),
      status: "Paid"
    }
  ];

  let getInvoiceData: Array<ProcessInvoice> = [
    {
      pledgeId: 1,
      country: "India",
      donorName : "SAKSHI KUMAR",
      invoiceId: 10,
      startDate: new Date("2019-07-20"),
      endDate: new Date("2019-07-20"),
      arId: 20,
      installmentNo:1,
      debit:24,
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcessInvoiceService]
    });
  });

  it('should get all records', inject([HttpTestingController, ProcessInvoiceService],
    (httpMock: HttpTestingController, dataService: ProcessInvoiceService) => {
      dataService.getAllBillGenerated().subscribe((res) => {
        expect(res).toEqual(getInvoiceData);
        expect(res.length).toEqual(1);
      });

      const mockReq = httpMock.expectOne('https://5ufe1v6q92.execute-api.us-east-1.amazonaws.com/test/generatebillandinvoice-getallinvoicebillgenerated');
      expect(mockReq.request.method).toEqual('GET');
      mockReq.flush(getInvoiceData);
      httpMock.verify();
    })
  );

  it('should submit', inject([HttpTestingController, ProcessInvoiceService],
    (httpMock: HttpTestingController, service: ProcessInvoiceService) => {
      const mockResponse: Object = "Payment has been done";

      service.submitInvoice(invoiceTableTestData).subscribe((data: Object) => {
        expect(data).toEqual(mockResponse)
      });
      const mockReq = httpMock.expectOne('https://5ufe1v6q92.execute-api.us-east-1.amazonaws.com/test/tasktokenpoller');
      expect(mockReq.request.method).toEqual('POST');
      mockReq.flush(mockResponse);
      httpMock.verify();
    }));

  it('should search', inject([HttpTestingController, ProcessInvoiceService],
    (httpMock: HttpTestingController, service: ProcessInvoiceService) => {
      const mockBody =
      {
        pledgeId: 2,
        donorId: 2
      }

      service.searchInvoice(mockBody).subscribe((data: Object) => {
        expect(data).toEqual(invoiceTableTestData)
      });
      const mockReq = httpMock.expectOne('https://5ufe1v6q92.execute-api.us-east-1.amazonaws.com/test/generatebillandinvoice-searchprocessinvoice');
      expect(mockReq.request.method).toEqual('POST');
      mockReq.flush(invoiceTableTestData);
      httpMock.verify();
    }));
});  