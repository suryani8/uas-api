import { Router } from 'express';
import { body } from 'express-validator';
import {
  searchMeals,
  getMealDetail,
  getCategories,
  getMealsByCategory,
  getMealsByArea,
  getMealsByIngredient,
  getRandomMeal,
  saveRecipe,
  getSavedRecipes,
  getSavedRecipeDetail,
  updateSavedRecipe,
  deleteSavedRecipe,
} from '../controllers/recipeController.js';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = Router();

// Validasi save recipe
const saveRecipeValidation = [
  body('mealId').notEmpty().withMessage('Meal ID wajib diisi'),
  body('mealName').notEmpty().withMessage('Nama resep wajib diisi'),
  body('category').notEmpty().withMessage('Kategori wajib diisi'),
  body('area').notEmpty().withMessage('Area wajib diisi'),
  body('thumbnail').notEmpty().withMessage('Thumbnail wajib diisi'),
];

// Public routes - TheMealDB API
router.get('/search', searchMeals);
router.get('/categories', getCategories);
router.get('/random', getRandomMeal);
router.get('/detail/:id', getMealDetail);
router.get('/category/:category', getMealsByCategory);
router.get('/area/:area', getMealsByArea);
router.get('/ingredient/:ingredient', getMealsByIngredient);

// Protected routes - Saved Recipes (CRUD)
router.post('/saved', authenticate, saveRecipeValidation, validate, saveRecipe);
router.get('/saved', authenticate, getSavedRecipes);
router.get('/saved/:id', authenticate, getSavedRecipeDetail);
router.put('/saved/:id', authenticate, updateSavedRecipe);
router.delete('/saved/:id', authenticate, deleteSavedRecipe);

export default router;
