import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from './snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(public snackBar: MatSnackBar, public ngZone: NgZone) { }

  notifyMessage(message: any) {
    this.ngZone.run(() => {
      const snackBarRef = this.snackBar.openFromComponent(SnackbarComponent, {
        data: {
          message: message,
        },
        duration: 8000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });

      snackBarRef.afterOpened().subscribe(() => {
        const snackBarContainer = document.querySelector('.custom-snackbar');
        if (snackBarContainer) {
          (snackBarContainer as HTMLElement).focus();
        }
      });
    });
  }

  notifyMessageWithSecs(message: any, secs: number) {
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
