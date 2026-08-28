import { prisma } from "../lib/prisma.js"

export const categoryRepository = {

    create(data: {
        name: string;
        isActive: boolean
    }){
        return prisma.category.create({
            data,
        });
    },


    findById(id: number){
        return prisma.category.findUnique({
            where: { id },
        });
    },


    findByName(name: string){
        return prisma.category.findUnique({
            where: { name },
        });
    },


};