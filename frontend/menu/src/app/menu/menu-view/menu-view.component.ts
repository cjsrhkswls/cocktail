import { Component, Input, input } from '@angular/core';
import { Menu } from '../../model/menu';
import { User } from '../../model/user';

@Component({
  selector: 'app-menu-view',
  standalone: true,
  imports: [],
  templateUrl: './menu-view.component.html',
  styleUrl: './menu-view.component.css'
})
export class MenuViewComponent {

  @Input() menu:Menu[] = [];
  @Input() currentUser:User | undefined;

  constructor(){}
}
