import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { User } from '../transitions-helper/models/user';
import { ROLE } from '../guards/role-enum';
import { TransitionsHelper } from '../transitions-helper/transitions-helper';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  transitionsHelper = inject(TransitionsHelper);
  activatedRoute = inject(ActivatedRoute);
  user: User | undefined;
  isAdmin = false;

  constructor() { }

  ngOnInit(): void {
    this.user = this.transitionsHelper.user;
    if (this.user && this.user.role == ROLE.ADMIN) {
      this.isAdmin = true;
    }
  }

  isMenuVisible = true;

  toggleLeftMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }

}
