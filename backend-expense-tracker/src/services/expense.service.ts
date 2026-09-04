import type { Prisma } from "../generated/prisma/client.js";
import { expenseRepository } from "../repositories/expense.repository.js";

type ExpenseData = {
    amount: Prisma.Decimal;
    description: string;
    date: Date;
    userId: number;
    categoryId: number;
};

/**
 * Expense Service
 *
 * Contains the business logic related to expenses.
 * It coordinates expense creation, retrieval, update, and deletion
 * through the expense repository.
 *
 * The service also ensures that inactive or non-existing expenses
 * cannot be retrieved, updated, or deleted.
 *
 * Database access is delegated to expenseRepository.
 */
export const expenseService = {

    // Creates a new expense using the provided expense data.
    createExpense(data: ExpenseData) {
        return expenseRepository.create(data);
    },

    // Finds an active expense by its unique ID.
    async getById(id: number) {
        const expense = await expenseRepository.findById(id);

        if (!expense || !expense.isActive) {
            throw new Error("Expense not found");
        }

        return expense;
    },

    // Retrieves all active expenses that belong to a specific user.
    async getAll(userId: number) {
        return expenseRepository.findAllByUserId(userId);
    },

    // Updates an expense only if it exists and is currently active.
    async update(id: number, data: ExpenseData) {
        const existingExpense = await expenseRepository.findById(id);

        if (!existingExpense || !existingExpense.isActive) {
            throw new Error("Expense does not exist");
        }

        return expenseRepository.update(id, data);
    },

    // Performs a soft delete only if the expense exists and is active.
    async delete(id: number) {
        const existingExpense = await expenseRepository.findById(id);

        if (!existingExpense || !existingExpense.isActive) {
            throw new Error("Expense does not exist");
        }

        return expenseRepository.delete(id);
    },
};