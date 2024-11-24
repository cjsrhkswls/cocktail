import { Component, OnInit } from '@angular/core';
import { Menu } from '../model/menu';
import { MenuService } from './menu.service';
import { MenuViewComponent } from "./menu-view/menu-view.component";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MenuViewComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit{

  menu!:Menu[];

  constructor(public menuService:MenuService){}

  ngOnInit(){
    this.menuService.getAllMenus().subscribe( m => {
      this.menu = m;
    });
  }
}
