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
import { ApprovePledgeComponent } from './approve-pledge.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SignaturePadModule } from 'angular2-signaturepad';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PledgeService } from '../../services/pledge.service';
import { HttpClient } from '@angular/common/http';
import { PagerService } from '../../services/pagerService.service';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { SortService } from 'src/app/services/sortService.service';
import { ErrorDialogService } from '../../error-dialog/errordialog.service';

describe('ApprovePledgeComponent', () => {
  let component: ApprovePledgeComponent;
  let fixture: ComponentFixture<ApprovePledgeComponent>;

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
        MatDialogModule,
        Ng4LoadingSpinnerModule.forRoot(), 
        ],
        providers: [
          PledgeService,
          PagerService,
          SortService,
          ErrorDialogService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovePledgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test table', (done) => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      let tableRow = fixture.nativeElement.querySelectorAll('mat-header-row');
      let headerRow = tableRow[0];
      expect(headerRow.childNodes[1].innerText).toEqual("")
      expect(headerRow.childNodes[2].innerText).toEqual("PLEDGE ID")
      expect(headerRow.childNodes[3].innerText).toEqual("PROGRAM NAME")
      expect(headerRow.childNodes[4].innerText).toEqual("FUND TYPE")
      expect(headerRow.childNodes[5].innerText).toEqual("DONOR NAME")
      expect(headerRow.childNodes[6].innerText).toEqual("COUNTRY")
      expect(headerRow.childNodes[7].innerText).toEqual("AMOUNT ($)")
      expect(headerRow.childNodes[8].innerText).toEqual("APPROVER")
      expect(headerRow.childNodes[9].innerText).toEqual("START DATE")
      expect(headerRow.childNodes[10].innerText).toEqual("END DATE")
      expect(headerRow.childNodes[11].innerText).toEqual("STATUS")
      done();
    });
  });


  it('revise pledge form invalid when empty', () => {
    expect(component.approvePledgeForm.valid).toBeTruthy();
  });

  it('revise pledge form : pledgeId field validity', () => {
    let pledgeId = component.approvePledgeForm.controls['pledgeId'];
    expect(pledgeId.valid).toBeTruthy();
  });

  it('revise pledge form : donorName field validity', () => {
    let donorName = component.approvePledgeForm.controls['donorName'];
    expect(donorName.valid).toBeTruthy();
  });

  it('revise pledge form : programName field validity', () => {
    let programName = component.approvePledgeForm.controls['programName'];
    expect(programName.valid).toBeTruthy();
  });

  it('revise pledge form : country field validity', () => {
    let country = component.approvePledgeForm.controls['country'];
    expect(country.valid).toBeTruthy();
  });

  it('revise pledge form : pledgeFundType field validity', () => {
    let pledgeFundType = component.approvePledgeForm.controls['pledgeFundType'];
    expect(pledgeFundType.valid).toBeTruthy();
  });

  it('revise pledge form : startDate field validity', () => {
    let startDate = component.approvePledgeForm.controls['startDate'];
    expect(startDate.valid).toBeTruthy();
  });

  it('revise pledge form : endDate field validity', () => {
    let endDate = component.approvePledgeForm.controls['endDate'];
    expect(endDate.valid).toBeTruthy();
  });

  it('revise pledge form : amount field validity', () => {
    let amount = component.approvePledgeForm.controls['amount'];
    expect(amount.valid).toBeTruthy();
  });

  it('revise pledge form : paymentPeriod field validity', () => {
    let paymentPeriod = component.approvePledgeForm.controls['paymentPeriod'];
    expect(paymentPeriod.valid).toBeTruthy();
  });

  it('revise pledge form : installments field validity', () => {
    let installments = component.approvePledgeForm.controls['installments'];
    expect(installments.valid).toBeTruthy();
  });

  it('revise pledge form : comments field validity', () => {
    let comments = component.approvePledgeForm.controls['comments'];
    expect(comments.valid).toBeTruthy();
  });

  it('search pledge form invalid when empty', () => {
    expect(component.searchForm.valid).toBeTruthy();
  });

  it('search pledge form : pledgeId field validity', () => {
    let pledgeId = component.searchForm.controls['pledgeId'];
    expect(pledgeId.valid).toBeTruthy();
  });

  it('search pledge form : pledgeFundType field validity', () => {
    let pledgeFundType = component.searchForm.controls['pledgeFundType'];
    expect(pledgeFundType.valid).toBeTruthy();
  });

  it('search pledge form : startDate field validity', () => {
    let startDate = component.searchForm.controls['startDate'];
    expect(startDate.valid).toBeTruthy();
  });

  it('search pledge form : endDate field validity', () => {
    let endDate = component.searchForm.controls['endDate'];
    expect(endDate.valid).toBeTruthy();
  });

  it('search pledge form : programName field validity', () => {
    let programName = component.searchForm.controls['programName'];
    expect(programName.valid).toBeTruthy();
  });

  it('search pledge form : amount field validity', () => {
    let amount = component.searchForm.controls['amount'];
    expect(amount.valid).toBeTruthy();
  });

});
