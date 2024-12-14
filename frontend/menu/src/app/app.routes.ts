import { Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { OrderListComponent } from './order/order-list/order-list.component';
import { LoginComponent } from './login/login.component';
import { authGuard, adminAuthGuard } from './auth.guard';
import { MenuManagementComponent } from './menu-management/menu-management.component';
import { UserManagementComponent } from './user-management/user-management.component';

export const routes: Routes = [
    { path:'', redirectTo:'home', pathMatch:'full'},
    { path:'home', component: MenuComponent, canActivate: [authGuard]},
    { path:'list', component: OrderListComponent, canActivate: [adminAuthGuard]},
    { path:'menu', component: MenuManagementComponent, canActivate: [adminAuthGuard]},
    { path:'user', component: UserManagementComponent, canActivate: [adminAuthGuard]},
    { path:'login', component: LoginComponent}
];
