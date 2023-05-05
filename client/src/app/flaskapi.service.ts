import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetData } from './models/GetData';
import { GetPrediction } from './models/GetPrediction';
import { SignInData } from './models/SignInData';
import { SignUpData } from './models/SignUpData';
@Injectable({
  providedIn: 'root',
})
export class FlaskapiService {
  constructor(private httpClient: HttpClient) {}

  public server: string = 'http://localhost:5000/';

  public getCurrentPrediction(email: any) {
    return this.httpClient.get<GetPrediction>(
      this.server + `currentPrediction/${email}`
    );
  }
  public postData(data: GetData, file: any, email: any) {
    const {predictColumn, periodicity, numericalValue } = data;
    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.append('email', email);
    formData.append('predictColumn', predictColumn);
    formData.append('periodicity', periodicity);
    formData.append('numericalValue', numericalValue);
    console.log(JSON.stringify(formData));
    return this.httpClient.post<GetData>(
      this.server + `getPredictions/${email}`,
      formData
    );
  }
  public signIn(signInFormData: SignInData) {
    const formData: FormData = new FormData();
    const { email, password } = signInFormData;
    formData.append('email', email);
    formData.append('password', password);
    var tmp = this.httpClient.post<SignInData>(this.server + 'sign-in', formData);
    console.log("sign-in by selva");
    console.log(tmp);
    return tmp;
  }
  public signUp(signUpFormData: SignUpData) {
    const { fullName, email, password } = signUpFormData;
    const formData: FormData = new FormData();
    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('password', password);
    return this.httpClient.post<SignUpData>(this.server + 'sign-up', formData);
  }
  public signOut() {
    return this.httpClient.get<any>(this.server + 'logout');
  }
}
