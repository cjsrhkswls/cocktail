import { Component, OnInit } from '@angular/core';
import { Menu } from '../model/menu';
import { MenuService } from './menu.service';
import { MenuViewComponent } from "./menu-view/menu-view.component";
import { AuthService } from '../auth.service';
import { User } from '../model/user';
import { MenuAliveViewComponent } from "./menu-alive-view/menu-alive-view.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MenuViewComponent, MenuAliveViewComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  currentUser!: User;
  menu!: Menu[];
  menuAlive: Menu = {
    menuId: -1,
    menuName: '',
    menuType: '',
    menuDescription: '',
    alcoholLevel: ''
  };

  constructor(private readonly router:Router, public menuService: MenuService, public readonly authService: AuthService) { }

  ngOnInit() {
    this.authService.getUserProfile().subscribe(
      u => {
        if (u) {
          this.currentUser = u;
        } else {
          this.router.navigate(['/login']);
        }
      }
    );

    this.menuService.getMenuAlive(this.currentUser.userId).subscribe(
      m => {
        if (m) {
          this.menuAlive = m;
        }
      }
    );
    
    this.menuService.getAllMenus().subscribe(m => {
      this.menu = m;
    });
  }
}
