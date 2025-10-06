import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, first, map } from 'rxjs/operators';
import { AuthService } from '../guards/auth-service';
import { LIBRARY_CONFIG } from '../guards/models/config';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ROLE } from '../guards/role-enum';
import { User } from '../guards/models/user';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [MatCardModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule]
})
export class Login {

  loginForm = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  });

  error = '';
  authService = inject(AuthService);
  router = inject(Router);
  config = inject(LIBRARY_CONFIG);

  constructor() {
    // 1. Access the global history.state object
    // No need to inject ActivatedRoute or Router if only accessing history.state
    const navigationState = history.state;

    // 2. Check if the 'message' property was passed during the navigation
    if (navigationState && navigationState['message']) {
      this.error = navigationState['message'];
    }

    // 3. Clear local storage on login page load 
    console.log(">> clearing localstorage: ");
    this.authService.logout();
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const user = this.loginForm.value;
    this.error = '';
    this.authService.login(user)
      .pipe(
        first(),
        map(usr => usr.body as User),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 400) {
            console.error('Bad Request: Invalid credentials or malformed input.', error);
            // Optionally show a user-friendly message or return a fallback
          } else if (error.status === 404) {
            console.error('Not Found: Login endpoint or user not found.', error);
            // You might redirect or notify the user
          } else {
            console.error(`Unexpected error (${error.status}):`, error);
          }

          // Return an observable error to propagate or handle downstream
          // return throwError(() => new Error('Login failed. Please try again.'));
          return of({} as User);  
        })
      )
      .subscribe({
        next: (usr: User) => {
          console.log(">>> usr: ", usr);
          if (user) {
            if (usr.role == ROLE.ADMIN) {
              console.log(">> setting adminuser: ", usr);
              localStorage.setItem("appUser", JSON.stringify(usr));
              this.router.navigate(['/adminhome']);
            } else if (usr.role == ROLE.USER || usr.username == ROLE.GUEST) {
              localStorage.setItem("appUser", JSON.stringify(usr));
              this.router.navigate(['/home']);
            } else {
              this.error = "Unknown user";
              console.log(">> login error: ", this.error);
            }
          }
        },
        error: error => {
          console.log(">> login error: ", error);
          this.error = error;
        }
      });
  }


  isControlInvalid(controlName: string): boolean {
    const control = this.loginForm.get(controlName)!;
    return control.touched && control.invalid;
  }
}
