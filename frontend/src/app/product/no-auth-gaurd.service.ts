import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService, ProductService } from '../core';
import { map ,  take } from 'rxjs/operators';

@Injectable()
export class NoAuthGuard  {
  constructor(
    private router: Router,
    private productService: ProductService
  ) {}

 }
