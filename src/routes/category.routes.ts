import { Router } from "express";

import { categoryController } from "../controllers/category.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { rolAuthMiddleware } from "../middlewares/role.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createCategorySchema, updateCategorySchema } from "../schemas/category.schema.js";

const categoryRouter = Router();

// Any authenticated user can view categories
categoryRouter.get("/", categoryController.getAll);

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
    validate(createCategorySchema),
    categoryController.createCategory
);

categoryRouter.put(
    "/:id",
    authMiddleware,
    rolAuthMiddleware,
    validate(updateCategorySchema),
    categoryController.updateCategory
);

categoryRouter.delete(
    "/:id",
    authMiddleware,
    rolAuthMiddleware,
    categoryController.deleteCategory
);

export { categoryRouter };