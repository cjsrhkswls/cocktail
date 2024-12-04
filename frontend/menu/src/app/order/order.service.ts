import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Info } from '../model/info';
import { Order } from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(public httpClient:HttpClient) { }

  getAllOrderInfo(){
    return this.httpClient.get<Info[]>(environment.backendAPIBase + '/order/allinfo');
  }

  rejectOrder(userId:number, orderId: number){
    return this.httpClient.put<Order>(environment.backendAPIBase + '/order/reject', {userId: userId, orderId: orderId});
  }

  completeOrder(userId:number, orderId: number){
    return this.httpClient.put<Order>(environment.backendAPIBase + '/order/complete', {userId: userId, orderId: orderId});
  }
}
