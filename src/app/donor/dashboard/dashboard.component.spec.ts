 import { async, ComponentFixture, TestBed, inject,fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import {
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatGridListModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule 
} from '@angular/material';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


import { DashboardComponent } from './dashboard.component';
import { PledgeService } from '../services/pledge.service';
import { PledgeData } from '../models/pledge.model';


describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let backend: HttpTestingController;
  let service: PledgeService;
  let httpClient: HttpClient;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
          ReactiveFormsModule,
          FormsModule,
          MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatGridListModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  HttpClientTestingModule,
  BrowserAnimationsModule 
      ],
      declarations: [ DashboardComponent ],
      providers: [PledgeService]
    })
    .compileComponents();
 
 
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    backend = TestBed.get(HttpTestingController);
    service = TestBed.get(PledgeService);
    httpClient = TestBed.get(HttpClient);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('can test HttpClient.get', () => {
  /*   const testData: PledgeData = {pledgeId: 45,
      donorName: "John",
      ar_no: 3,
      invoice_no: 4,
      amount: 54,
      country: "India",
      installments: 5,
      startDate: null,
      endDate: null}; */
  
    // Make an HTTP GET request
  /*   httpClient.get<PledgeData>("http://10.103.42.177:8082/pledge/get")
      .subscribe(data =>
        // When observable resolves, result should match test data
       // expect(data).toEqual(testData)
      ); */
  
    // The following `expectOne()` will match the request's URL.
    // If no requests or multiple requests matched that URL
    // `expectOne()` would throw.
    const req = backend.expectOne('http://10.103.42.177:8082/pledge/get');
  
    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');
  
    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
   // req.flush(testData);
  
    // Finally, assert that there are no outstanding requests.
    backend.verify();
  });

 
/*   
 afterEach(() => {
  backend.verify();
}); */ 



/* it('retrieves all the cars', inject( [PledgeService], ( pService ) => {
  pService.getAllPledge().subscribe(result => expect(result.length).toBe(0)); 
})); */

});