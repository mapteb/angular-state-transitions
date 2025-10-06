// hero.resolver.ts
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Router, RouterStateSnapshot } from '@angular/router';
import { User } from '../guards/models/user';
import { AuthService } from '../guards/auth-service';
import { of } from 'rxjs';


export const resolveHome: ResolveFn<User> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const authService = inject(AuthService);
    return of(authService.getLoggedUser());
};