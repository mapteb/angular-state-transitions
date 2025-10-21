import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { TransitionsHelper } from '../transitions-helper/transitions-helper';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot) => {
  const transitionsHelper = inject(TransitionsHelper);
  const currentUser = transitionsHelper.getLoggedInUser();
  const allowedRoles = route.data['allowedRoles'];
  if (currentUser) {
    if (allowedRoles && allowedRoles.includes(currentUser.role)) {
      if (state.url.includes('page3')) {
        transitionsHelper.page3UserFound();
      } else if (state.url == 'adminhome') {
        transitionsHelper.adminhomeUserFound();
      } else {
        transitionsHelper.homeUserFound();
      }      
      return true;
    }
    const message = "User " + currentUser.username + " has no access to " + state.url;
    transitionsHelper.userNotAuthorized(message);
    return false;
  }

  return transitionsHelper.userNotFound();
};