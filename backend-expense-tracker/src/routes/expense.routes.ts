import { Router } from "express";

import { expenseController } from "../controllers/expense.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createExpenseSchema, updateExpenseSchema } from "../schemas/expense.schema.js";

const expenseRouter = Router();

// All expense routes require authentication
expenseRouter.use(authMiddleware);

expenseRouter.post("/", validate(createExpenseSchema), expenseController.create);
expenseRouter.get("/", expenseController.getAll);
expenseRouter.get("/:id", expenseController.getById);
expenseRouter.put("/:id", validate(updateExpenseSchema), expenseController.update);
expenseRouter.delete("/:id", expenseController.delete);

export { expenseRouter }