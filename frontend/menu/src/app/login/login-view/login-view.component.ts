import { Component, EventEmitter, Output } from '@angular/core';
import { UserType } from '../../code';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-view',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-view.component.html',
  styleUrl: './login-view.component.css'
})
export class LoginViewComponent {
  @Output() loginEvent = new EventEmitter<any>();

  userLoginForm: FormGroup;

  constructor(){
    this.userLoginForm = new FormGroup({
      userNickname: new FormControl('', [Validators.required, Validators.minLength(4)]),
      userEmail: new FormControl('', [Validators.required, Validators.email]),
    })
  }

  emitLoginEvent(){
    if (this.userLoginForm.valid){
      let userData = {
        userNickname: this.userLoginForm.get('userNickname')?.value,
        userEmail: this.userLoginForm.get('userEmail')?.value,
        userType: UserType.CUSTOMER
      }
      this.loginEvent.emit(userData);
    }
  }
}
