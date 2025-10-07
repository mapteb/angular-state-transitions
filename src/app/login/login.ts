import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LIBRARY_CONFIG } from '../transitions-helper/models/config';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TransitionsHelper } from '../transitions-helper/transitions-helper';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [MatCardModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule]
})
export class Login implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  });

  transitionsHelper = inject(TransitionsHelper); 
  error = '';
 
  router = inject(Router);
  // activatedRoute = inject(ActivatedRoute);
  config = inject(LIBRARY_CONFIG);

  ngOnInit() {
    this.error = this.transitionsHelper.authenticationError();
    console.log(">> clearing localstorage: ");
    this.transitionsHelper.logout();    
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const user = this.loginForm.value;
    this.transitionsHelper.authenticate(user!);
    this.error = this.transitionsHelper.authenticationError();
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.loginForm.get(controlName)!;
    return control.touched && control.invalid;
  }
}
