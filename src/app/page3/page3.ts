import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-page3',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './page3.html',
  styleUrl: './page3.css'
})
export class Page3 {
  private router = inject(Router);

  constructor() {
    console.log('>> loading page3');

  }

  navigateToPage5() {
    this.router.navigate(['/home/page3/page5']);
  }
}
