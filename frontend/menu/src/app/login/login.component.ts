import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { LoginViewComponent } from "./login-view/login-view.component";
import { User } from '../model/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginViewComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private readonly authService: AuthService){}

  login(userData: User): void {
    this.authService.login(userData);
  }
}
