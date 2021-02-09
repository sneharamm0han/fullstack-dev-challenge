import calculationsRoutes from './calculationsRoutes';
import express from 'express';

const router = express.Router();

router.use('/calculations', calculationsRoutes);

export default router;