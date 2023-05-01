import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { GetData } from 'src/app/models/GetData';
import { FlaskapiService } from 'src/app/flaskapi.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-predict-dataset',
  templateUrl: './predict-dataset.component.html',
  styleUrls: ['./predict-dataset.component.css'],
  providers: [FlaskapiService],
})
export class PredictDatasetComponent implements OnInit {
  public signOutSubscription: Subscription;
  isLoggedIn: boolean;
  fullName: any;
  email: any;
  public predictDatasetSubscription: Subscription;
  predictForm: FormGroup;
  submitted: boolean = false;
  formData: any;
  current: any;
  logInAlert: boolean;
  public file: any;

  constructor(
    private flaskApiService: FlaskapiService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.fullName = localStorage.getItem('name');
    this.email = localStorage.getItem('email');
    this.predictForm = this.formBuilder.group({
      file: ['', Validators.required],
      predictColumn: ['', Validators.required],
      periodicity: ['', Validators.required],
      numericalValue: ['', [Validators.required, Validators.min(1)]],
    });
    if (localStorage.getItem('isLoggedIn') == 'false') {
      this.isLoggedIn = false;
    } else {
      this.isLoggedIn = true;
    }
    if (localStorage.getItem('email')) {
      this.logInAlert = false;
    } else {
      this.current = 'Please login to start predicting!';
      this.logInAlert = true;
    }
  }
  ngOnDestroy() {
    if (this.signOutSubscription) {
      this.signOutSubscription.unsubscribe();
    }
    if (this.predictDatasetSubscription) {
      this.predictDatasetSubscription.unsubscribe();
    }
  }
  getFile(event: any) {
    this.file = event.target.files[0];
  }

  submitData() {
    this.submitted = true;
    if (this.predictForm.valid) {
      this.formData = {
        predictColumn: this.predictForm.controls['predictColumn'].value,
        periodicity: this.predictForm.controls['periodicity'].value,
        numericalValue: this.predictForm.controls['numericalValue'].value,
      };
      this.predictDatasetSubscription = this.flaskApiService
        .postData(this.formData, this.file, localStorage.getItem('email'))
        .subscribe((response) => {
          localStorage.setItem('show', 'true');
          this.router.navigate(['/prediction-result']);
          this.submitted = false;
        });
    }
  }

  signOut() {
    this.signOutSubscription = this.flaskApiService
      .signOut()
      .subscribe((response) => {
        localStorage.setItem('isLoggedIn', 'false');
        localStorage.setItem('email', '');
        localStorage.setItem('show', 'false');
        localStorage.setItem('name', '');
        this.router.navigate(['']);
      });
  }
}
