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

import { ProcessInvoiceComponent } from './process-invoice.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SignaturePadModule } from 'angular2-signaturepad';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProcessInvoiceService } from 'src/app/services/process-invoice.service';
import { Adal6Service, Adal6HTTPService } from 'adal-angular6';

describe('ProcessInvoiceComponent', () => {
  let component: ProcessInvoiceComponent;
  let fixture: ComponentFixture<ProcessInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessInvoiceComponent ],
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
        HttpClientTestingModule,
        MatDialogModule
        ],
        providers: [ProcessInvoiceService,Adal6Service, {
          provide: Adal6HTTPService,
          useFactory: Adal6HTTPService.factory,
          deps: [Adal6Service]
      },]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
