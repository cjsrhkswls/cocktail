import { Component, Input } from '@angular/core';
import { Menu } from '../../model/menu';

@Component({
  selector: 'app-menu-alive-view',
  standalone: true,
  imports: [],
  templateUrl: './menu-alive-view.component.html',
  styleUrl: './menu-alive-view.component.css'
})
export class MenuAliveViewComponent {
  @Input() menuAlive: Menu = {
    menuId: -1,
    menuName: '',
    menuType: '',
    menuDescription: '',
    alcoholLevel: ''
  };
}
