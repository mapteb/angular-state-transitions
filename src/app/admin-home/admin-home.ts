import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { User } from '../transitions-helper/models/user';

@Component({
  selector: 'app-admin-home',
  imports: [RouterLink],
  templateUrl: './admin-home.html',
  styleUrl: './admin-home.css'
})
export class AdminHome {
  user: User | undefined;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ user }) => {
      this.user = user; // 'user' matches the key defined in the route config
    });
  }
}
