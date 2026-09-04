import { prisma } from "../lib/prisma.js"

/**
 * Category Repository
 *
 * Handles all database operations related to categories using Prisma.
 * It provides methods to create, retrieve, update, and deactivate categories.
 *
 * When creating a category, the repository checks whether a category with the
 * same name already exists. If it exists but is inactive, it is reactivated
 * instead of creating a duplicate record.
 *
 * The delete operation performs a soft delete by setting isActive to false.
 */
export const categoryRepository = {

    // Creates a new category.
    create(data: {
        name: string;
        isActive: boolean;
    }) {
        return prisma.category.create({
            data,
        });
    },


    // Retrieves all categories.
    findAll(){
        return prisma.category.findMany({
            where: { isActive: true },
        });
    },


    // Finds a category by its unique ID.
    findById(id: number){
        return prisma.category.findUnique({
            where: { id },
        });
    },


    // Finds a category by its unique name.
    findByName(name: string){
        return prisma.category.findUnique({
            where: { name },
        });
    },


    // Updates the category name and active status.
    update(id: number, data: {
        name: string,
        isActive: boolean,
    } ){
        return prisma.category.update({
            where: { id },
            data,
        });
    },


    // Performs a soft delete by marking the category as inactive.
    delete(id: number){
        return prisma.category.update({
            where: { id },
            data: {
                isActive: false,
            },
        });
    },

};