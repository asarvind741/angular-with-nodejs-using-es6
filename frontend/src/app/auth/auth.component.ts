import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Errors, UserService } from '../core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
  authType: String = '';
  title: String = '';
  errors: Errors = {errors: {}};
  isSubmitting = false;
  authForm: FormGroup;
  validation_messages = {
    'firstName': [{ type: 'required', message: 'Name is required.' }],
    'lastName': [{ type: 'required', message: 'Name is required.' }],
    'email' : [
      { type: 'required', message: 'Email is required.' },                
      { type: 'pattern', message: 'Your email is not valid.' }],
    'password': [{ type: 'required', message: 'Password is required.' },
    { type: 'pattern', message: 'Password should be 6 digit long and should also contain at least one uppercase,lowercase,special character.' }],
    'confirmPassword': [{ type: 'required', message: 'Confirm password is required.' }]
    }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      firstName: new FormControl('', [Validators.required]),
      lastName:  new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]),
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^\w\s]).{6,}$')]),
      confirmPassword: new FormControl('', [Validators.required])
  });
  }

  ngOnInit() {
    this.route.url.subscribe(data => {
      
    });
  }

  submitForm() {
    this.isSubmitting = true;
    this.errors = {errors: {}};

    const credentials = this.authForm.value;
    this.userService
    .attemptAuth(credentials)
    .subscribe(
      data => { 
        if(!data.error){
          this.toastr.success("An email have been sent for verification.");
          this.authForm.reset();
        } else {
          this.toastr.error("Email already exist");
        } 
              },
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }

  passwordMatch(AC: FormControl) {
   
      let password = AC.get('password').value; // to get value in input tag
      console.log(password);
      let confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
      console.log(confirmPassword);
       if(password != confirmPassword) {
      
           AC.get('confirmPassword').setErrors( {MatchPassword: true} )
       } else {
           console.log('true');
           return null
       }
   
}
}

