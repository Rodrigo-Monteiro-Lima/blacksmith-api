import { Router } from 'express';
import OrderController from '../controllers/order.controller';
import AuthMiddleware from '../middlewares/auth.middleware';

const router = Router();

const orderController = new OrderController();

const authMiddleware = new AuthMiddleware();

router.get('/', orderController.getAll);

router.post('/', authMiddleware.auth, orderController.create);

export default router;