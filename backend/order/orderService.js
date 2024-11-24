import { Service } from "../framework/service.js";
import { OrderDataFacade } from "./orderDataFacade.js";
import { UserService } from "../user/userService.js";
import { MenuService } from "../menu/menuService.js";
import { OrderStatus } from "../code.js"

export class OrderService extends Service{
    constructor(){
        super();
        this.orderDataFacade = new OrderDataFacade();
        this.userService = new UserService();
        this.menuService = new MenuService();
    }

    getAllOrders = async () =>{
        const result = await this.orderDataFacade.getAllOrders();
        if (result.length < 1) {
            this.throwError('There is no order yet!!');
        }
        return result;
    };

    getOrderById = async (orderId) => {
        this.checkId(orderId);
        const result = await this.orderDataFacade.getOrderById(orderId);

        if (!result || result === null) {
            this.throwError(`No order for order identifier:${orderId}`);
        }

        return result;
    }

    getAllOrdersByUserId = async (userId) => {
        this.checkId(userId);
        const result = await this.orderDataFacade.getAllOrdersByUserId(userId);

        if (result.length < 1) {
            this.throwError(`There is no order yet for the user: ${userId}`);
        }
        return result;
    }

    getAllOrdersByStatus = async (status) => {
        this.checkStringValue(status);
        const result = await this.orderDataFacade.getAllOrdersByStatus(status);

        if (result.length < 1) {
            this.throwError(`There is no order on the status: ${status}`);
        }
        return result;
    }

    getOrderByUserIdMenuIdStatus = async (userId, menuId, status) =>{
        this.checkId(userId);
        this.checkId(menuId);
        this.checkStringValue(status);

        const result = await this.orderDataFacade.getOrderByUserIdMenuIdStatus(userId, menuId, status);

        if (!result || result === null) {
            this.throwError(`No order for order Id:${orderId}, menu Id:${menuId}, order status:${status}`);
        }

        return result;
    }

    createOrder = async (userId, menuId) => {
        this.checkId(userId);
        this.checkId(menuId);
        const aUser = await this.userService.getUserById(userId);

        if (!aUser || aUser === null){
            this.throwError(`The user:${userId} that request the order does not exist!!`);
        }

        const aMenu = await this.menuService.getMenuById(menuId);
        if (!aMenu || aMenu === null){
            this.throwError(`The menu:${menuId} that is requested does not exist!!`);
        }

        const requestedOrder = await this.orderDataFacade.getOrderByUserIdStatus(userId, OrderStatus.REQUESTED);

        if (requestedOrder || requestedOrder !== null) {
            this.throwError(`An order for the user:${userId} is already requested!!`);
        }

        await this.orderDataFacade.createOrder(OrderStatus.REQUESTED, aUser, aMenu);

        const newOrder = await this.orderDataFacade.getOrderByUserIdMenuIdStatus(userId, menuId, OrderStatus.REQUESTED);
        return newOrder;
    }

    updateOrder = async (orderId, newStatus) => {
        this.checkId(orderId);
        this.checkStringValue(newStatus);

        const existingOrder = await this.orderDataFacade.getOrderById(orderId);

        if (!existingOrder || existingOrder === null) {
            this.throwError(`The order to be updated does not exist: ${orderId}!!`);
        }

        const updatedRows = await this.orderDataFacade.updateOrder(orderId, newStatus);

        if (updatedRows == 0) {
            this.throwError(`No order records to be updated for order Id:${orderId}`);
        } else {
            console.log(`Order:${newStatus} updated`);
            const updatedOrder = await this.orderDataFacade.getOrderById(orderId);
            return updatedOrder;
        }
    }

    deleteOrder = async (orderId) => {
        this.checkId(orderId);
        const existingOrder = await this.orderDataFacade.getOrderById(orderId);

        if (!existingOrder || existingOrder === null) {
            this.throwError(`The order to be deleted does not exist: ${orderId}!!`);
        }

        const deletedRowCount = await this.orderDataFacade.deleteOrder(orderId);

        if (deletedRowCount === 0) {
            console.log('No order records to be deleted');
        } else {
            console.log(`${deletedRowCount} rows deleted for order Id: ${existingOrder.orderId}`);
            return existingOrder;
        }
    }
}