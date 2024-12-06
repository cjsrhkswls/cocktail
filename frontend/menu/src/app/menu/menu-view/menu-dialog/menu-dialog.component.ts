import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-menu-dialog',
  standalone: true,
  imports: [],
  templateUrl: './menu-dialog.component.html',
  styleUrl: './menu-dialog.component.css'
})
export class MenuDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { menuName: string, orderStatus: string }) {}
}
