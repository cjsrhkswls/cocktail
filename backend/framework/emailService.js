import nodemailer from 'nodemailer'
import 'dotenv/config'

export class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport(
            {
                host: process.env.BREVO_EMAIL_HOST,
                port: process.env.BREVO_EMAIL_PORT,
                auth: {
                    user: process.env.BREVO_EMAIL_AUTH_USER,
                    pass: process.env.BREVO_EMAIL_AUTH_PASS,
                }
            }
        )
    }

    sendMailToOwnerForNewOrder = (order, menu, user) => {
        const mailOptions = {
            from: process.env.BREVO_EMAIL,
            to: process.env.OWNER_EMAIL,
            subject: '2024 Christmas Cocktails: New order has been delivered!!',
            text: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Christmas Order Card</title>
            </head>
            <body style="margin: 0; padding: 0; background: #fff9c4; font-family: 'Poppins', sans-serif; color: #333;">
            <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background: #fff9c4; padding: 20px;">
                <tr>
                <td align="center">
                    <table width="600px" border="0" cellpadding="20" cellspacing="0" style="background: #fff7e5; border-radius: 20px; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); border: 3px solid #fbc02d;">
                    <tr>
                        <td align="center" style="font-size: 24px; font-weight: bold; color: #f57f17; text-transform: uppercase; padding: 10px;">
                        🎄 Christmas Order 🎄
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="font-size: 48px; padding: 10px;">
                        🎅
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="font-size: 20px; font-weight: bold; color: #fbc02d; padding: 10px;">
                        Order ID: ${order.orderId}
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="font-size: 18px; color: #f57f17; padding: 10px;">
                        Menu: ${menu.menuName}
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="font-size: 14px; color: #f44336; font-style: italic; padding: 10px;">
                        User: ${user.userNickname} (${user.userEmail})
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding: 20px;">
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                            <td style="width: 33.33%; text-align: center; font-size: 24px; line-height: 40px;">❄️</td>
                            <td style="width: 33.33%; text-align: center; font-size: 24px; line-height: 40px;">❄️</td>
                            <td style="width: 33.33%; text-align: center; font-size: 24px; line-height: 40px;">❄️</td>
                            </tr>
                        </table>
                        </td>
                    </tr>
                    </table>
                </td>
                </tr>
            </table>
            </body>
            </html>
            `
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
            from: process.env.BREVO_EMAIL,
            to: user.userEmail,
            subject: `2024 Christmas Cocktails: Hi ${user.userNickname},  your order has been requested!!`,
            text: `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Christmas Cocktail Order</title>
                </head>
                <body style="margin: 0; padding: 0; background: #e0f7fa; font-family: 'Poppins', sans-serif; color: #333;">
                <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background: #e0f7fa; padding: 20px;">
                    <tr>
                    <td align="center">
                        <table width="600px" border="0" cellpadding="20" cellspacing="0" style="background: #fff7f7; border-radius: 20px; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); border: 3px solid #ff6347;">
                        <tr>
                            <td align="center" style="font-size: 24px; font-weight: bold; color: #d32f2f; text-transform: uppercase; padding: 10px;">
                            🎄 Your Christmas Cocktail 🎄
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style="font-size: 48px; padding: 10px;">
                            🎅
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style="font-size: 20px; font-weight: bold; color: #c62828; padding: 10px;">
                            Order ID: ${order.orderId}
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style="font-size: 18px; color: #ef5350; padding: 10px;">
                            Menu: ${menu.menuName}
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style="font-size: 14px; color: #3949ab; font-style: italic; padding: 10px;">
                            "Stay cozy and enjoy your drink!"
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style="padding: 20px;">
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                <td style="width: 33.33%; text-align: center; font-size: 24px; line-height: 40px;">❄️</td>
                                <td style="width: 33.33%; text-align: center; font-size: 24px; line-height: 40px;">❄️</td>
                                <td style="width: 33.33%; text-align: center; font-size: 24px; line-height: 40px;">❄️</td>
                                </tr>
                            </table>
                            </td>
                        </tr>
                        </table>
                    </td>
                    </tr>
                </table>
                </body>
                </html>
                `
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
        const mailOptions = {
            from: process.env.BREVO_EMAIL,
            to: user.userEmail,
            subject: `2024 Christmas Cocktails: Hi ${user.userNickname}, your order has been ${order.orderStatus}!!`,
            text: `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Your Order Status Update</title>
                </head>
                <body style="margin: 0; padding: 0; background: #d7e5f4; font-family: 'Poppins', sans-serif; color: #333;">
                <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background: #d7e5f4; padding: 20px;">
                    <tr>
                    <td align="center">
                        <table width="600px" border="0" cellpadding="20" cellspacing="0" style="background: #ffffff; border-radius: 20px; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);">
                        <tr>
                            <td align="center" style="font-size: 24px; font-weight: bold; color: #1565c0; text-transform: uppercase; padding: 10px;">
                            📦 Your Order Update 📦
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style="font-size: 48px; padding: 10px;">
                            ☃️
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style="font-size: 18px; font-weight: bold; color: #424242; padding: 10px;">
                            Your order has been ${order.orderStatus}!
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style="font-size: 20px; font-weight: bold; color: #3949ab; padding: 10px;">
                            Order ID: ${order.orderId}
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style="font-size: 18px; color: #2e7d32; padding: 10px;">
                            Menu: ${menu.menuName}
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style="font-size: 14px; color: #6a1b9a; font-style: italic; padding: 10px;">
                            "Merry Christmas!"
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style="padding: 20px;">
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                <td style="width: 33.33%; text-align: center; font-size: 24px; line-height: 40px;">❄️</td>
                                <td style="width: 33.33%; text-align: center; font-size: 24px; line-height: 40px;">❄️</td>
                                <td style="width: 33.33%; text-align: center; font-size: 24px; line-height: 40px;">❄️</td>
                                </tr>
                            </table>
                            </td>
                        </tr>
                        </table>
                    </td>
                    </tr>
                </table>
                </body>
                </html>`,
        };

        this.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }

    sendMailToOwnerForOrderUpdate = (order, menu, user) => {
        const mailOptions = {
            from: process.env.BREVO_EMAIL,
            to: process.env.OWNER_EMAIL,
            subject: `2024 Christmas Cocktails: Order:${order.orderId} has been ${order.orderStatus}!!`,
            text: `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Your Order Status Update</title>
                </head>
                <body style="margin: 0; padding: 0; background: #d7e5f4; font-family: 'Poppins', sans-serif; color: #333;">
                <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background: #d7e5f4; padding: 20px;">
                    <tr>
                    <td align="center">
                        <table width="600px" border="0" cellpadding="20" cellspacing="0" style="background: #ffffff; border-radius: 20px; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);">
                        <tr>
                            <td align="center" style="font-size: 24px; font-weight: bold; color: #1565c0; text-transform: uppercase; padding: 10px;">
                            📦 Your Order Update 📦
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style="font-size: 48px; padding: 10px;">
                            ☃️
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style="font-size: 18px; font-weight: bold; color: #424242; padding: 10px;">
                            The following order has been ${order.orderStatus}!
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style="font-size: 20px; font-weight: bold; color: #3949ab; padding: 10px;">
                            Order ID: ${order.orderId}
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style="font-size: 18px; color: #2e7d32; padding: 10px;">
                            Menu: ${menu.menuName}
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style="font-size: 14px; color: #6a1b9a; font-style: italic; padding: 10px;">
                            "Merry Christmas!"
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style="padding: 20px;">
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                <td style="width: 33.33%; text-align: center; font-size: 24px; line-height: 40px;">❄️</td>
                                <td style="width: 33.33%; text-align: center; font-size: 24px; line-height: 40px;">❄️</td>
                                <td style="width: 33.33%; text-align: center; font-size: 24px; line-height: 40px;">❄️</td>
                                </tr>
                            </table>
                            </td>
                        </tr>
                        </table>
                    </td>
                    </tr>
                </table>
                </body>
                </html>`,
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