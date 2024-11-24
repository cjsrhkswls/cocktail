import { Injectable } from '@angular/core';
import { Menu } from '../model/menu';
import { of } from 'rxjs';
import { AlcholLevel } from '../code/alchol-level';
import { MenuType } from '../code/menu-type';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  menus:Menu[] = [
    {menuId: 1, menuName: "Vodka Sunrise", menuType:MenuType.COCKTAIL, menuDescription: "Sweet and Sour", alcholLevel: AlcholLevel.LOW, ingredients: ["Vodka", "Orange juice", "Grenadine"], pic:""},
  ];

  constructor() {
  }

  getAllMenus(){
    return of(this.menus);
  }
}