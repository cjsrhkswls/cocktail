export class MenuWithOrder {
    constructor(menu, orderId, orderStatus) {
        this.menu = menu;
        this.orderId = orderId;
        this.orderStatus = orderStatus;
    }

    getMenu(){
        return this.menu;
    }

    getOrderId(){
        return this.orderId;
    }

    getOrderStatus(){
        return this.orderStatus;
    }
}