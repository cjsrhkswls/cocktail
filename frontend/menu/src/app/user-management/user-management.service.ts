import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(public httpClient:HttpClient){}

  getUsers(){
    return this.httpClient.get<User[]>(environment.backendAPIBase + "/user/all");
  }

  confirmUser(user:User){
    return this.httpClient.put<User>(environment.backendAPIBase + "/user/confirm", user);
  }

  rejectUser(user:User){
    return this.httpClient.put<User>(environment.backendAPIBase + "/user/reject", user);
  }
}
