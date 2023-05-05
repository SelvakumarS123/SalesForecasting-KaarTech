import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAccessComponent } from './components/user-access/user-access.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PredictionComponent } from './components/prediction/prediction.component';
import { AuthGuard } from './authguard.service';
import { LoggedInAuthGuard } from './loggedInAuthGuard.service';
import { PredictionAuthGuard } from './predictionAuthGuard.service';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'prediction',
    component: PredictionComponent,
    canActivate: [PredictionAuthGuard],
  },
  {
    path: '',
    component: UserAccessComponent,
    canActivate: [LoggedInAuthGuard],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
