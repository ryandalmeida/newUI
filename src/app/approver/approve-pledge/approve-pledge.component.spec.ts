import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
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

import { ApprovePledgeComponent } from './approve-pledge.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SignaturePadModule } from 'angular2-signaturepad';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PledgeService } from '../../services/pledge.service';
import { Adal6Service, Adal6HTTPService } from 'adal-angular6';
import { HttpClient } from '@angular/common/http';
import { PagerService } from '../../services/pagerService.service'


describe('ApprovePledgeComponent', () => {
  let component: ApprovePledgeComponent;
  let fixture: ComponentFixture<ApprovePledgeComponent>;
  let httpClient: HttpClient;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovePledgeComponent ],
       imports: [
        ReactiveFormsModule,
        FormsModule,MatIconModule,
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
        providers: [PledgeService,PagerService, Adal6Service, {
          provide: Adal6HTTPService,
          useFactory: Adal6HTTPService.factory,
          deps: [Adal6Service]
        },]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovePledgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpClient = TestBed.get(HttpClient);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 /*  */
});
