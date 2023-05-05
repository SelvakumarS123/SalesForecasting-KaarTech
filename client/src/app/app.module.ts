import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { UserAccessComponent } from './components/user-access/user-access.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PredictionComponent } from './components/prediction/prediction.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from './authguard.service';
import { LoggedInAuthGuard } from './loggedInAuthGuard.service';
import { PredictionAuthGuard } from './predictionAuthGuard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    UserAccessComponent,
    DashboardComponent,
    PredictionComponent,
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
  providers: [AuthGuard, LoggedInAuthGuard, PredictionAuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
