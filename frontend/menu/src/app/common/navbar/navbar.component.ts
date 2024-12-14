import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  menuActive: boolean = false;
  
  constructor(public router: Router) { }

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }

  navigateToOrderManagement() {
    this.router.navigate(['/list']);
  }

  navigateToMenuManagement() {
    this.router.navigate(['/menu']);
  }
  
  navigateToUserManagement() {
    this.router.navigate(['/user']);
  }
}
