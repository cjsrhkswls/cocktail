import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Menu } from '../../model/menu';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-alive-view',
  standalone: true,
  imports: [CommonModule],
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

  @Output() cancelEvent = new EventEmitter<number>();

  progress: number = 0; // Initial progress value
  isCancelled: boolean = false; // Controls visibility
  
  constructor() {
    this.startProgress();
  }

  startProgress(): void {
    // Simulate progress increment every 100ms
    setInterval(() => {
      if (this.progress < 100) {
        this.progress += 1;
      } else {
        this.progress = 0 // Stop progress at 100%
      }
    }, 100);
  }

  cancel(): void {
    this.isCancelled = true;
    this.cancelEvent.emit(this.menuAlive.menuId);
  }
}
