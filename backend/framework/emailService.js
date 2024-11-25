import nodemailer from 'nodemailer'
import 'dotenv/config'
import { OrderStatus } from '../code';

export class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport(
            {
                service: process.env.EMAIL_PROVIDER,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                }
            }
        )
    }

    sendMailToOwnerForNewOrder = (order, menu, user) => {
        const mailOptions = {
            from: process.env.EMAIL,
            to: process.env.EMAIL,
            subject: 'New order has been requested!!',
            text: `The order id: ${order.orderId}, menu name: ${menu.menuName}, user email: ${user.userEmail}`
        };

        this.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }

    sendMailToUserForNewOrder = (order, menu, user) => {
        const mailOptions = {
            from: process.env.EMAIL,
            to: user.userEmail,
            subject: 'Your order has been requested!!',
            text: `The order id: ${order.orderId}, menu name: ${menu.menuName}`
        };

        this.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }

    sendMailToUserForOrderUpdate = (order, menu, user) => {
        let content;
        switch(order.orderStatus) {
            case OrderStatus.COMPLETED:
                content = `Your order, id: ${order.orderId}, menu name: ${menu.menuName} has been completed! Please pick up your drink.`;
                break;
            case OrderStatus.CANCELED:
                content = `Your order, id: ${order.orderId}, menu name: ${menu.menuName} has been cancelled!`;
                break;
            case OrderStatus.REJECTED:
                content = `Your order, id: ${order.orderId}, menu name: ${menu.menuName} has been rejected!`;
                break;
            default:
                content = ``;
                break;
        }

        const mailOptions = {
            from: process.env.EMAIL,
            to: user.userEmail,
            subject: `Your order has been ${order.orderStatus}!!`,
            text: content,
        };

        this.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}