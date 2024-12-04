import express from 'express';
import { OrderService } from './orderService.js';

const router = express.Router();
const orderService = new OrderService();

router.get('/all', async (req, res, next) => {
    try{
        const orders = await orderService.getAllOrders();
        res.json(orders)
    } catch(err){
        console.log(err);
        const error = new Error(`No orders!`);
        error.status = 404;
        return next(error);
    }
});

router.get('/id/:id', async (req, res, next) => {
    const orderId = req.params.id;
    try {
        const order = await orderService.getOrderById(orderId);
        return res.json(order);
    } catch (err) {
        console.log(err);
        const error = new Error(`No order for orderId: ${orderId}`);
        error.status = 404;
        return next(error);
    }
});

router.get('/userId/:id', async (req, res, next) => {
    const userId = req.params.id;
    try {
        const orders = await orderService.getAllOrdersByUserId(userId);
        return res.json(orders);
    } catch (err) {
        console.log(err);
        const error = new Error(`No order for userId: ${userId}`);
        error.status = 404;
        return next(error);
    }
});

router.get('/status/:status', async (req, res, next) => {
    const orderStatus = req.params.status;
    try {
        const orders = await orderService.getAllOrdersByStatus(orderStatus);
        return res.json(orders);
    } catch (err) {
        console.log(err);
        const error = new Error(`No order for the status: ${orderStatus}`);
        error.status = 404;
        return next(error);
    }
});

router.get('/user/:id/status/:status', async (req, res, next) => {
    const userId = req.params.id;
    const orderStatus = req.params.status;
    try {
        const order = await orderService.getOrderByUserIdStatus(userId, orderStatus);
        return res.json(order);
    } catch (err) {
        console.log(err);
        const error = new Error(`No order for the user: ${userId}, status: ${orderStatus}`);
        error.status = 404;
        return next(error);
    }
})

router.post('/create', async (req, res, next) => {
    try{
        const {userId, menuId} = req.body;
        const newOrder = await orderService.createOrder(userId, menuId);
        return res.json(newOrder);
    } catch(err){
        console.log(err);
        const error = new Error(`Unexpected error while requesting new order`);
        error.status = 400;
        return next(error);
    }
});

router.post('/new', async(req, res, next) => {
    try{
        const {userId, menuId} = req.body;
        const orderedMenu = await orderService.createNewOrder(userId, menuId);
        return res.json(orderedMenu);
    } catch(err){
        console.log(err);
        const error = new Error(`Unexpected error while requesting new order`);
        error.status = 400;
        return next(error);
    }
});

router.get('/watch/:userid', async(req, res) => {

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const userId = req.params.userid;
    let i = 1;
    const intervalId = setInterval(async () => {
        
        console.log(`SSE Connection alive for the user: ${userId}, for ${i}`);
        const menuAlive = await orderService.getMenuOfActiveOrder(userId);
        res.write(`${JSON.stringify(menuAlive)}`);

        i++;
    }, 10000);

    req.on('close', () => {
        clearInterval(intervalId);
        res.end();
    });
})

router.put('/update/:id/status/:status/user/:userid', async(req, res, next) => {
    const orderId = req.params.id;
    const status = req.params.status;
    const userId = req.params.userid;
    try {
        const updatedOrder = await orderService.updateOrder(userId, orderId, status);
        return res.json(updatedOrder);
    } catch (err) {
        console.log(err);
        const error = new Error(`Error on invalid request for orderId:${orderId}`);
        error.status = 400;
        return next(error);
    }
});

router.put('/cancel', async(req, res, next) => {
    try{
        const {userId, menuId} = req.body;
        const orderedMenu = await orderService.cancelOrder(userId, menuId);
        return res.json(orderedMenu);
    } catch(err){
        console.log(err);
        const error = new Error(`Unexpected error while canceling active order`);
        error.status = 400;
        return next(error);
    }
})

router.delete('/delete/:id', async (req, res, next) => {
    const orderId = req.params.id;
    try {
        const deletedOrder = await orderService.deleteOrder(orderId);
        return res.json(deletedOrder);
    } catch (err) {
        console.log(err);
        const error = new Error(`Error on invalid request for orderId:${orderId}`);
        error.status = 400;
        return next(error);
    }
});


export default router;