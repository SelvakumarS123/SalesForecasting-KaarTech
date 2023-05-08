import { Component, ElementRef, OnInit, ViewChild,HostListener, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
// import { AuthGuard } from 'src/app/authguard.service';
import { FlaskapiService } from 'src/app/flaskapi.service';
// import { SignInData } from 'src/app/models/SignInData';
// import { SignUpData } from 'src/app/models/SignUpData';

@Component({
  selector: 'app-user-access',
  templateUrl: './user-access.component.html',
  styleUrls: ['./user-access.component.css'],
  providers: [FlaskapiService],
})
export class UserAccessComponent implements OnInit {
  public signInSubscription: Subscription; 
  // The Subscription type is part of the RxJS library, which is often used in Angular applications 
  // for handling asynchronous operations. A Subscription object represents a disposable resource, such as an Observable stream,
  //  and can be used to unsubscribe from the resource when it is no longer needed.
  public signUpSubscription: Subscription;
  signInForm: FormGroup; // used to create and manage reactive forms in Angular.
  signInFormData: any;
  signUpForm: FormGroup;
  signUpFormData: any;
  actions: string = 'Login';
  signInError: any;
  showSignInError: any;
  signUpError: any;
  showSignUpError: any;
  signInSubmitted: boolean = false;
  signUpSubmitted: boolean = false;
  @ViewChild('signupform') signup: ElementRef;
  @ViewChild('loginform') login: ElementRef;
  constructor(
    private flaskApiService: FlaskapiService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
    this.signUpForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnDestroy() {
    if (this.signInSubscription) {
      this.signInSubscription.unsubscribe();
    }
    if (this.signUpSubscription) {
      this.signUpSubscription.unsubscribe();
    }
  }

  signUp() {
    this.signUpSubmitted = true;
    if (this.signUpForm.valid) {
      this.signUpFormData = {
        fullName: this.signUpForm.controls['fullName'].value,
        email: this.signUpForm.controls['email'].value,
        password: this.signUpForm.controls['password'].value,
      };
      this.signUpSubscription = this.flaskApiService
        .signUp(this.signUpFormData)
        .subscribe({
          next: (response) => {
            this.showSignUpError = false;
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem(
              'name',
              response['data']['userInfo']['fullName']
            );

            localStorage.setItem(
              'email',
              response['data']['userInfo']['email']
            );
            this.router.navigate(['/dashboard']);
          },
          error: (error) => {
            this.signUpError = error['error']['text'];
            this.showSignUpError = true;
          },
        });
      this.signUpSubmitted = false;
    }
  }

  signIn() {
    this.signInSubmitted = true;
    if (this.signInForm.valid) {
      this.signInFormData = {
        email: this.signInForm.controls['email'].value,
        password: this.signInForm.controls['password'].value,
      };
      this.signInSubscription = this.flaskApiService
        .signIn(this.signInFormData)
        .subscribe({
          next: (response) => {
            console.log(response);
            this.showSignInError = false;
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem(
              'name',
              response['data']['userInfo']['fullName']
            );
            localStorage.setItem(
              'email',
              response['data']['userInfo']['email']
            );
            this.router.navigate(['dashboard']);
          },
          error: (error) => {
            this.signInError = error['error']['text'];
            this.showSignInError = true;
          },
        });
      this.signInSubmitted = false;
    }
  }

  changeSignInInput() {
    this.showSignInError = false;
  }
  changeSignUpInput() {
    this.showSignUpError = false;
  }
}
