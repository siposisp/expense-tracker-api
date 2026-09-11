import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema  } from "../schemas/auth.schema.js";

const authRouter = Router();

authRouter.post("/register", validate(registerSchema), authController.register);
authRouter.post("/login", validate(loginSchema), authController.login);
authRouter.post("/forgot-password", validate(forgotPasswordSchema), authController.forgotPassword);
authRouter.post("/reset-password", validate(resetPasswordSchema), authController.resetPassword);

export { authRouter };