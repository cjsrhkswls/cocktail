import { Component, OnInit } from '@angular/core';
import { Menu } from '../model/menu';
import { MenuService } from './menu.service';
import { MenuViewComponent } from "./menu-view/menu-view.component";
import { AuthService } from '../auth.service';
import { User } from '../model/user';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MenuViewComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit{
  aUser!:User;
  menu!:Menu[];

  constructor(public menuService:MenuService, public readonly authService: AuthService){}

  ngOnInit(){
    this.menuService.getAllMenus().subscribe( m => {
      this.menu = m;
    });

    this.authService.getUserProfile().subscribe(u => this.aUser = u);
  }
}
