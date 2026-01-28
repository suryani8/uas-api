import api from './api';

export const ingredientService = {
  add: async (name) => {
    const response = await api.post('/ingredients', { name });
    return response.data;
  },

  getAll: async () => {
    const response = await api.get('/ingredients');
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/ingredients/${id}`);
    return response.data;
  },

  getSuggestions: async () => {
    const response = await api.get('/ingredients/suggest');
    return response.data;
  },
};
