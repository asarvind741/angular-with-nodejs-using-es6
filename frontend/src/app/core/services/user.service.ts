import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,  BehaviorSubject ,  ReplaySubject } from 'rxjs';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../models';
import { map ,  distinctUntilChanged } from 'rxjs/operators';


@Injectable()
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();
  public setVerificationValue: boolean;

  constructor (
    private apiService: ApiService,
    private http: HttpClient,
    private jwtService: JwtService
  ) {}



  setAuth(token) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(token);
  }


  attemptAuth(credentials) {
    return this.apiService.post('/signup' ,  credentials);
 }

 login(credentials) {
  return this.apiService.post('/login' ,  credentials);
 }

getVerifyEmail() {
  return this.apiService.get('/getVerifyEmail');
}

setVerification() {
  this.setVerificationValue = true;
}
getVerification() {
  return this.setVerificationValue;
}

}
