import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { UserAccessComponent } from './components/user-access/user-access.component';
import { PredictDatasetComponent } from './components/predict-dataset/predict-dataset.component';
import { PredictionResultComponent } from './components/prediction-result/prediction-result.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from './authguard.service';
import { LoggedInAuthGuard } from './loggedInAuthGuard.service';
import { PredictionResultAuthGuard } from './predictionResultAuthGuard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    UserAccessComponent,
    PredictDatasetComponent,
    PredictionResultComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
  ],
  providers: [AuthGuard, LoggedInAuthGuard, PredictionResultAuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
