import express from 'express';
import { MenuService } from './menuService.js';

const router = express.Router();
const menuService = new MenuService();

router.get('/all', async (req, res, next) => {
    try {
        const menus = await menuService.getAllMenus();
        return res.json(menus);
    } catch (err) {
        console.log(err);
        const error = new Error(`No menu items!`);
        error.status = 404;
        return next(error);
    }
});

router.get('/id/:id', async (req, res, next) => {
    const menuId = req.params.id;
    try{
        const menu = await menuService.getMenuById(menuId);
        return res.json(menu);
    } catch(err) {
        console.log(err);
        const error = new Error(`No menu for menuId: ${menuId}`);
        error.status = 404;
        return next(error);
    }
});

router.get('/name/:name', async (req, res, next) => {
    const menuName = req.params.name;
    try{
        const menu = await menuService.getMenuByName(menuName);
        return res.json(menu);
    } catch(err) {
        console.log(err);
        const error = new Error(`No menu for menuName: ${menuName}`);
        error.status = 404;
        return next(error);
    }
});

router.post('/create', async (req, res, next) => {
    try{
        const { menuName, menuType, menuDescription, alcoholLevel } = req.body;
        const newMenu = await menuService.createMenu({ menuName, menuType, menuDescription, alcoholLevel });
        return res.json(newMenu);
    } catch(err){
        console.log(err);
        const error = new Error(`Error on duplicate menu name!!`);
        error.status = 400;
        return next(error);
    }
});

router.put('/update/:id', async (req, res, next) => {
    const menuId = req.params.id;
    try{
        const { menuName, menuType, menuDescription, alcoholLevel } = req.body;
        const updatedMenu = await menuService.updateMenu(menuId, { menuName, menuType, menuDescription, alcoholLevel });
        return res.json(updatedMenu);
    } catch(err){
        console.log(err);
        const error = new Error(`Error on invalid request for menuId:${menuId}`);
        error.status = 400;
        return next(error);
    }
});

router.delete('/delete/:id', async (req, res, next) => {
    const menuId = req.params.id;
    try{
        const deletedMenu = await menuService.deleteMenu(menuId);
        return res.json(deletedMenu);
    } catch(err) {
        console.log(err);
        const error = new Error(`Error on invalid request for menuId:${menuId}`);
        error.status = 400;
        return next(error);
    }
});


export default router;