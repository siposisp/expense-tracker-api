import bcrypt from 'bcrypt';
import { userRepository } from '../repositories/user.repository.js';
import jwt from 'jsonwebtoken';

type RegisterData = {
    name: string;
    email: string;
    password: string;
};

export const authService = {
    async register(data: RegisterData) {
        const existingUser = await userRepository.findByEmail(data.email);

        if(existingUser){
            throw new Error('User already exists');
        }
        
        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await userRepository.create({
            name: data.name,
            email: data.email,
            password: hashedPassword,
        })

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
        };
    },


    async login(email: string, password: string){
        const user = await userRepository.findByEmail(email);

        if(!user){
            throw new Error('Invalid email or password');
        }

        const passwordMatches = await bcrypt.compare(
            password,
            user.password
        )

        if (!passwordMatches){
            throw new Error('Invalid email or password');
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role,     
            },
            process.env.JWT_SECRET!,
            {
                expiresIn: "1d",
            }
        );

        return {
            token,
        };
    },
};



