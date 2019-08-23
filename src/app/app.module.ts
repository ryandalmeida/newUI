import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
  MatSortModule,
  MatCheckboxModule 
} from '@angular/material';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Http, HttpModule } from '@angular/http';
//import { AdalService, Adal4HTTPService } from 'adal-angular4';
import { MsAdalAngular6Module } from 'microsoft-adal-angular6';
import { Adal6HTTPService, Adal6Service } from 'adal-angular6';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './donor/dashboard/dashboard.component';
import { InitiatePledgeComponent, PledgeCreatedDialog } from './donor/initiate-pledge/initiate-pledge.component';
import { PledgeService } from './services/pledge.service';
import { DonorHomeComponent } from './donor/donor-home/donor-home.component';
import { ApproverHomeComponent } from './approver/approver-home/approver-home.component';
import { ApprovePledgeComponent } from './approver/approve-pledge/approve-pledge.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthenticationGuard } from './common/guards/authentication-guard';

@NgModule({
  declarations: [
    AppComponent,
    PledgeCreatedDialog,
    DashboardComponent,
    InitiatePledgeComponent,
    DonorHomeComponent,
    ApproverHomeComponent,
    ApprovePledgeComponent,
    LoginComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatGridListModule,
    MatListModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule 
  ],
  providers: [PledgeService,
    Adal6Service,
    {
        provide: Adal6HTTPService,
        useFactory: Adal6HTTPService.factory,
        deps: [Http, Adal6Service]
    },
    AuthenticationGuard],
  bootstrap: [AppComponent],
  entryComponents: [PledgeCreatedDialog],
})
export class AppModule { }
