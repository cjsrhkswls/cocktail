import { Injectable } from '@angular/core';
import { Menu } from '../model/menu';
import { of } from 'rxjs';
import { AlcoholLevel, MenuType } from '../code';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  menus:Menu[] = [
    {menuId: 1, menuName: "Vodka Sunrise", menuType:MenuType.COCKTAIL, menuDescription: "Sweet and Sour", alcholLevel: AlcoholLevel.LOW},
  ];

  constructor() {
  }

  getAllMenus(){
    return of(this.menus);
  }
}
