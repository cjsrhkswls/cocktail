import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from './snackbar.component';
import { MessageType } from '../../code';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(public snackBar:MatSnackBar, public ngZone: NgZone) { }

  notifyError(message: any){
    this.ngZone.run(() => {
      this.snackBar.openFromComponent(SnackbarComponent, {
        data: {
          message: message,
          type: MessageType.ERROR
        },
        duration: 10000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
    });
  }
}
