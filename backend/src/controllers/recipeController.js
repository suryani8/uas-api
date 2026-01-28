import prisma from '../utils/prisma.js';
import * as mealdbService from '../services/mealdbService.js';

// ==================== API TheMealDB ====================

// Search resep dari TheMealDB
export const searchMeals = async (req, res, next) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ success: false, message: 'Query pencarian required' });
    }

    const meals = await mealdbService.searchMeals(q);
    res.json({ success: true, data: meals });
  } catch (error) {
    next(error);
  }
};

// Get detail resep dari TheMealDB
export const getMealDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const meal = await mealdbService.getMealById(id);

    if (!meal) {
      return res.status(404).json({ success: false, message: 'Resep tidak ditemukan' });
    }

    res.json({ success: true, data: meal });
  } catch (error) {
    next(error);
  }
};

// Get semua kategori
export const getCategories = async (req, res, next) => {
  try {
    const categories = await mealdbService.getCategories();
    res.json({ success: true, data: categories });
  } catch (error) {
    next(error);
  }
};

// Get resep by kategori
export const getMealsByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const meals = await mealdbService.getMealsByCategory(category);
    res.json({ success: true, data: meals });
  } catch (error) {
    next(error);
  }
};

// Get resep by area
export const getMealsByArea = async (req, res, next) => {
  try {
    const { area } = req.params;
    const meals = await mealdbService.getMealsByArea(area);
    res.json({ success: true, data: meals });
  } catch (error) {
    next(error);
  }
};

// Get resep by ingredient
export const getMealsByIngredient = async (req, res, next) => {
  try {
    const { ingredient } = req.params;
    const meals = await mealdbService.getMealsByIngredient(ingredient);
    res.json({ success: true, data: meals });
  } catch (error) {
    next(error);
  }
};

// Get random resep
export const getRandomMeal = async (req, res, next) => {
  try {
    const meal = await mealdbService.getRandomMeal();
    res.json({ success: true, data: meal });
  } catch (error) {
    next(error);
  }
};

// ==================== CRUD Saved Recipes ====================

// CREATE - Simpan resep ke koleksi
export const saveRecipe = async (req, res, next) => {
  try {
    const { mealId, mealName, category, area, thumbnail } = req.body;

    // Cek apakah sudah disimpan
    const existing = await prisma.savedRecipe.findUnique({
      where: { userId_mealId: { userId: req.userId, mealId } },
    });

    if (existing) {
      return res.status(400).json({ success: false, message: 'Resep sudah ada di koleksi' });
    }

    const savedRecipe = await prisma.savedRecipe.create({
      data: {
        userId: req.userId,
        mealId,
        mealName,
        category,
        area,
        thumbnail,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Resep berhasil disimpan',
      data: savedRecipe,
    });
  } catch (error) {
    next(error);
  }
};

// READ - Get semua resep tersimpan user
export const getSavedRecipes = async (req, res, next) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;

    const where = { userId: req.userId };
    if (category) where.category = category;

    const [recipes, total] = await Promise.all([
      prisma.savedRecipe.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (parseInt(page) - 1) * parseInt(limit),
        take: parseInt(limit),
      }),
      prisma.savedRecipe.count({ where }),
    ]);

    res.json({
      success: true,
      data: recipes,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    next(error);
  }
};

// READ - Get detail resep tersimpan
export const getSavedRecipeDetail = async (req, res, next) => {
  try {
    const { id } = req.params;

    const recipe = await prisma.savedRecipe.findFirst({
      where: { id: parseInt(id), userId: req.userId },
    });

    if (!recipe) {
      return res.status(404).json({ success: false, message: 'Resep tidak ditemukan' });
    }

    res.json({ success: true, data: recipe });
  } catch (error) {
    next(error);
  }
};

// UPDATE - Update catatan/rating resep
export const updateSavedRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { personalNotes, rating } = req.body;

    const recipe = await prisma.savedRecipe.findFirst({
      where: { id: parseInt(id), userId: req.userId },
    });

    if (!recipe) {
      return res.status(404).json({ success: false, message: 'Resep tidak ditemukan' });
    }

    const updated = await prisma.savedRecipe.update({
      where: { id: parseInt(id) },
      data: { personalNotes, rating },
    });

    res.json({
      success: true,
      message: 'Resep berhasil diupdate',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE - Hapus resep dari koleksi
export const deleteSavedRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;

    const recipe = await prisma.savedRecipe.findFirst({
      where: { id: parseInt(id), userId: req.userId },
    });

    if (!recipe) {
      return res.status(404).json({ success: false, message: 'Resep tidak ditemukan' });
    }

    await prisma.savedRecipe.delete({ where: { id: parseInt(id) } });

    res.json({ success: true, message: 'Resep berhasil dihapus' });
  } catch (error) {
    next(error);
  }
};
