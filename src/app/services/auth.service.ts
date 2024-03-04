import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http'
import { apiUrls } from '../api.urls';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);




  registerService(registerObject: any) {
    return this.http.post(`${apiUrls.authServiceApi}/register`
      , registerObject)
  }

  loginService(loginObject: any) {
    return this.http.post(`${apiUrls.authServiceApi}/login`
      , loginObject, { observe: 'response', withCredentials: true })
  }

  verifyService(verificiationToken: string) {
    return this.http.get(`${apiUrls.authServiceApi}/verify?token=${verificiationToken}`)
  }

  sendResetPasswordTokenEmailService(email: string) {
    return this.http.post(`${apiUrls.authServiceApi}/forgot-password`, { email: email })
  }

  resetPasswordService(resetObj: any) {
    return this.http.post(`${apiUrls.authServiceApi}/reset-password`, resetObj)
  }

  authStatus(): Observable<HttpResponse<object>> {
    return this.http.get(`${apiUrls.authServiceApi}/status`,
      { observe: 'response', withCredentials: true });
  }
}
