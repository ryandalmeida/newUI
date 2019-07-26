/* import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
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
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { MsAdalAngular6Module, MsAdalAngular6Service, AuthenticationGuard } from 'microsoft-adal-angular6';

import { DashboardComponent } from './donor/dashboard/dashboard.component';
import { PledgeService } from './services/pledge.service';
import { HeaderComponent } from './header/header.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
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
  ReactiveFormsModule,
  FormsModule,
  BrowserAnimationsModule,
  HttpClientTestingModule,
  Ng4LoadingSpinnerModule 
      ],
      declarations: [
        AppComponent,
        DashboardComponent,
        HeaderComponent
      ],
      providers: [PledgeService,MsAdalAngular6Service,
        AuthenticationGuard,]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'WBG-UI'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('WBG-UI');
  });

  afterEach(() => document.querySelector('mat-toolbar').remove());

});
  */