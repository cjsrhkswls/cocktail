import { conn } from '../framework/databaseConnection.js'
import { Menu } from '../model/menu.js';

export class MenuDataFacade {
    constructor() {
        this.conn = conn;
        this.menu = Menu;
    }

    getAllMenus = async () => {
        return await Menu.findAll();
    }

    getMenuById = async (menuId) => {
        return await Menu.findByPk(menuId);
    }

    getMenuByName = async (name) => {
        return await Menu.findOne({
            where: { menuName: name }
        });
    }

    createMenu = async (newMenu) => {
        await Menu.create(
            {
                menuName: newMenu.menuName,
                menuType: newMenu.menuType,
                menuDescription: newMenu.menuDescription,
                alcoholLevel: newMenu.alcoholLevel
            })
            .catch(err => {
                console.log(err);
                return new Error(err);
            });
    }

    updateMenu = async (menuId, newMenu) => {
        const [updatedRows] = await Menu.update(
            {
                menuName: newMenu.menuName,
                menuType: newMenu.menuType,
                menuDescription: newMenu.menuDescription,
                alcoholLevel: newMenu.alcoholLevel
            },
            {
                where: { menuId: menuId }
            })
            .catch(err => {
                console.log(err);
                return new Error(err);
            });

        return [updatedRows];
    }

    deleteMenu = async (menuId) => {
        const deletedRowCount = await Menu.destroy(
            {
                where: {
                    menuId: menuId,
                }
            })
            .catch(err => {
                console.log(err);
                return new Error(err);
            });

        return deletedRowCount;
    }

}