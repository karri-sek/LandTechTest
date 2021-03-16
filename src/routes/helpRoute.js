import express from 'express';
import getHelpMessage from '../controllers/helpHandler';
export const helpRoute = express.Router();

helpRoute.get('/', (req, res) => {
    getHelpMessage(req, res);
});

export default helpRoute;
