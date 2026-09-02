import type { Response } from "express";
import type { AuthenticatedRequest } from "../middlewares/auth.middleware.js";
import { expenseService } from "../services/expense.service.js";

/**
 * Expense Controller
 *
 * Handles HTTP requests related to expenses.
 * It receives request data, obtains the authenticated user's information,
 * calls the expense service, and returns the appropriate HTTP response.
 *
 * Business logic and database access are delegated to expenseService
 * and the repository layer.
 */
export const expenseController = {

    // Creates a new expense associated with the authenticated user.
    async create(req: AuthenticatedRequest, res: Response) {
        try {
            const data = {
                ...req.body,
                userId: req.user!.id,
            };

            const expense = await expenseService.createExpense(data);

            return res.status(201).json(expense);

        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message });
            }
            return res.status(500).json({ error: "Internal server error" });
        }
    },

    // Retrieves all expenses that belong to the authenticated user.
    async getAll(req: AuthenticatedRequest, res: Response) {
        try {
            const userId = req.user!.id;

            const expenses = await expenseService.getAll(userId);

            return res.status(200).json(expenses);

        } catch (error) {
            if (error instanceof Error) {
                return res.status(404).json({ error: error.message });
            }
            return res.status(500).json({ error: "Internal server error" });
        }
    },

    // Retrieves a specific expense by its ID.
    async getById(req: AuthenticatedRequest, res: Response) {
        try {
            const id = Number(req.params.id);

            const expense = await expenseService.getById(id);

            return res.status(200).json(expense);

        } catch (error) {
            if (error instanceof Error) {
                return res.status(404).json({ error: error.message });
            }
            return res.status(500).json({ error: "Internal server error" });
        }
    },

    // Updates an existing expense using the provided request data.
    async update(req: AuthenticatedRequest, res: Response) {
        try {
            const id = Number(req.params.id);

            const expense = await expenseService.update(id, req.body);

            return res.status(200).json(expense);

        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message });
            }
            return res.status(500).json({ error: "Internal server error" });
        }
    },

    // Deletes an expense by its ID.
    async delete(req: AuthenticatedRequest, res: Response) {
        try {
            const id = Number(req.params.id);

            await expenseService.delete(id);

            return res.status(204).send();

        } catch (error) {
            if (error instanceof Error) {
                return res.status(404).json({ error: error.message });
            }
            return res.status(500).json({ error: "Internal server error" });
        }
    },

};