import express from 'express';
import { UserService } from './userService.js'

const router = express.Router();
const userService = new UserService();

router.get('/all', async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        return res.json(users);
    } catch (err) {
        console.log(err);
        const error = new Error('No user data!');
        error.status = 404;
        return next(error);
    }
});

router.get('/id/:id', async (req, res, next) => {
    const userId = req.params.id;
    try{
        const user = await userService.getUserById(userId);
        return res.json(user);
    } catch(err) {
        console.log(err);
        const error = new Error(`No user for user Id: ${userId}`);
        error.status = 404;
        return next(error);
    }
});

router.get('/email/:email', async (req, res, next) => {
    const userEmail = req.params.email;
    try{
        const user = await userService.getUserByEmail(userEmail);
        return res.json(user);
    } catch(err) {
        console.log(err);
        const error = new Error(`No user for userEmail: ${userEmail}`);
        error.status = 404;
        return next(error);
    }
});

router.get('/type/:type', async (req, res, next) => {
    const userType = req.params.type;
    try{
        const users = await userService.getAllUsersByType(userType);
        res.json(users);
    } catch(err) {
        console.log(err);
        const error = new Error(`No users for user type: ${userType}`);
        error.status = 404;
        return next(error);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const { userNickname, userEmail, userType } = req.body;
        const newUser = await userService.login({userNickname, userEmail, userType});
        return res.json(newUser);
    } catch(err){
        console.log(err);
        const error = new Error(`Error on duplicate user email!!`);
        error.status = 400;
        return next(error);
    }
});

router.put('/confirm', async (req, res, next) => {
    try {
        const {userId, userNickname, userEmail, userType, userStatus } = req.body;
        const confirmedUser = await userService.confirmUser({userId, userNickname, userEmail, userType, userStatus });
        return res.json(confirmedUser);
    } catch(err){
        console.log(err);
        const error = new Error(`Error while confirming user login!!`);
        error.status = 400;
        return next(error);
    }
});

router.put('/reject', async (req, res, next) => {
    try {
        const {userId, userNickname, userEmail, userType, userStatus } = req.body;
        const rejectedUser = await userService.rejectUser({userId, userNickname, userEmail, userType, userStatus });
        return res.json(rejectedUser);
    } catch(err){
        console.log(err);
        const error = new Error(`Error while rejecting user login!!`);
        error.status = 400;
        return next(error);
    }
});

export default router;