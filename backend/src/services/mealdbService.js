import axios from 'axios';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const searchMeals = async (query) => {
  const response = await axios.get(`${BASE_URL}/search.php?s=${encodeURIComponent(query)}`);
  return response.data.meals || [];
};

export const getMealById = async (id) => {
  const response = await axios.get(`${BASE_URL}/lookup.php?i=${id}`);
  return response.data.meals?.[0] || null;
};

export const getCategories = async () => {
  const response = await axios.get(`${BASE_URL}/categories.php`);
  return response.data.categories || [];
};

export const getMealsByCategory = async (category) => {
  const response = await axios.get(`${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`);
  return response.data.meals || [];
};

export const getMealsByArea = async (area) => {
  const response = await axios.get(`${BASE_URL}/filter.php?a=${encodeURIComponent(area)}`);
  return response.data.meals || [];
};

export const getMealsByIngredient = async (ingredient) => {
  const response = await axios.get(`${BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`);
  return response.data.meals || [];
};

export const getRandomMeal = async () => {
  const response = await axios.get(`${BASE_URL}/random.php`);
  return response.data.meals?.[0] || null;
};
