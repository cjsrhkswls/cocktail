import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from './snackbar.component';
import { MessageType } from '../../code';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(public snackBar:MatSnackBar, public ngZone: NgZone) { }

  notifyMessage(message: any){
    this.ngZone.run(() => {
      this.snackBar.openFromComponent(SnackbarComponent, {
        data: {
          message: message,
        },
        duration: 8000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
    });
  }

  notifyMessageWithSecs(message: any, secs: number){
    this.ngZone.run(() => {
      this.snackBar.openFromComponent(SnackbarComponent, {
        data: {
          message: message,
        },
        duration: secs * 1000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
    });
  }
}
