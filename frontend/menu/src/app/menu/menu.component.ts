import { Component, OnDestroy, OnInit } from '@angular/core';
import { Menu } from '../model/menu';
import { MenuService } from './menu.service';
import { MenuViewComponent } from "./menu-view/menu-view.component";
import { AuthService } from '../auth.service';
import { User } from '../model/user';
import { MenuAliveViewComponent } from "./menu-alive-view/menu-alive-view.component";
import { Router } from '@angular/router';
import { SnackbarService } from '../common/snackbar/snackbar.service';
import { switchMap, interval, Observable, catchError, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MenuViewComponent, MenuAliveViewComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit, OnDestroy {
  currentUser!: User;
  menu!: Menu[];

  menuAlive: Menu = {
    menuId: -1,
    menuName: '',
    menuType: '',
    menuDescription: '',
    alcoholLevel: ''
  };

  tempMenu: Menu = {
    menuId: -1,
    menuName: '',
    menuType: '',
    menuDescription: '',
    alcoholLevel: ''
  };

  constructor(private readonly router: Router, public menuService: MenuService, public authService: AuthService, public snackbarService: SnackbarService) { }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    this.authService.getUserProfile().subscribe(
      u => {
        if (u) {
          this.currentUser = u;
          this.fetchMenuAliveDataRepeatedly(this.currentUser.userId).subscribe(m => {
            console.log(m);
            if (m) {
              this.menuAlive = m;
            }
          })
        } else {
          this.router.navigate(['/login']);
        }
      }
    );

    this.menuService.getAllMenus().subscribe(m => {
      this.menu = m;
    });
  }

  fetchMenuAliveData(userId:number): Observable<any> {
    return this.menuService.getMenuAlive(userId);
  }

  fetchMenuAliveDataRepeatedly(userId:number): Observable<any> {
    this.fetchMenuAliveData(userId).subscribe(m => {
      if(m){
        this.menuAlive = m;
      }
    });

    return interval(120000).pipe( // 100 seconds interval (100,000 ms)
      switchMap(() =>
        this.fetchMenuAliveData(userId).pipe(
          catchError((error) => {
            console.error('Error fetching data:', error);
            return of({ error: true, message: 'Failed to fetch data' });
          })
        )
      )
    );
  }

  mapToMenu(data: any) {
    return {
      menuId: data.menuId ?? -1,
      menuName: data.menuName ?? '',
      menuType: data.menuType ?? '',
      menuDescription: data.menuDescription ?? '',
      alcoholLevel: data.alcoholLevel ?? ''
    }
  }

  orderMenu(menuId: number) {
    if (this.menuAlive.menuId < 0) {
      this.menuService.orderMenu(this.currentUser.userId, menuId).subscribe(m => {
        if (m) {
          this.menuAlive = m;
          this.snackbarService.notifyMessage(`Your order: ${this.menuAlive.menuName} is requested!`);
        }
      },
        error => {
          console.log(error);
          this.snackbarService.notifyMessage(`Your order: ${this.menuAlive.menuName} is already in progress!`);
        }
      );
    } else {
      this.snackbarService.notifyMessage(`Your order: ${this.menuAlive.menuName} is already in progress!`);
    }
  }

  cancelOrder(menuId: number){
    this.menuService.cancelOrder(this.currentUser.userId, menuId)
    .pipe(catchError(error => {
      this.snackbarService.notifyMessage(`Fail to cancel your order: ${this.menuAlive.menuName}!`);
      return of(undefined);
    }))
    .subscribe(
      m => {
        if (m) {
          this.snackbarService.notifyMessage(`Your order: ${m.menuName} has been cancelled!`);
          this.menuAlive = this.tempMenu;
        }
      }
    )
  }
}
