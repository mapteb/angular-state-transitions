import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { User } from '../guards/models/user';
import { ROLE } from '../guards/role-enum';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  user: User | undefined; 
  isAdmin = false;

  constructor() {} 

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ user }) => {
      this.user = user; // 'user' matches the key defined in the route config
      console.log(">> home user: ", this.user); 
      if (this.user && this.user.role == ROLE.ADMIN) {  
        this.isAdmin = true;  
      }
    });
  }

  isMenuVisible = true;

  toggleLeftMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }

}
