import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Errors, UserService } from '../../core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-verify-page',
  templateUrl: './verify.component.html'
})
export class VerificationComponent implements OnInit {
  
  constructor(private userService: UserService, 
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
     this.route.params.subscribe(params => {
        this.userService.setAuth(params['key']);
          this.userService.getVerifyEmail().subscribe((data) => {
            this.userService.setVerification();
             this.router.navigate(['/product']);
          })
    })
  }

}

