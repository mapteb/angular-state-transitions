import { Routes } from '@angular/router';
import { Page2 } from './page2/page2';
import { Page1 } from './page1/page1';
import { Page3 } from './page3/page3';
import { Page4 } from './page4/page4';
import { authGuard, roleGuard } from './guards/auth-guard';
import { Page5 } from './page5/page5';
import { Home } from './home/home';
import { Signout } from './signout/signout';
import { Login } from './login/login';
import { AdminHome } from './admin-home/admin-home';
import { ROLE } from './guards/role-enum';
import { resolveHome } from './home/resolve-home';
import { AppError } from './app-error/app-error';
import { resolvePage2 } from './page2/resolve-page2';


export const routes: Routes = [
  { path: 'login', component: Login   },
  { path: 'adminhome', component: AdminHome,
    canActivate: [authGuard],
    data: {allowedRoles: [ROLE.ADMIN]}
  },   
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: Home, 
    canActivate: [authGuard],
    data: {allowedRoles: [ROLE.ADMIN, ROLE.USER, ROLE.GUEST ]},
    resolve: { user: resolveHome  },
    children: [
      { path: 'page1', component: Page1 },
      {
        path: 'page2', component: Page2,
        resolve: { page2Data: resolvePage2 },        
      },
      {
        path: 'page3', component: Page3,
        canActivate: [authGuard],
        data: {allowedRoles: [ROLE.ADMIN, ROLE.USER ]}, // page3 allowed only for admin and user roles  
        children: [
          { path: 'page4', component: Page4 },
          { path: 'page5', component: Page5 }
        ]
      },
    ]
  },
  { path: 'signout', redirectTo: 'login' }, // Signout component just logs out and redirects to login 
  { path: 'apperror', component: AppError }, // just a placeholder 
  { path: '**', redirectTo: 'apperror', data: {message: 'unrecognized app URL'} } // wildcard route for a 404 page
];
