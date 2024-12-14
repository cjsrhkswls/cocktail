import { Menu } from "../model/menu.js";
import { AlcoholLevel, MenuType, UserStatus, UserType } from '../code.js';
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
                        menuDescription: 'Sweet, tangy, and citrusy, with a smooth kick of vodka. Perfect for casual gatherings.',
                        alcoholLevel: AlcoholLevel.LOW
                    },
                );

                Menu.create(
                    {
                        menuName: 'Cosmopolitan',
                        menuType: MenuType.COCKTAIL,
                        menuDescription: 'Stylish, sweet-tart cocktail with vibrant pink hue and refreshing citrusy flavor',
                        alcoholLevel: AlcoholLevel.MEDIUM
                    },
                );

                Menu.create(
                    {
                        menuName: 'Balalaika',
                        menuType: MenuType.COCKTAIL,
                        menuDescription: 'Classic, refreshing cocktail offering a bright and citrusy flavor with a smooth finish',
                        alcoholLevel: AlcoholLevel.HIGH
                    },
                );

                Menu.create(
                    {
                        menuName: 'Japanese Slipper',
                        menuType: MenuType.COCKTAIL,
                        menuDescription: 'Vibrant, sweet, and tangy with a cherry garnish',
                        alcoholLevel: AlcoholLevel.HIGH
                    },
                );

                Menu.create(
                    {
                        menuName: 'Woo Woo',
                        menuType: MenuType.COCKTAIL,
                        menuDescription: 'Fruity and refreshing with sweet and tangy flavor',
                        alcoholLevel: AlcoholLevel.LOW
                    },
                );

                Menu.create(
                    {
                        menuName: 'Frankenstein',
                        menuType: MenuType.COCKTAIL,
                        menuDescription: 'Bold, spooky-themed drink with citrus flavor',
                        alcoholLevel: AlcoholLevel.LOW
                    },
                );

                Menu.create(
                    {
                        menuName: 'Christmas Special',
                        menuType: MenuType.COCKTAIL,
                        menuDescription: 'Secret',
                        alcoholLevel: AlcoholLevel.MEDIUM
                    },
                );

                Menu.create(
                    {
                        menuName: 'Vodka Bam',
                        menuType: MenuType.COCKTAIL,
                        menuDescription: 'Fizzy, sweet, and stimulating mix ideal for a lively night out',
                        alcoholLevel: AlcoholLevel.HIGH
                    },
                );

                Menu.create(
                    {
                        menuName: 'Peach Highball',
                        menuType: MenuType.COCKTAIL,
                        menuDescription: 'Light and refreshing, offering a sweet, fruity, and effervescent taste',
                        alcoholLevel: AlcoholLevel.MEDIUM
                    },
                );
            }
        )
        .then(
            () => {
                User.create(
                    {
                        userNickname:'Gwanjin',
                        userEmail: 'cjsrhkswls@gmail.com',
                        userType: UserType.ADMIN,
                        userStatus: UserStatus.CONFIRMED,
                    }
                );

                User.create(
                    {
                        userNickname:'Eileen',
                        userEmail: 'eileens93@hotmail.com',
                        userType: UserType.CUSTOMER,
                        userStatus: UserStatus.CONFIRMED,
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