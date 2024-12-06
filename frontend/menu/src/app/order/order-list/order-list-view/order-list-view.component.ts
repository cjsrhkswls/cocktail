import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Summary } from '../../../model/info';
import { CommonModule } from '@angular/common';
import { OrderStatus } from '../../../code';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-list-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-list-view.component.html',
  styleUrl: './order-list-view.component.css'
})
export class OrderListViewComponent {

  @Input() orders:Summary[] = [];
  @Output() rejectEvent = new EventEmitter<number>();
  @Output() completeEvent = new EventEmitter<number>();
  @Output() resetEvent = new EventEmitter<string>();

  ORDER_STATUS_REQUESTED = OrderStatus.REQUESTED;
  ORDER_STATUS_CANCELED = OrderStatus.CANCELED;
  ORDER_STATUS_REJECTED = OrderStatus.REJECTED;
  ORDER_STATUS_COMPLETED = OrderStatus.COMPLETED;

  filterStatus: string = this.ORDER_STATUS_REQUESTED; 
  resetCode: string = '';

  get filteredSummaries(): Summary[] {
    // Filter summaries based on the filterStatus
    return this.filterStatus
      ? this.orders.filter(summary => summary.orderStatus === this.filterStatus)
      : this.orders;
  }

  reject(orderId:number) {
    this.rejectEvent.emit(orderId);
  }

  complete(orderId:number) {
    this.completeEvent.emit(orderId);
  }

  reset(){
    if(this.resetCode){
      this.resetEvent.emit(this.resetCode);
    }
  }
}
