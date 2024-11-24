import { Service } from "../framework/service.js";
import { MenuDataFacade } from "./menuDataFacade.js";

export class MenuService extends Service {
    constructor() {
        super();
        this.menuDataFacade = new MenuDataFacade();
    }

    getAllMenus = async () => {
        const result = await this.menuDataFacade.getAllMenus();

        if (result.length < 1) {
            this.throwError('There is no menu items at all.. Please run reset script!');
        }
        return result;
    }

    getMenuById = async (menuId) => {
        this.checkId(menuId);
        const result = await this.menuDataFacade.getMenuById(menuId);

        if (!result || result === null) {
            this.throwError(`No menu item for menu identifier:${menuId}`);
        }

        return result;
    }

    getMenuByName = async (menuName) => {
        this.checkStringValue(menuName);
        const result = await this.menuDataFacade.getMenuByName(menuName);

        if (!result || result === null) {
            this.throwError(`No menu item for menu name:${menuName}`);
        }

        return result;
    }

    createMenu = async (newMenu) => {
        this.checkObjectValue(newMenu);
        this.checkStringValue(newMenu.menuName);
        const existingMenu = await this.menuDataFacade.getMenuByName(newMenu.menuName);

        if (existingMenu || existingMenu !== null) {
            this.throwError(`The menu to be created has a duplicate menuName: ${newMenu.menuName}!!`);
        }

        await this.menuDataFacade.createMenu(newMenu);

        const createdMenu = await this.menuDataFacade.getMenuByName(newMenu.menuName);
        return createdMenu;
    }

    updateMenu = async (menuId, updateMenu) => {
        this.checkObjectValue(updateMenu);
        this.checkId(menuId);
        this.checkStringValue(updateMenu.menuName);

        const existingMenu = await this.menuDataFacade.getMenuById(menuId);

        if (!existingMenu || existingMenu === null) {
            this.throwError(`The menu to be updated does not exist: ${menuId}!!`);
        }

        const duplicateMenu = await this.menuDataFacade.getMenuByName(updateMenu.menuName);

        if (duplicateMenu || duplicateMenu !== null) {
            if (duplicateMenu.menuId !== parseInt(menuId)){
                this.throwError(`The menu to be updated has a duplicate menuName: ${updateMenu.menuName}!!`);
            }
        }

        const updatedRows = await this.menuDataFacade.updateMenu(menuId, updateMenu);
        
        if (updatedRows == 0) {
            this.throwError(`No menu records to be updated for menuId:${menuId}`);
        } else {
            console.log(`Menu:${updateMenu.menuName} updated`);
            const updatedMenu = await this.menuDataFacade.getMenuById(menuId);
            return updatedMenu;
        }
    }

    deleteMenu = async (menuId) => {
        this.checkId(menuId);
        const existingMenu = await this.menuDataFacade.getMenuById(menuId);

        if (!existingMenu || existingMenu === null) {
            this.throwError(`The menu to be deleted does not exist: ${menuId}!!`);
        }

        const deletedRowCount = await this.menuDataFacade.deleteMenu(menuId);

        if (deletedRowCount === 0) {
            console.log('No menu records to be deleted');
        } else {
            console.log(`${deletedRowCount} rows deleted for ${existingMenu.menuName}`);
            return existingMenu;
        }
    }
}