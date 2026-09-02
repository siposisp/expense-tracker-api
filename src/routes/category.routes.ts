import { Router } from "express";

import { categoryController } from "../controllers/category.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { rolAuthMiddleware } from "../middlewares/role.middleware.js";

const categoryRouter = Router();

// Any authenticated user can view categories
categoryRouter.get("/",categoryController.getAll);

categoryRouter.get(
    "/name/:name",
    categoryController.getCategoryByName
);

categoryRouter.get(
    "/:id",
    categoryController.getCategoryById
);

// Only administrators can manage categories
categoryRouter.post(
    "/",
    authMiddleware,
    rolAuthMiddleware,
    categoryController.createCategory
);

categoryRouter.put(
    "/:id",
    authMiddleware,
    rolAuthMiddleware,
    categoryController.updateCategory
);

categoryRouter.delete(
    "/:id",
    authMiddleware,
    rolAuthMiddleware,
    categoryController.deleteCategory
);

export { categoryRouter };