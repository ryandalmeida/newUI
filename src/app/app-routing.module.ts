import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DonorHomeComponent } from './donor/donor-home/donor-home.component';
import { ApproverHomeComponent } from './approver/approver-home/approver-home.component';
import { ProcessPaymentComponent } from './treasury/process-payment/process-payment.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'approver', component: ApproverHomeComponent, canActivate: [AuthGuard]
    , canActivateChild: [AuthGuard], children: []
  },
  {
    path: '', component: DonorHomeComponent, canActivate: [AuthGuard]
    , canActivateChild: [AuthGuard], children: []
  },
  {
    path: 'treasury', component: ProcessPaymentComponent, canActivate: [AuthGuard]
    , canActivateChild: [AuthGuard], children: []
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
const routing = RouterModule.forRoot(routes);


