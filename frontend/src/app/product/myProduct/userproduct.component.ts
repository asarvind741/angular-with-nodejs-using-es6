import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Errors, ProductService } from '../../core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-product-page',
  templateUrl: './userproduct.component.html'
})
export class UserProductComponent implements OnInit {
  public productList: any;
  public imagePath: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.productService.getUserOrderProduct().subscribe((data) => {
      console.log(data);
    });
  }

}

