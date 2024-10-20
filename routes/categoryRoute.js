import express from 'express';
import { createCategory, DeleteCategory, getCategories, getCategoryById, UpdateCategory } from '../controllers/categoryController.js';


const categoryRoute = express.Router();

categoryRoute.get('/', getCategories);
categoryRoute.get('/:id', getCategoryById);
categoryRoute.post('/', createCategory);
categoryRoute.put('/:id', UpdateCategory);
categoryRoute.delete('/:id', DeleteCategory);

export default categoryRoute;