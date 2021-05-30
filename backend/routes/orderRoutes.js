import express from 'express';
const router = express.Router();
import {addOrderItems, getOrderById, updateOrderToPaid, getMyOrders} from "../controller/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route('/myorders').get(protect, getMyOrders);
router.route('/').post(protect, addOrderItems);
router.route('/pay/:id').put(protect, updateOrderToPaid);
router.route('/:id').get(protect, getOrderById);

export default router;
