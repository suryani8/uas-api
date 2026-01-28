import prisma from '../utils/prisma.js';
import * as mealdbService from '../services/mealdbService.js';

// CREATE - Tambah bahan ke inventory
export const addIngredient = async (req, res, next) => {
  try {
    const { name } = req.body;

    const existing = await prisma.ingredient.findUnique({
      where: { userId_name: { userId: req.userId, name: name.toLowerCase() } },
    });

    if (existing) {
      return res.status(400).json({ success: false, message: 'Bahan sudah ada di inventory' });
    }

    const ingredient = await prisma.ingredient.create({
      data: {
        userId: req.userId,
        name: name.toLowerCase(),
      },
    });

    res.status(201).json({
      success: true,
      message: 'Bahan berhasil ditambahkan',
      data: ingredient,
    });
  } catch (error) {
    next(error);
  }
};

// READ - Get semua bahan user
export const getIngredients = async (req, res, next) => {
  try {
    const ingredients = await prisma.ingredient.findMany({
      where: { userId: req.userId },
      orderBy: { name: 'asc' },
    });

    res.json({ success: true, data: ingredients });
  } catch (error) {
    next(error);
  }
};

// DELETE - Hapus bahan dari inventory
export const deleteIngredient = async (req, res, next) => {
  try {
    const { id } = req.params;

    const ingredient = await prisma.ingredient.findFirst({
      where: { id: parseInt(id), userId: req.userId },
    });

    if (!ingredient) {
      return res.status(404).json({ success: false, message: 'Bahan tidak ditemukan' });
    }

    await prisma.ingredient.delete({ where: { id: parseInt(id) } });

    res.json({ success: true, message: 'Bahan berhasil dihapus' });
  } catch (error) {
    next(error);
  }
};

// SMART SUGGEST - Suggest resep berdasarkan bahan yang dimiliki
export const suggestRecipes = async (req, res, next) => {
  try {
    // Ambil semua bahan user
    const ingredients = await prisma.ingredient.findMany({
      where: { userId: req.userId },
    });

    if (ingredients.length === 0) {
      return res.json({
        success: true,
        message: 'Tambahkan bahan terlebih dahulu untuk mendapatkan rekomendasi',
        data: [],
      });
    }

    // Cari resep untuk setiap bahan
    const allMeals = [];
    for (const ingredient of ingredients) {
      const meals = await mealdbService.getMealsByIngredient(ingredient.name);
      allMeals.push(...meals);
    }

    // Hitung frekuensi kemunculan resep (resep yang muncul di banyak bahan = lebih relevan)
    const mealCount = {};
    allMeals.forEach((meal) => {
      if (mealCount[meal.idMeal]) {
        mealCount[meal.idMeal].count++;
      } else {
        mealCount[meal.idMeal] = { ...meal, count: 1 };
      }
    });

    // Sort by count descending dan ambil top 10
    const suggested = Object.values(mealCount)
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    res.json({
      success: true,
      data: suggested,
    });
  } catch (error) {
    next(error);
  }
};
