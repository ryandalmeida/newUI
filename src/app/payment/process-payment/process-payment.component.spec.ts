import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatIconModule,
  MatToolbarModule,
  MatCardModule,
  MatListModule,
  MatSidenavModule,
  MatTableModule,
  MatCheckboxModule,
  MatPaginatorModule
} from '@angular/material';

import { ProcessPaymentComponent } from './process-payment.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SignaturePadModule } from 'angular2-signaturepad';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PaymentService } from 'src/app/services/payment.service';
import { Adal6Service, Adal6HTTPService } from 'adal-angular6';

describe('ProcessPaymentComponent', () => {
  let component: ProcessPaymentComponent;
  let fixture: ComponentFixture<ProcessPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessPaymentComponent ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatIconModule,
        MatToolbarModule,
        MatCardModule,
        MatListModule,
        MatSidenavModule,
        MatTableModule,
        MatCheckboxModule,
        MatPaginatorModule,
        SignaturePadModule,
        BrowserAnimationsModule,
        HttpClientTestingModule
        ],
        providers: [PaymentService,Adal6Service, {
          provide: Adal6HTTPService,
          useFactory: Adal6HTTPService.factory,
          deps: [Adal6Service]
      },]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
