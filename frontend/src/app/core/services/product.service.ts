import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,  BehaviorSubject ,  ReplaySubject } from 'rxjs';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../models';
import { map ,  distinctUntilChanged } from 'rxjs/operators';


@Injectable()
export class ProductService {

  constructor (
    private apiService: ApiService,
    private http: HttpClient,
    private jwtService: JwtService
  ) {}

getProduct() {
    return this.apiService.get('/getProduct');
 }

 addOrder(product) {
   console.log(product);
    return this.apiService.post('/saveOrder', product);
 }

 isAuthenticated() {
    return this.apiService.get('/isAuthenticate');
 }
 getUserOrderProduct() {
  return this.apiService.get('/getUserOrderProduct');
 }
}
