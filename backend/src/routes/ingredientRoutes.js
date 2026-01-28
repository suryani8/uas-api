import { Router } from 'express';
import { body } from 'express-validator';
import {
  addIngredient,
  getIngredients,
  deleteIngredient,
  suggestRecipes,
} from '../controllers/ingredientController.js';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = Router();

// Validasi add ingredient
const addIngredientValidation = [
  body('name').trim().notEmpty().withMessage('Nama bahan wajib diisi'),
];

// Semua route butuh authentication
router.use(authenticate);

router.post('/', addIngredientValidation, validate, addIngredient);
router.get('/', getIngredients);
router.delete('/:id', deleteIngredient);
router.get('/suggest', suggestRecipes);

export default router;
