import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserManagementService } from './user-management.service';
import { SnackbarService } from '../common/snackbar/snackbar.service';
import { NavbarComponent } from "../common/navbar/navbar.component";
import { UserManagementViewComponent } from "./user-management-view/user-management-view.component";

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [NavbarComponent, UserManagementViewComponent],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit {

  users: User[] = [];

  constructor(public userManagementService: UserManagementService, public snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.userManagementService.getUsers()
      .subscribe(u => {
        if (u && u.length > 0) {
          this.users = u;
        }
      })
  }

  confirmUser(user: User) {
    this.userManagementService.confirmUser(user)
      .subscribe(u => {
        if (u) {
          this.snackbarService.notifyMessage(`User:${u.userNickname} has been confirmed`);
          window.location.reload();
        }
      }, error => {
        console.log(error);
        this.snackbarService.notifyMessage(`Fail to update ${user.userEmail}`);
      }
      )
  }

  rejectUser(user: User) {
    this.userManagementService.rejectUser(user)
      .subscribe(u => {
        if (u) {
          this.snackbarService.notifyMessage(`User:${u.userNickname} has been rejected`);
          window.location.reload();
        }
      }, error => {
        console.log(error);
        this.snackbarService.notifyMessage(`Fail to update ${user.userEmail}`);
      }
      )
  }

}
