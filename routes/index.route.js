import { Router } from 'express';
import computadorasRoute from './computadoras.route.js';

const router = Router();

router.use("/computadoras", computadorasRoute);

export default router;