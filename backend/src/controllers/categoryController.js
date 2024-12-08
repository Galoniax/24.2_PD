import { CategoryService } from "../services/categoryService.js";


export class CategoryController {

    static async getAll(req, res) {
        try {
            const categories = await CategoryService.getAll();  
            res.status(200).json(categories);
        } catch (error) {    
            res.status(500).json({ error: error.message });
        }
    }

    static async create(req, res) {
        try {
            const { name, subcategories } = req.body;
            const category = await CategoryService.createCategory({name, subcategories});
            res.status(201).json(category);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;
            const category = await CategoryService.deleteCategory({id});
            res.status(200).json(category);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async update(req, res) {
        try {
            const { id, name, subcategories } = req.body;
            const category = await CategoryService.updateCategory({id, name, subcategories});
            res.status(200).json(category);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}