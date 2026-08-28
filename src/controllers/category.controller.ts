import type { Request, Response } from "express";
import { categoryService } from "../services/category.service.js";

export const categoryController = {
  async getCategoryById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const category = await categoryService.getById(id);

      return res.status(200).json(category);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(404).json({
          error: error.message,
        });
      }

      return res.status(500).json({
        error: "Internal server error",
      });
    }
  },
};