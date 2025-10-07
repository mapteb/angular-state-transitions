import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { TransitionsHelper } from '../transitions-helper/transitions-helper';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot) => {
  const transitionsHelper = inject(TransitionsHelper);
  const router = inject(Router);
  const currentUser = transitionsHelper.getLoggedInUser();
  const allowedRoles = route.data['allowedRoles'];
  if (currentUser) {
    if (allowedRoles && allowedRoles.includes(currentUser.role)) {
      transitionsHelper.setUser(currentUser);
      return true;
    }
    console.log(">> currentUser has no allowedroles: ", currentUser);
    const message = "User " + currentUser.username + " has no access to " + route.url;


    console.log(">> currentUser has no allowedroles: ", currentUser);
    // return router.createUrlTree(['/login'], {
    //   queryParams: { message: message },
    //   queryParamsHandling: 'merge' // or 'preserve', 'merge' is often useful
    // }); 
    transitionsHelper.authenticationError.set(message);   
    router.navigate(['/login'], { replaceUrl: true, skipLocationChange: false  });
    // return router.createUrlTree(['/login'])
    // return false;
  }

  return router.createUrlTree(['/login']);
};