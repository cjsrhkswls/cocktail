import { Injectable } from '@angular/core';
import { Menu, MenuWithOrder } from '../model/menu';
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
    return this.httpClient.get<MenuWithOrder>(environment.backendAPIBase + `/menu/alive/userid/${userId}`);
  }

  getMenuWithOrder(userId:number, menuId:number){
    return this.httpClient.get<MenuWithOrder>(environment.backendAPIBase +`/menu/order/${userId}/${menuId}`);
  }

  orderMenu(userId:number, menuId:number){
    return this.httpClient.post<MenuWithOrder>(environment.backendAPIBase + '/order/new', {userId:userId, menuId: menuId});
  }

  cancelOrder(userId: number, menuId: number){
    return this.httpClient.put<Menu>(environment.backendAPIBase + `/order/cancel`, {userId: userId, menuId: menuId});
  }
}
