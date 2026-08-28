import {Router} from 'express';
import { categoryController } from "../controllers/category.controller.js";
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { rolAuthMiddleware } from '../middlewares/role.middleware.js';

const categoryRouter = Router();

categoryRouter.get("/categoryById", authMiddleware, rolAuthMiddleware, categoryController.getCategoryById);

export { categoryRouter }