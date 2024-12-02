import { Injectable } from '@angular/core';
import { Menu } from '../model/menu';
import { AlcoholLevel, MenuType } from '../code';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(public httpClient:HttpClient){}

  getAllMenus(){
    return this.httpClient.get<Menu[]>(environment.backendAPIBase + "/menu/all");
  }

  getMenuAlive(userId: number){
    return this.httpClient.get<Menu>(environment.backendAPIBase + `/menu/alive/userid/${userId}`);
  }
}
