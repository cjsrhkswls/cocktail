import { Component, NgZone, OnInit } from '@angular/core';
import { Menu, MenuWithOrder } from '../model/menu';
import { MenuService } from './menu.service';
import { MenuViewComponent } from "./menu-view/menu-view.component";
import { AuthService } from '../auth.service';
import { User } from '../model/user';
import { MenuAliveViewComponent } from "./menu-alive-view/menu-alive-view.component";
import { Router } from '@angular/router';
import { SnackbarService } from '../common/snackbar/snackbar.service';
import { switchMap, interval, Observable, catchError, of } from 'rxjs';
import { OrderStatus } from '../code';
import { MatDialog } from '@angular/material/dialog';
import { MenuDialogComponent } from './menu-view/menu-dialog/menu-dialog.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MenuViewComponent, MenuAliveViewComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit{
  currentUser!: User;
  menu!: Menu[];

  menuAlive: MenuWithOrder = {
    menu:{
      menuId: -1,
      menuName: '',
      menuType: '',
      menuDescription: '',
      alcoholLevel: '',
    },
    orderId: -1,
    orderStatus: '',
  };

  tempMenu: MenuWithOrder = {
    menu:{
      menuId: -1,
      menuName: '',
      menuType: '',
      menuDescription: '',
      alcoholLevel: '',
    },
    orderId: -1,
    orderStatus: '',
  };

  constructor(private readonly router: Router, public ngZone:NgZone, public menuService: MenuService, public authService: AuthService, public snackbarService: SnackbarService, public dialog: MatDialog) { }

  ngOnInit() {
    this.authService.getUserProfile().subscribe(
      u => {
        if (u) {

          this.currentUser = u;
          
          this.menuService.getMenuAlive(this.currentUser.userId).subscribe(m => {
            if(m){
              if (m.orderStatus === OrderStatus.REQUESTED){
                this.menuAlive = m;
              }
            }
          });

          this.startFetchingMenuAliveData(this.currentUser.userId);

        } else {
          this.router.navigate(['/login']);
        }
      }
    );

    this.menuService.getAllMenus().subscribe(m => {
      this.menu = m;
    });
  }

  startFetchingMenuAliveData(userId:number){
    this.fetchMenuAliveDataRepeatedly(userId).subscribe(mWo => {
      if(mWo && mWo.menu.menuId > 0){
        if(mWo.orderStatus === OrderStatus.REQUESTED){
          this.menuAlive = mWo;
        } else {
          this.snackbarService.notifyMessageWithSecs(`Your order:${this.menuAlive.menu.menuName} has been ${mWo.orderStatus}`, 300);
          this.menuAlive = this.tempMenu;
        }
      } else {
        this.menuAlive = this.tempMenu;
      }
    })
  }

  fetchMenuAliveData(userId:number): Observable<MenuWithOrder> {
    console.log("Try to fetch the menu alive data");
    if (this.menuAlive.menu.menuId > 0) {
      return this.menuService.getMenuWithOrder(userId, this.menuAlive.menu.menuId);
    } else {
      return of(this.menuAlive);
    }
  }

  fetchMenuAliveDataRepeatedly(userId:number): Observable<MenuWithOrder> {
    return interval(60000).pipe(
      switchMap(() =>
        this.fetchMenuAliveData(userId).pipe(
          catchError((error) => {
            console.error('Error fetching data:', error);
            return of(this.tempMenu);
          })
        )
      )
    );
  }

  orderMenu(menuId: number) {
    if (this.menuAlive.menu.menuId < 0) {
      this.menuService.orderMenu(this.currentUser.userId, menuId).subscribe(m => {
        console.log(m);
        if (m) {
          this.menuAlive = m;
          this.snackbarService.notifyMessage(`Your order: ${this.menuAlive.menu.menuName} is requested!`);
        }
      },
        error => {
          console.log(error);
          this.snackbarService.notifyMessage(`Your order: ${this.menuAlive.menu.menuName} is already in progress!`);
        }
      );
    } else {
      this.snackbarService.notifyMessage(`Your order: ${this.menuAlive.menu.menuName} is already in progress!`);
    }
  }

  cancelOrder(menuId: number){
    this.menuService.cancelOrder(this.currentUser.userId, menuId)
    .pipe(catchError(error => {
      this.snackbarService.notifyMessage(`Fail to cancel your order: ${this.menuAlive.menu.menuName}!`);
      return of(undefined);
    }))
    .subscribe(
      m => {
        if (m) {
          this.snackbarService.notifyMessage(`Your order: ${this.menuAlive.menu.menuName} has been cancelled!`);
          this.menuAlive = this.tempMenu;
        }
      }
    )
  }
}
