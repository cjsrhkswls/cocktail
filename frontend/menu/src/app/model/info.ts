import { Menu } from "./menu";
import { Order } from "./order";
import { User } from "./user";

export interface Info {
    order:Order,
    user:User,
    menu:Menu
}

export interface Summary{
    orderId: number,
    userNickname: string,
    menuName: string,
    orderStatus: string
}