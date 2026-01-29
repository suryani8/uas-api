import api from './api';

export const authService = {
  register: (data) => api.post('/auth/register', data).then(res => res.data),
  login: (data) => api.post('/auth/login', data).then(res => res.data),
  logout: () => api.post('/auth/logout').then(res => res.data),
  getMe: () => api.get('/auth/me').then(res => res.data),
};

export const recipeService = {
  search: (query) => api.get(`/recipes/search?q=${query}`).then(res => res.data),
  getCategories: () => api.get('/recipes/categories').then(res => res.data),
  getDetail: (id) => api.get(`/recipes/detail/${id}`).then(res => res.data),
  getByCategory: (category) => api.get(`/recipes/category/${category}`).then(res => res.data),
  getRandom: () => api.get('/recipes/random').then(res => res.data),
  
  saveRecipe: (data) => api.post('/recipes/saved', data).then(res => res.data),
  getMyRecipes: () => api.get('/recipes/saved').then(res => res.data),
  getSavedRecipes: (params) => api.get('/recipes/saved', { params }).then(res => res.data),
  updateSavedRecipe: (id, data) => api.put(`/recipes/saved/${id}`, data).then(res => res.data),
  deleteSavedRecipe: (id) => api.delete(`/recipes/saved/${id}`).then(res => res.data),
};


export const ingredientService = {
  add: (name) => api.post('/ingredients', { name }).then(res => res.data),
  getAll: () => api.get('/ingredients').then(res => res.data),
  delete: (id) => api.delete(`/ingredients/${id}`).then(res => res.data),
  getSuggestions: () => api.get('/ingredients/suggest').then(res => res.data),
};
