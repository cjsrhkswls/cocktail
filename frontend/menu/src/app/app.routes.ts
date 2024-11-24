import { Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { OrderListComponent } from './order/order-list/order-list.component';

export const routes: Routes = [
    { path:'', redirectTo:'home', pathMatch:'full'},
    { path:'home', component: MenuComponent},
    { path:'list', component:OrderListComponent}
    
];
