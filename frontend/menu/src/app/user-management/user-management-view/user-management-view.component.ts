import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../model/user';
import { CommonModule } from '@angular/common';
import { UserStatus } from '../../code';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-management-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-management-view.component.html',
  styleUrl: './user-management-view.component.css'
})
export class UserManagementViewComponent {

  @Input() users: User[] = [];
  @Output() confirmUserEvent = new EventEmitter<User>();
  @Output() rejectUserEvent = new EventEmitter<User>();

  USER_STATUS_AWAITING_APPROVAL = UserStatus.APPROVAL_AWAITING;
  USER_STATUS_CONFIRMED = UserStatus.CONFIRMED;
  USER_STATUS_REJECTED = UserStatus.REJECTED;

  filterStatus: string = this.USER_STATUS_AWAITING_APPROVAL;

  get filteredUsers(): User[] {
    return this.filterStatus ? this.users.filter(u => u.userStatus === this.filterStatus) : this.users;
  }

  confirmUser(aUser: User) {
    this.confirmUserEvent.emit(aUser);
  }

  rejectUser(aUser: User) {
    this.rejectUserEvent.emit(aUser);
  }
}
