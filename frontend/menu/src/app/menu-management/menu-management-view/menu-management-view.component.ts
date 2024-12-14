import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Menu } from '../../model/menu';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlcoholLevel, MenuType } from '../../code';

import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-menu-management-view',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './menu-management-view.component.html',
  styleUrl: './menu-management-view.component.css'
})
export class MenuManagementViewComponent {

  @Input() menus:Menu[] = [];
  @Output() createMenuEvent = new EventEmitter<Menu>();
  @Output() deleteMenuEvent = new EventEmitter<number>();

  menuForm: FormGroup;

  alcoholLevels: string[] = [AlcoholLevel.NONE, AlcoholLevel.LOW, AlcoholLevel.MEDIUM, AlcoholLevel.HIGH];
  
  constructor(private fb: FormBuilder) {
    this.menuForm = this.fb.group({
      menuName: ['', Validators.required], 
      menuDescription: ['', Validators.required], 
      alcoholLevel: ['', Validators.required]
    });
  }

  createMenu(){
    if (this.menuForm.valid){
      let newMenu:Menu = {
        menuId: -1,
        menuName: this.menuForm.get('menuName')?.value,
        menuDescription: this.menuForm.get('menuDescription')?.value,
        menuType: MenuType.COCKTAIL,
        alcoholLevel: this.menuForm.get('alcoholLevel')?.value,
      };
      this.createMenuEvent.emit(newMenu);
    }
  }

  deleteMenu(menuId:number){
    this.deleteMenuEvent.emit(menuId);
  }
}
