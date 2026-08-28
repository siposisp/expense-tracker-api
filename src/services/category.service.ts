import { categoryRepository } from "../repositories/category.repository.js";

type CategoryData = {
    name: string;
    isActive: boolean;
}

export const categoryService = {

    async createCategory(data: CategoryData){
        const existingCategory = await categoryRepository.findByName(data.name);

        if(existingCategory){
            throw new Error('Category already exists');
        }

        const category = await categoryRepository.create({
            name: data.name,
            isActive: data.isActive,
        })

        return {
            id: category.id,
            name: category.name,
            isActive: category.isActive,
        }
    },

    async getById(id: number){
        const category = await categoryRepository.findById(id);

        if(!category){
            throw new Error("Category not found");
        }

        return {
            id: category.id,
            name: category.name,
            isActive: category.isActive,
        }
    },

    async getByName(name: string){
        const category = await categoryRepository.findByName(name);

        if(!category){
            throw new Error("Category not found");
        }

        return {
            id: category.id,
            name: category.name,
            isActive: category.isActive,
        }
    },

};

