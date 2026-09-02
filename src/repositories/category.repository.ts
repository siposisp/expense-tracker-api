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

    // Creates a new category or reactivates an inactive category with the same name.
    async create(data: {
        name: string;
        isActive: boolean
    }){
        const verifyExist = await this.findByName(data.name);

        // Create the category if no category with the same name exists.
        if(!verifyExist){
            return prisma.category.create({
                data,
            });
        }

        // Prevent creating a duplicate active category.
        if(verifyExist.isActive) {
            throw new Error('Category already exists');
        }

        // Reactivate the existing category instead of creating a new one.
        return this.update(verifyExist.id, {
            name: verifyExist.name, 
            isActive: true,
        });
    },


    // Retrieves all categories.
    findAll(){
        return prisma.category.findMany();
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