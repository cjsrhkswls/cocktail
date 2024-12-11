import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './model/user';
import { Router } from '@angular/router';
import { UserType } from './code';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { SnackbarService } from './common/snackbar/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  profile: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  private readonly USER_KEY = 'currentUserProfile';
  currentProfile = this.profile.asObservable();
  apiBaseUrl = environment.backendAPIBase;

  constructor(public router: Router, public httpClient: HttpClient, public snackbarService: SnackbarService) { }

  login(userData: User): void {

    this.httpClient.post(this.apiBaseUrl + `/user/login`, userData).subscribe(
      u => {
        if (u) {
          this.profile.next(u);
          this.saveUser(u);

          if (this.profile.getValue().userType === UserType.ADMIN) {
            this.router.navigate(['/list']);
          } else {
            this.router.navigate(['/home']);
          }

        }
      },
      error => {
        console.log(error);
        this.snackbarService.notifyMessage('Authentication error, please contact Admin!!');
      }
    )
  }

  private saveUser(cacheUser: any): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(cacheUser));
  }

  private getUser() {
    const cacheUser = localStorage.getItem(this.USER_KEY);
    return cacheUser ? JSON.parse(cacheUser) : null;
  }

  logout(): void {
    this.profile.next(undefined);
    this.router.navigate(['/login']);
  }

  getUserProfile(): Observable<User> {
    return this.profile.asObservable();
  }

  isLoggedin() {

    const cacheUser = this.getUser();
    const currentUser = this.getCurrentUserProfile();

    if (currentUser) {
      return true;
    } else if (cacheUser) {
      this.profile.next(cacheUser);
      return true;
    } else {
      return false;
    }
  }

  isAdminLoggedin(){
    const cacheUser = this.getUser();
    const currentUser = this.getCurrentUserProfile();

    if (currentUser) {
      return currentUser.userType === UserType.ADMIN;
    } else if (cacheUser) {
      this.profile.next(cacheUser);
      return cacheUser.userType === UserType.ADMIN;
    } else {
      return false;
    }
  }

  getCurrentUserProfile() {
    return this.profile.getValue();
  }
}
