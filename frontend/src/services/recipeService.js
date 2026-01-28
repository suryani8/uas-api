import api from './api';

export const recipeService = {
  // TheMealDB API
  search: async (query) => {
    const response = await api.get(`/recipes/search?q=${query}`);
    return response.data;
  },

  getCategories: async () => {
    const response = await api.get('/recipes/categories');
    return response.data;
  },

  getDetail: async (id) => {
    const response = await api.get(`/recipes/detail/${id}`);
    return response.data;
  },

  getByCategory: async (category) => {
    const response = await api.get(`/recipes/category/${category}`);
    return response.data;
  },

  getByArea: async (area) => {
    const response = await api.get(`/recipes/area/${area}`);
    return response.data;
  },

  getRandom: async () => {
    const response = await api.get('/recipes/random');
    return response.data;
  },

  // Saved Recipes CRUD
  saveRecipe: async (data) => {
    const response = await api.post('/recipes/saved', data);
    return response.data;
  },

  getSavedRecipes: async (params) => {
    const response = await api.get('/recipes/saved', { params });
    return response.data;
  },

  getSavedRecipeDetail: async (id) => {
    const response = await api.get(`/recipes/saved/${id}`);
    return response.data;
  },

  updateSavedRecipe: async (id, data) => {
    const response = await api.put(`/recipes/saved/${id}`, data);
    return response.data;
  },

  deleteSavedRecipe: async (id) => {
    const response = await api.delete(`/recipes/saved/${id}`);
    return response.data;
  },
};
