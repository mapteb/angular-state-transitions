import { Component, inject } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterLink } from '@angular/router';

@Component({
  selector: 'app-app-error',
  imports: [RouterLink],
  templateUrl: './app-error.html',
  styleUrl: './app-error.css'
})
export class AppError {
  // Inject the dependency using the inject function
  private activatedRoute = inject(ActivatedRoute);

  // Declare the property
  public message: string;

  constructor() {
    // Calculate the derived property inside the constructor
    this.message = this.activatedRoute.snapshot.data['message'] || 'Unknown error';
  }
}
