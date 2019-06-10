import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatIconModule,
  MatToolbarModule,
  MatCardModule,
  MatListModule,
  MatSidenavModule,
  MatTableModule,
  MatCheckboxModule,
  MatPaginatorModule,
  MatDialogModule
} from '@angular/material';
import { MatchPaymentComponent } from './match-payment.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PaymentService } from 'src/app/services/payment.service';
import { Adal6Service, Adal6HTTPService } from 'adal-angular6';

describe('MatchPaymentComponent', () => {
  let component: MatchPaymentComponent;
  let fixture: ComponentFixture<MatchPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchPaymentComponent ],
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
        BrowserAnimationsModule,
        HttpClientTestingModule,
        MatDialogModule
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
    fixture = TestBed.createComponent(MatchPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
