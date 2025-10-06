import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [ RouterOutlet ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
  isMenuVisible = signal(true);;
  isExpanded = signal(true);

  toggleLeftMenu() {
    this.isMenuVisible.update((value) => !value);    
  }
}
