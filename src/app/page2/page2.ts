import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ROLE } from '../guards/role-enum';

@Component({
  selector: 'app-page2',
  imports: [RouterLink],
  templateUrl: './page2.html',
  styleUrl: './page2.css'
})
export class Page2 implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  routeData = toSignal(this.activatedRoute.data);   
  isPage3Authorized: boolean = false;
  page3AllowedRoles = [ ROLE.ADMIN, ROLE.USER ]; // roles allowed to access page3

  constructor() {
    console.log('>> loading page2');
  }
  ngOnInit(): void {
    const user = this.routeData()?.['page2Data']; // 'user' matches the key defined in the route config
    this.isPage3Authorized = this.page3AllowedRoles.includes(user.role);    
  }
}
