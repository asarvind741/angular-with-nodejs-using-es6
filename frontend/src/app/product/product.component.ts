import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Errors, ProductService, UserService } from '../core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-product-page',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {
  public productList: any;
  public imagePath: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private userService: UserService
  ) {}

  ngOnInit() {
    if (this.userService.getVerification()) {
      this.toastr.success('Email verification done successfully');
    }
    this.productService.getProduct().subscribe((data: any) => {
       this.productList = data.data;
    });
    this.imagePath = environment.api_url + '/images/';
  }

  addToCart(id) {
      this.productService.addOrder({'productId': id}).subscribe((data) => {
        this.toastr.success('product add to cart');
      });
  }

}

