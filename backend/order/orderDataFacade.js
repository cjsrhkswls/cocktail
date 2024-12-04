import { conn } from '../framework/databaseConnection.js'
import { Order } from '../model/order.js'

export class OrderDataFacade {
    constructor() {
        this.conn = conn;
        this.order = Order;
    }

    getAllOrders = async () => {
        return await Order.findAll();
    };

    getOrderById = async (orderId) => {
        return await Order.findByPk(orderId);
    };

    getAllOrdersByUserId = async (userId) => {
        return await Order.findAll(
            {
                where: { userId: userId }
            }
        )
    };

    getAllOrdersByStatus = async (status) => {
        return await Order.findAll(
            {
                where: { orderStatus: status }
            }
        )
    };

    getOrderByUserIdStatus = async (userId, status) => {
        return await Order.findOne(
            {
                where: {
                    userId: userId,
                    orderStatus: status
                }
            }
        )
    };

    getOrderByUserIdMenuId = async (userId, menuId) => {
        return await Order.findOne(
            {
                where: {
                    userId: userId,
                    menuId: menuId
                },
                order: [['createdAt', 'DESC']]
            }
        )
    };

    getOrderByUserIdMenuIdStatus = async (userId, menuId, status) => {
        return await Order.findOne(
            {
                where: {
                    userId: userId,
                    menuId: menuId,
                    orderStatus: status
                }
            }
        )
    };

    createOrder = async (orderStatus, aUser, aMenu) => {
        await Order.create(
            {
                orderStatus: orderStatus,
                userId: aUser.userId,
                menuId: aMenu.menuId,
            })
            .catch(err => {
                console.log(err);
                return new Error(err);
            });
    };

    updateOrder = async (orderId, newStatus) => {
        const [updatedRows] = await Order.update(
            {
                orderStatus: newStatus,
            },
            {
                where: { orderId: orderId }
            })
            .catch(err => {
                console.log(err);
                return new Error(err);
            });

        return [updatedRows];
    };

    deleteOrder = async (orderId) => {
        const deletedRowCount = await Order.destroy(
            {
                where: {
                    orderId: orderId,
                }
            })
            .catch(err => {
                console.log(err);
                return new Error(err);
            });

        return deletedRowCount;
    };
}