import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DonorHomeComponent } from './donor/donor-home/donor-home.component';
import { ApproverHomeComponent } from './approver/approver-home/approver-home.component';
import { TreasuryHomeComponent } from './treasury/treasury-home/treasury-home.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'approver', component: ApproverHomeComponent , canActivate: [AuthGuard]
    , canActivateChild: [AuthGuard], children: []},
  {
    path: '', component: DonorHomeComponent, canActivate: [AuthGuard]
    , canActivateChild: [AuthGuard], children: []
  },
  {
    path: 'treasury', component: TreasuryHomeComponent, canActivate: [AuthGuard]
    , canActivateChild: [AuthGuard], children: []
  },
  {
    path: 'admin', component: AdminHomeComponent, canActivate: [AuthGuard]
    , canActivateChild: [AuthGuard], children: []
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
const routing = RouterModule.forRoot(routes);


