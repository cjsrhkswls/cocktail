import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './model/user';
import { Router } from '@angular/router';
import { UserType } from './code';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  profile: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  private readonly USER_KEY = 'currentUserProfile';
  currentProfile = this.profile.asObservable();

  constructor(public router: Router) { }

  login(userData: User): void {

    // TODO: Service call is required here
    // TODO: place the below two lines in subscribe
    this.profile.next(userData);
    this.saveUser(userData);
    //******************************** */
    if (this.profile.getValue().userType === UserType.ADMIN) {
      this.router.navigate(['/list']);
    } else {
      this.router.navigate(['/home']);
    }
  }

  private saveUser(cacheUser: User): void {
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
    console.log(cacheUser, currentUser);
    if (currentUser){
      return true;
    } else if(cacheUser) {
        this.profile.next(cacheUser);
        return true;
    } else {
        return false;
    }
  }

  getCurrentUserProfile() {
    return this.profile.getValue();
  }
}
