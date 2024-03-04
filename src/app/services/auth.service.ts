import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { apiUrls } from '../api.urls';
import { Observable, from, of } from 'rxjs';

// fake login status
let isLoggedIn = false;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);

  registerService(registerObject: any) {
    return this.http.post(`${apiUrls.authServiceApi}/register`, registerObject);
  }

  loginService(loginObject: any) {
    isLoggedIn = true;
    return of({ status: isLoggedIn });
  }

  verifyService(verificiationToken: string) {
    return this.http.get(
      `${apiUrls.authServiceApi}/verify?token=${verificiationToken}`
    );
  }

  sendResetPasswordTokenEmailService(email: string) {
    return this.http.post(`${apiUrls.authServiceApi}/forgot-password`, {
      email: email,
    });
  }

  resetPasswordService(resetObj: any) {
    return this.http.post(`${apiUrls.authServiceApi}/reset-password`, resetObj);
  }

  authStatus(): Observable<{ status: boolean }> {
    return of({ status: isLoggedIn });
  }
}
