import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAccessComponent } from './components/user-access/user-access.component';
import { PredictDatasetComponent } from './components/predict-dataset/predict-dataset.component';
import { PredictionResultComponent } from './components/prediction-result/prediction-result.component';
import { AuthGuard } from './authguard.service';
import { LoggedInAuthGuard } from './loggedInAuthGuard.service';
import { PredictionResultAuthGuard } from './predictionResultAuthGuard.service';

const routes: Routes = [
  {
    path: 'prediction-dashboard',
    component: PredictDatasetComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'prediction-result',
    component: PredictionResultComponent,
    canActivate: [PredictionResultAuthGuard],
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
