import { z } from "zod";

export const createExpenseSchema = z.object({
    amount: z.coerce.number().positive("Amount must be greater than 0"),
    description: z.string().min(1, "Description is required"),
    date: z.coerce.date(),
    categoryId: z.number().int().positive(),
});

export const updateExpenseSchema = createExpenseSchema;

export type CreateExpenseInput = z.infer<typeof createExpenseSchema>;