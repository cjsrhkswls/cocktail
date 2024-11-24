import express from 'express';
import { reset } from './dml.js';

const router = express.Router();

router.get('/reset/:key', async (req, res, next) => {
    const key = req.params.key;
    try{
        if (key === process.env.RESET_KEY){
            reset();
            return res.json({
                msg: 'All your data successfully has been reset!'
            })
        }
        res.json({
            msg: 'Your key is not valid!'
        });
    } catch (err) {
        const error = new Error('Unexpected error while resetting data!!');
        return next(error);
    }
});

export default router;