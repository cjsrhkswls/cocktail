import { Component, EventEmitter, Input, Output} from '@angular/core';
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

  @Output() orderEvent = new EventEmitter<number>();
 
  constructor(){
  }

  onCardClick(event: MouseEvent): void {
    const card = event.target as HTMLElement;
    const cardElement = card.closest('.menu-card') as HTMLElement;

    if (cardElement) {
      cardElement.classList.toggle('focused'); // Toggle the focused state
    }
  }

  order(menuItem: Menu){
    this.orderEvent.emit(menuItem.menuId);
  }
}
