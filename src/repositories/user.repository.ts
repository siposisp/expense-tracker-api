import { prisma } from "../lib/prisma.js";

export const userRepository = {

    create(data: {
        email: string;
        password: string;
        name: string;
    }) {
        return prisma.user.create({
            data,
        });
    },

    findById(id: number){
        return prisma.user.findUnique({
            where: { id },
        });
    },

    findByEmail(email: string) {
        return prisma.user.findUnique({
            where: { email },
        });

    },

};



