import { categoryRepository } from "../repositories/category.repository.js";

type CategoryData = {
    name: string;
    isActive: boolean;
};

/**
 * Category Service
 *
 * Contains the business logic related to categories.
 * It validates category existence, prevents duplicated names,
 * and coordinates create, read, update, and delete operations
 * through the category repository.
 *
 * This layer does not interact directly with the database.
 * Database access is delegated to categoryRepository.
 */
export const categoryService = {

    // Creates a new category or reactivates it if it already exists but is inactive.
    async createCategory(data: { name: string }) {
        const existingCategory = await categoryRepository.findByName(data.name);

        if (existingCategory?.isActive) {
            throw new Error("Category already exists");
        }

        if (existingCategory && !existingCategory.isActive) {
            return categoryRepository.update(existingCategory.id, {
                name: existingCategory.name,
                isActive: true,
            });
        }

        // Se fuerza isActive: true explícitamente, sin importar qué mande el cliente
        return categoryRepository.create({
            name: data.name,
            isActive: true,
        });
    },

    // Finds a category by its unique ID.
    async getById(id: number) {
        const category = await categoryRepository.findById(id);

        if (!category) {
            throw new Error("Category not found");
        }

        return category;
    },

    // Finds a category by its unique name.
    async getByName(name: string) {
        const category = await categoryRepository.findByName(name);

        if (!category) {
            throw new Error("Category not found");
        }

        return {
            id: category.id,
            name: category.name,
            isActive: category.isActive,
        };
    },

    // Retrieves all categories from the database.
    async getAll() {
        const categories = await categoryRepository.findAll();

        if (categories.length === 0) {
            throw new Error("Categories not found");
        }

        return categories;
    },

    // Updates an existing category while preventing duplicated category names.
    async update(id: number, data: CategoryData) {
        const existingCategory = await categoryRepository.findById(id);

        if (!existingCategory) {
            throw new Error("Category does not exist");
        }

        // Check name availability only when the category name is being changed.
        if (data.name !== existingCategory.name) {
            const nameTaken = await categoryRepository.findByName(data.name);

            if (nameTaken) {
                throw new Error("Category name already in use");
            }
        }

        return categoryRepository.update(id, data);
    },

    // Deactivates a category only if it exists and is currently active.
    async delete(id: number) {
        const existingCategory = await categoryRepository.findById(id);

        if (!existingCategory || !existingCategory.isActive) {
            throw new Error("Category does not exist");
        }

        return categoryRepository.delete(id);
    },
};