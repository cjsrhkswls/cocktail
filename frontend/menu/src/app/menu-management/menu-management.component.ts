import { Component, OnInit } from '@angular/core';
import { MenuManagementViewComponent } from "./menu-management-view/menu-management-view.component";
import { MenuManagementService } from './menu-management.service';
import { Menu } from '../model/menu';
import { SnackbarService } from '../common/snackbar/snackbar.service';
import { NavbarComponent } from "../common/navbar/navbar.component";

@Component({
  selector: 'app-menu-management',
  standalone: true,
  imports: [MenuManagementViewComponent, NavbarComponent],
  templateUrl: './menu-management.component.html',
  styleUrl: './menu-management.component.css'
})
export class MenuManagementComponent implements OnInit {

  menus: Menu[] = [];

  constructor(public menuManagementService: MenuManagementService, public snackbarService: SnackbarService) {}

  ngOnInit(): void {
    this.menuManagementService.getAllMenus()
      .subscribe(m => {
        if (m && m.length > 0) {
          this.menus = m;
        }
      }
      );
  }

  createNewMenu(newMenu: Menu) {
    this.menuManagementService.createMenu(newMenu)
      .subscribe(m => {
        if (m) {
          this.snackbarService.notifyMessage(`New Menu: ${m.menuName} has been added!`);  
          this.menus.push(m);
        }
      }, error => {
        console.log(error);
        this.snackbarService.notifyMessage('Fails to add new Menu');
      }
      )
  }

  deleteMenu(menuId: number) {
    this.menuManagementService.deleteMenu(menuId)
      .subscribe(m => {
        if (m) {
          this.snackbarService.notifyMessage(`The menu id: ${menuId} has been deleted!`);
          this.menus = this.menus.filter(menu => menu.menuId !== m.menuId);
        }
      }, error => {
        console.log(error);
        this.snackbarService.notifyMessage(`Fails to delete a menu id: ${menuId}`);
      }
      )
  }

}
