import { inject, Injectable, signal } from "@angular/core";
import { AuthService } from "../services/auth-service";
import { User } from "./models/user";
import { catchError, first, map, of } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { ROLE } from "../guards/role-enum";
import { Router } from "@angular/router";

/* This TransitionsHelper acts as a provider of data for the components 
 * and auth guards and also as a state transitions enabler.
 * Maintains data state across various view transitions
 */
@Injectable({
    providedIn: 'root'  
})
export class TransitionsHelper {
    router = inject(Router);
    authService = inject(AuthService);
    user: User | undefined;
    authenticationError = signal<string>('')
    constructor() {
        console.log('>> TransitionsHelper instance created');
        this.user = this.getLoggedInUser() ? this.getLoggedInUser() : undefined; 
    }

    getLoggedInUser(): User {   
        return JSON.parse(localStorage.getItem("appUser")!) as User;
    }

    public setUser(user: User) {
        this.user = user;
    }

    public authenticate(user: User): void {
            this.authenticationError.set(''); '';
            this.authService.login(user)
              .pipe(
                first(),
                map(usr => usr.body as User)
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
                      this.authenticationError.set("Unknown user");
                      console.log(">> login error...: ", this.authenticationError() );
                      this.router.navigateByUrl('/login', {replaceUrl: true});
                    }
                  }
                },
                error: (error: HttpErrorResponse) => {
                  if (error.status === 400) {
                    console.error('Bad Request: Invalid credentials or malformed input.', error);
                    // Optionally show a user-friendly message or return a fallback
                  } if (error.status === 401) {
                    console.error('>> Auth Error: ', error);
                  } else if (error.status === 404) {
                    console.error('Not Found: Login endpoint or user not found.', error);
                    // You might redirect or notify the user
                  } else {
                    console.error(`Unexpected error (${error.status}):`, error);
                  }
        
                  // Return an observable error to propagate or handle downstream
                  // return throwError(() => new Error('Login failed. Please try again.'));
                  this.authenticationError.set('Login failed. Please try again.');
                    console.error(`Unexpected error (${error.status}):`, error);
                  this.router.navigate(['/login']);
                }
              });
        
    }

    public logout(): void { 
        localStorage.removeItem("appUser");
    }
}