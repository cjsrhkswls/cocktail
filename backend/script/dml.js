import { Menu } from "../model/menu.js";
import { AlcoholLevel, MenuType, UserType } from '../code.js';
import { User } from "../model/user.js";
import { Order } from "../model/order.js"
import { conn } from "../framework/databaseConnection.js";

export const reset = (async () => {
    conn.query('SET GLOBAL FOREIGN_KEY_CHECKS = 0;', { raw: true })
        .then(
            () => {
                Order.truncate({
                    cascade: true,
                })
            }
        )
        .then(
            () => {
                Menu.truncate({
                    cascade: true,
                })
            }
        )
        .then(
            () => {
                User.truncate({
                    cascade: true,
                })
            }
        )
        .then(
            () => {
                Menu.create(
                    {
                        menuName: 'Vodka Sunrise',
                        menuType: MenuType.COCKTAIL,
                        menuDescription: 'Sweet, tangy, and citrusy, with a smooth kick of vodka. Perfect for sunny days or casual gatherings!',
                        alcoholLevel: AlcoholLevel.LOW
                    },
                )
            }
        )
        .then(
            () => {
                User.create(
                    {
                        userNickname:'Gwanjin',
                        userEmail: 'cjsrhkswls@gmail.com',
                        userType: UserType.ADMIN,
                    }
                );

                User.create(
                    {
                        userNickname:'Eileen',
                        userEmail: 'eileens93@hotmail.com',
                        userType: UserType.CUSTOMER,
                    }
                )
            }
        )
        .then(
            () => {
                conn.query('SET GLOBAL FOREIGN_KEY_CHECKS = 1;', { raw: true })
            }
        )
});