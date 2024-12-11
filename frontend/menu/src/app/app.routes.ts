import { Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { OrderListComponent } from './order/order-list/order-list.component';
import { LoginComponent } from './login/login.component';
import { authGuard, adminAuthGuard } from './auth.guard';

export const routes: Routes = [
    { path:'', redirectTo:'home', pathMatch:'full'},
    { path:'home', component: MenuComponent, canActivate: [authGuard]},
    { path:'list', component: OrderListComponent, canActivate: [adminAuthGuard]},
    { path:'login', component: LoginComponent}
];
