import { Component, OnInit } from '@angular/core';
import { SnackbarService } from '../../common/snackbar/snackbar.service';
import { Info, Summary } from '../../model/info';
import { OrderService } from '../order.service';
import { catchError, interval, Observable, of, switchMap } from 'rxjs';
import { OrderListViewComponent } from "./order-list-view/order-list-view.component";
import { AuthService } from '../../auth.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [OrderListViewComponent],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent implements OnInit {
  
  allOrderInfo: Summary[] = [];
  currentUser: User | undefined;

  constructor(public authService: AuthService, public snackbarService: SnackbarService, private readonly orderService: OrderService) { }
  
  ngOnInit(): void {

    this.orderService.getAllOrderInfo().subscribe(i => {
      if (i && i.length > 0) {
        this.allOrderInfo = this.convertAllInfoToSummaries(i);
      }
    },
      error => {
        this.snackbarService.notifyMessage('No order to display yet!');
      }
    );

    this.authService.getUserProfile().subscribe(
      u => {
        if(u){
          this.currentUser = u;
        }
      }
    )

    this.fetchMenuAliveDataRepeatedly().subscribe(i => {
      if (i){
        if (this.isDifferent(i)){
          this.snackbarService.notifyMessageWithSecs('New Order has been added!', 600);
        }
        this.allOrderInfo = this.convertAllInfoToSummaries(i);
      }
    })
  }

  fetchMenuAliveData(): Observable<any> {
    return this.orderService.getAllOrderInfo();
  }

  fetchMenuAliveDataRepeatedly(): Observable<any> {
    return interval(120000).pipe(
      switchMap(() =>
        this.fetchMenuAliveData().pipe(
          catchError((error) => {
            console.error('Error fetching data:', error);
            return of({ error: true, message: 'Failed to fetch data' });
          })
        )
      )
    );
  }

  isDifferent(newInfo:Info[]): boolean{
    return this.allOrderInfo.length !== newInfo.length;
  }

  convertInfoToSummary(info:Info){
    return {
      orderId: info.order.orderId ?? -1,
      userNickname: info.user.userNickname?? '',
      menuName: info.menu.menuName ?? '',
      orderStatus: info.order.orderStatus?? ''
    }
  }

  convertAllInfoToSummaries(allInfo: Info[]){
    let result: Summary[] = [];
    for(const i of allInfo){
      result.push(this.convertInfoToSummary(i));
    }
    return result;
  }

  rejectOrder(orderId: number){
    if(this.currentUser){
      this.orderService.rejectOrder(this.currentUser.userId, orderId).subscribe(
        o => {
          if (o){
            const rejectedOrder = o;
            const existingOrder = this.allOrderInfo.find(s => s.orderId === rejectedOrder.orderId);
            if(existingOrder){
              existingOrder.orderStatus = rejectedOrder.orderStatus
            }
          }
        }
      )
    }
  }

  completeOrder(orderId: number){
    if(this.currentUser){
      this.orderService.completeOrder(this.currentUser.userId, orderId).subscribe(
        o => {
          if (o){
            const completedOrder = o;
            const existingOrder = this.allOrderInfo.find(s => s.orderId === completedOrder.orderId);
            if(existingOrder){
              existingOrder.orderStatus = completedOrder.orderStatus
            }
          }
        }
      )
    }
  }

  reset(resetCode:string){
    if (this.currentUser){
      this.orderService.reset(this.currentUser?.userId, resetCode).subscribe(
        m => {
          this.snackbarService.notifyMessage('All data has been reset!!');
          window.location.reload();
        },
        error => {
          this.snackbarService.notifyMessage('The rest code is invalid!!');
        }
      )
    } else {
      this.snackbarService.notifyMessageWithSecs('The current user is missing!!', 30);
    }
  }
}
