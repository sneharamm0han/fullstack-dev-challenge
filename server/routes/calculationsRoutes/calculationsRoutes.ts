import {calculationsController as calculations} from '../../controllers';
import express from 'express';

const router = express.Router();

router.route('/').post(calculations.calculate);

export default router;
