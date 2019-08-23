import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DonorHomeComponent } from './donor/donor-home/donor-home.component';
import { ApproverHomeComponent } from './approver/approver-home/approver-home.component';
import { AuthenticationGuard } from './common/guards/authentication-guard';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';



const routes: Routes = [ 
  {
    path: '', redirectTo: 'donor', pathMatch: 'full'
  },
/*   {
    path: 'donor', component: DonorHomeComponent
  }, */
/*   {
    path: 'approver', component: ApproverHomeComponent
  }, */
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: '', component: DonorHomeComponent, canActivate: [AuthenticationGuard], canActivateChild: [AuthenticationGuard], children: [
    { path: '', component: DonorHomeComponent }
  ]},
   { path: 'approver', component: ApproverHomeComponent, canActivate: [AuthenticationGuard], canActivateChild: [AuthenticationGuard], children: [
    { path: 'approver', component: ApproverHomeComponent }]} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
