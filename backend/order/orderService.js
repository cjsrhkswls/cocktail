import { Service } from "../framework/service.js";
import { OrderDataFacade } from "./orderDataFacade.js";
import { UserDataFacade } from "../user/userDataFacade.js";
import { MenuDataFacade } from "../menu/menuDataFacade.js";
import { OrderStatus, UserType } from "../code.js"
import { EmailService } from "../framework/emailService.js";

export class OrderService extends Service {
    constructor() {
        super();
        this.orderDataFacade = new OrderDataFacade();
        this.userDataFacade = new UserDataFacade();
        this.menuDataFacade = new MenuDataFacade();
        this.emailService = new EmailService();
    }

    getAllOrders = async () => {
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

    getOrderByUserIdStatus = async (userId, orderStatus) => {
        this.checkId(userId);
        this.checkStringValue(orderStatus);

        const result = await this.orderDataFacade.getOrderByUserIdStatus(userId, orderStatus);

        if (!result || result === null) {
            this.throwError(`No order for user Id:${userId}, order Id:${orderId}`);
        }
        return result;
    }

    getOrderByUserIdMenuIdStatus = async (userId, menuId, status) => {
        this.checkId(userId);
        this.checkId(menuId);
        this.checkStringValue(status);

        const result = await this.orderDataFacade.getOrderByUserIdMenuIdStatus(userId, menuId, status);

        if (!result || result === null) {
            this.throwError(`No order for order Id:${orderId}, menu Id:${menuId}, order status:${status}`);
        }

        return result;
    }

    getMenuOfActiveOrder = async (userId) => {
        this.checkId(userId);

        const activeOrder = await this.getOrderByUserIdStatus(userId, OrderStatus.REQUESTED);

        if (!activeOrder || activeOrder === null) {
            console.log(`No active order for the user: ${userId}`);
            return null;
        } else {
            return activeOrder;
        }
    }

    createOrder = async (userId, menuId) => {
        this.checkId(userId);
        this.checkId(menuId);
        const aUser = await this.userDataFacade.getUserById(userId);

        if (!aUser || aUser === null) {
            this.throwError(`The user:${userId} that request the order does not exist!!`);
        }

        const aMenu = await this.menuDataFacade.getMenuById(menuId);
        if (!aMenu || aMenu === null) {
            this.throwError(`The menu:${menuId} that is requested does not exist!!`);
        }

        const requestedOrder = await this.orderDataFacade.getOrderByUserIdStatus(userId, OrderStatus.REQUESTED);

        if (requestedOrder || requestedOrder !== null) {
            this.throwError(`An order for the user:${userId} is already requested!!`);
        }

        await this.orderDataFacade.createOrder(OrderStatus.REQUESTED, aUser, aMenu);

        const newOrder = await this.orderDataFacade.getOrderByUserIdMenuIdStatus(userId, menuId, OrderStatus.REQUESTED);

        this.emailService.sendMailToOwnerForNewOrder(newOrder, aMenu, aUser);

        return newOrder;
    }

    createNewOrder = async (userId, menuId) => {
        const newOrder = await this.createOrder(userId, menuId);
        const orderedMenu = await this.menuDataFacade.getMenuById(newOrder.menuId);

        if (!orderedMenu || orderedMenu === null) {
            this.throwError(`The ordered menu does not exist, menuId: ${newOrder.menuId}, userId: ${userId}`)
        }
        return orderedMenu;
    }

    cancelOrder = async (userId, menuId) => {
        const orderedMenu = await this.getOrderByUserIdMenuIdStatus(userId, menuId, OrderStatus.REQUESTED);

        if (orderedMenu && orderedMenu !== null) {
            const updatedOrder = await this.updateOrder(userId, orderedMenu.orderId, OrderStatus.CANCELED);
            return updatedOrder;
        } else {
            return null;
        }
    }

    updateOrder = async (userId, orderId, newStatus) => {
        this.checkId(orderId);
        this.checkId(userId);
        this.checkStringValue(newStatus);

        const aRequester = await this.userDataFacade.getUserById(userId);
        console.log(aRequester);
        if (!aRequester || aRequester === null) {
            this.throwError(`The user:${userId} who is trying to update does not exist!!`);
        }

        const existingOrder = await this.orderDataFacade.getOrderById(orderId);

        if (!existingOrder || existingOrder === null) {
            this.throwError(`The order to be updated does not exist: ${orderId}!!`);
        }

        if (aRequester.userType !== UserType.ADMIN && aRequester.userId !== existingOrder.userId) {
            this.throwError(`The user:${userId} does not own this order:${existingOrder.orderId}!!`);
        }

        const updatedRows = await this.orderDataFacade.updateOrder(orderId, newStatus);

        if (updatedRows == 0) {
            this.throwError(`No order records to be updated for order Id:${orderId}`);
        } else {
            console.log(`Order:${newStatus} updated`);
            const updatedOrder = await this.orderDataFacade.getOrderById(orderId);
            const aUser = await this.userDataFacade.getUserById(updatedOrder.userId);
            const aMenu = await this.menuDataFacade.getMenuById(updatedOrder.menuId);

            if (newStatus == OrderStatus.COMPLETED || newStatus == OrderStatus.REJECTED){
                this.emailService.sendMailToUserForOrderUpdate(updatedOrder, aMenu, aUser);
            }

            if (aRequester.userType !== UserType.ADMIN) {
                this.emailService.sendMailToOwnerForOrderUpdate(updatedOrder, aMenu, aUser);
            }
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