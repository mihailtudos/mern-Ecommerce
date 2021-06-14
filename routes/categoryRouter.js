import express from 'express';
const router = express.Router();
import {isAdmin, protect} from "../middleware/authMiddleware.js";
import {getCategories} from "../controller/categoryController.js";

router.route('/').get(getCategories);

export default router;