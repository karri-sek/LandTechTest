import express from 'express';
import {getLandCount} from '../controllers/landRegistry';

export const landRegistryRoute = express.Router();

landRegistryRoute.get('/', (req, res) => {
    getLandCount(req, res);
});

export default landRegistryRoute;
