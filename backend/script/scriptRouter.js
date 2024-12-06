import express from 'express';
import { ScriptService } from './scriptService.js';

const router = express.Router();
const scriptService = new ScriptService();

router.put('/reset', async (req, res, next) => {
    try{
        const {userId, code} = req.body;

        await scriptService.resetData(userId, code);
        res.json('done');
    } catch (err) {
        console.log(err);
        const error = new Error('Unexpected error while resetting data!!');
        error.status = 400;
        return next(error);
    }
});

export default router;