import { Component, Input, input } from '@angular/core';
import { Menu } from '../../model/menu';

@Component({
  selector: 'app-menu-view',
  standalone: true,
  imports: [],
  templateUrl: './menu-view.component.html',
  styleUrl: './menu-view.component.css'
})
export class MenuViewComponent {

  @Input() menu:Menu[] = [];

  constructor(){}
}
