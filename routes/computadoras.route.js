// routes/computadoras.route.js
import { Router } from 'express';
import { 
    getComputadorasHandler,
    postComputadoraHandler
} from '../controllers/computadoras.controller.js';

const router = Router();
router.get('/', getComputadorasHandler);
router.post('/', postComputadoraHandler);

export default router;