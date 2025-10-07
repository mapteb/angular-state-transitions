import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ROLE } from '../guards/role-enum';
import { TransitionsHelper } from '../transitions-helper/transitions-helper';
import { User } from '../transitions-helper/models/user';

@Component({
  selector: 'app-page2',
  imports: [RouterLink],
  templateUrl: './page2.html',
  styleUrl: './page2.css'
})
export class Page2 implements OnInit {
  transitionsHelper = inject(TransitionsHelper);
  user: User | undefined;
  isPage3Authorized: boolean = false;
  page3AllowedRoles = [ ROLE.ADMIN, ROLE.USER ]; // roles allowed to access page3

  constructor() {
    console.log('>> loading page2');
  }
  ngOnInit(): void {
    this.user = this.transitionsHelper.user; // 'user' matches the key defined in the route config
    this.isPage3Authorized = this.user?.role !== undefined && this.page3AllowedRoles.includes(this.user.role as ROLE);    
  }
}
