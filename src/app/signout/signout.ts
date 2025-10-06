import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../guards/auth-service';

@Component({
  selector: 'app-signout',
  imports: [],
  templateUrl: './signout.html',
  styleUrl: './signout.css'
})
export class Signout {
  authService = inject(AuthService);
  router = inject(Router);  
  constructor() {
    this.authService.logout();
  }

  routeToLogin() {
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
