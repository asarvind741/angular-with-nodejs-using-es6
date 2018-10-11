import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Errors, UserService, JwtService } from '../../core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    authType: String = '';
  title: String = '';
  errors: Errors = {errors: {}};
  isSubmitting = false;
  authForm: FormGroup;
  validation_messages = {
    'email' : [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Your email is not valid.' }],
    'password': [{ type: 'required', message: 'Password is required.' }]
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private jwtService: JwtService
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]),
      password: new FormControl('', [Validators.required]),
  });
  }

  ngOnInit() {
    this.jwtService.destroyToken();
  }

  submitForm() {
    this.isSubmitting = true;
    this.errors = {errors: {}};

    const credentials = this.authForm.value;
    this.userService
    .login(credentials)
    .subscribe(
      data => {
        if (!data.error) {
          this.authForm.reset();
        } else {

        }
              },
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }
}

