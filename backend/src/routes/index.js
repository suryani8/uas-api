import { Router } from 'express';
import authRoutes from './authRoutes.js';
import recipeRoutes from './recipeRoutes.js';
import ingredientRoutes from './ingredientRoutes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/recipes', recipeRoutes);
router.use('/ingredients', ingredientRoutes);

export default router;
