import express from 'express';
const router = express.Router();
import {isAdmin, protect} from "../middleware/authMiddleware.js";
import {createCategory, getCategories} from "../controller/categoryController.js";

router.route('/').get(getCategories).post( protect, createCategory);

export default router;