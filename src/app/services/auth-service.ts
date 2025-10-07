import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { inject, Injectable, InjectionToken } from '@angular/core';
import { Router } from '@angular/router';
import { LIBRARY_CONFIG, LibraryConfig } from '../transitions-helper/models/config';
import { User } from '../transitions-helper/models/user';
import { map, Observable, throwError } from 'rxjs';

export const MY_SERVICE_TOKEN = new InjectionToken<LibraryConfig>('SecurityConfig');

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http = inject(HttpClient);
  router = inject(Router);
  private config = inject(LIBRARY_CONFIG);

  isAuthenticated(): boolean {
    return true;
  }

  login(user: User): Observable<HttpResponse<User>> {
    return this.http
      .post<HttpResponse<User>>(this.config.authEndpoint, {
        username: user.username,
        password: user.password
      });
      // .pipe(catchError(this.handleHttpError('Login'))
  }

  handleHttpError(operation: string) {
    return (error: HttpErrorResponse) => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(() => new Error(`${operation} failed. Please try again.`));
    };
  }


  logout(): void {
    localStorage.removeItem("appUser");
  }

  // getLoggedUser(): User {
  //   return JSON.parse(localStorage.getItem("appUser")!);
  // }

  isUserAuthenticated(): boolean {
    return !!localStorage.getItem("appUser");
  }

}
