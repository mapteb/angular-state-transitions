import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth-service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const currentUser = authService.getLoggedUser();
  const allowedRoles = route.data['allowedRoles'];
  if (currentUser) {
    if (allowedRoles && allowedRoles.includes(currentUser.role)) {
      return true;
    }
    console.log(">> currentUser has no allowedroles: ", currentUser);
    // router.createUrlTree(['/login']);
    const message = "User " + currentUser.username + " has no access to " + route.url;  
    router.navigateByUrl('/login', { replaceUrl: true, state: { message }   });
    return false;
  }

  return router.createUrlTree(['/login']);
  // router.navigateByUrl('/login', { replaceUrl: true });
  // console.log(">> router: ", router.url); 
  // return false;
};


export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const currentUser = authService.getLoggedUser();
  const expectedRole = route.data['expectedRole'];
  console.log(">> expRole: ", expectedRole);
  if (expectedRole && expectedRole == currentUser.role) {
    return true;
  }

  // router.navigate(['/login']);
  authService.logout();
  return false;
};