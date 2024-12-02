import { Component, Input} from '@angular/core';
import { Menu } from '../../model/menu';
import { User } from '../../model/user';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-view',
  standalone: true,
  imports: [CommonModule, ],
  templateUrl: './menu-view.component.html',
  styleUrl: './menu-view.component.css'
})
export class MenuViewComponent {

  @Input() menu:Menu[] = [];
  @Input() currentUser:User | undefined;
 
  constructor(){
  }

  onCardClick(event: MouseEvent, menuItem: Menu): void {
    const card = event.target as HTMLElement;
    const cardElement = card.closest('.menu-card') as HTMLElement;

    if (cardElement) {
      cardElement.classList.toggle('focused'); // Toggle the focused state
    }
  }

  order(event: MouseEvent, menuItem: Menu){
    console.log(menuItem.menuName);
  }
}
