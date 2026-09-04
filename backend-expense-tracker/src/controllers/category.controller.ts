import type { Request, Response } from "express";
import { categoryService } from "../services/category.service.js";

/**
 * Category Controller
 *
 * Handles HTTP requests related to categories.
 * It receives data from the request, calls the category service,
 * and returns the appropriate HTTP response.
 *
 * Business logic and database access are delegated to the
 * service and repository layers.
 */
export const categoryController = {

    // Creates a new category.
    async createCategory(req: Request, res: Response) {
        try {
            const category = await categoryService.createCategory({
                name: req.body.name,
                isActive: req.body.isActive,
            });

            return res.status(201).json(category);

        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({
                    error: error.message,
                });
            }

            return res.status(500).json({
                error: "Internal server error",
            });
        }
    },


    // Retrieves all categories.
    async getAll(req: Request, res: Response) {
        try {
            const categories = await categoryService.getAll();

            return res.status(200).json(categories);

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


    // Retrieves a category by its ID.
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


    // Retrieves a category by its name.
    async getCategoryByName(req: Request, res: Response) {
        try {
            const name = String(req.params.name);

            const category = await categoryService.getByName(name);

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


    // Updates an existing category.
    async updateCategory(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);

            const category = await categoryService.update(id, {
                name: req.body.name,
                isActive: req.body.isActive,
            });

            return res.status(200).json(category);

        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({
                    error: error.message,
                });
            }

            return res.status(500).json({
                error: "Internal server error",
            });
        }
    },


    // Deactivates a category using a soft delete.
    async deleteCategory(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);

            const category = await categoryService.delete(id);

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