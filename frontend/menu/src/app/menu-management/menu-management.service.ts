import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Menu } from '../model/menu';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuManagementService {

  constructor(public httpClient:HttpClient){}

  getAllMenus(){
    return this.httpClient.get<Menu[]>(environment.backendAPIBase + "/menu/all");
  }

  createMenu(newMenu: Menu){
    return this.httpClient.post<Menu>(environment.backendAPIBase + '/menu/create', newMenu);
  }

  deleteMenu(menuId: number){
    return this.httpClient.delete<Menu>(environment.backendAPIBase + `/menu/delete/${menuId}`);
  }

}
