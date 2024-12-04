
export class Info {
    constructor(order, user, menu){
        this.order = order;
        this.user = user;
        this.menu = menu;
    }

    getOrder(){
        return this.order;
    }

    getUser(){
        return this.user;
    }

    getMenu(){
        return this.menu;
    }
}