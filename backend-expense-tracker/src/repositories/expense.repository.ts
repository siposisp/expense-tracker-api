import { prisma } from "../lib/prisma.js";
import type { Prisma } from "../generated/prisma/client.js";

/**
 * Expense Repository
 *
 * Handles all database operations related to expenses using Prisma.
 * It provides methods to create, retrieve, update, and deactivate expenses.
 *
 * Expenses are filtered by user when listing data, and deletion is handled
 * as a soft delete by setting isActive to false instead of removing
 * the record permanently.
 */
export const expenseRepository = {

    // Creates a new expense in the database.
    async create(data: {
        amount: Prisma.Decimal;
        description: string;
        date: Date;
        userId: number;
        categoryId: number;
    }) {
        return prisma.expense.create({
            data,
        });
    },

    // Retrieves all active expenses that belong to a specific user.
    findAllByUserId(userId: number) {
        return prisma.expense.findMany({
            where: {
                userId,
                isActive: true,
            },
            include: {
                category: true,
            }
        });
    },

    // Finds an expense by its unique ID.
    findById(id: number) {
        return prisma.expense.findUnique({
            where: { id },
        });
    },

    // Updates the fields of an existing expense.
    update(id: number, data: {
        amount: Prisma.Decimal;
        description: string;
        date: Date;
        userId: number;
        categoryId: number;
    }) {
        return prisma.expense.update({
            where: { id },
            data,
        });
    },

    // Performs a soft delete by marking the expense as inactive.
    delete(id: number) {
        return prisma.expense.update({
            where: { id },
            data: {
                isActive: false,
            },
        });
    },

};