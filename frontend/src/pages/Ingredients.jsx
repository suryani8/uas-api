import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { ingredientService } from '../services/ingredientService';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import toast from 'react-hot-toast';

export default function Ingredients() {
  const [newIngredient, setNewIngredient] = useState('');
  const queryClient = useQueryClient();

  const { data: ingredients, isLoading } = useQuery({
    queryKey: ['ingredients'],
    queryFn: ingredientService.getAll,
  });

  const { data: suggestions, isLoading: loadingSuggestions } = useQuery({
    queryKey: ['suggestions'],
    queryFn: ingredientService.getSuggestions,
  });

  const addMutation = useMutation({
    mutationFn: ingredientService.add,
    onSuccess: () => {
      queryClient.invalidateQueries(['ingredients']);
      queryClient.invalidateQueries(['suggestions']);
      setNewIngredient('');
      toast.success('Bahan berhasil ditambahkan');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Gagal menambah bahan');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: ingredientService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries(['ingredients']);
      queryClient.invalidateQueries(['suggestions']);
      toast.success('Bahan dihapus');
    },
  });

  const handleAdd = (e) => {
    e.preventDefault();
    if (newIngredient.trim()) {
      addMutation.mutate(newIngredient.trim());
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* My Ingredients */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Bahan di Dapur Saya</h1>

        {/* Add Form */}
        <form onSubmit={handleAdd} className="flex gap-2 mb-6">
          <input
            type="text"
            value={newIngredient}
            onChange={(e) => setNewIngredient(e.target.value)}
            placeholder="Tambah bahan (contoh: chicken, garlic)"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            type="submit"
            disabled={addMutation.isPending}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 disabled:opacity-50"
          >
            Tambah
          </button>
        </form>

        {/* Ingredients List */}
        {isLoading ? (
          <LoadingSpinner />
        ) : ingredients?.data?.length === 0 ? (
          <p className="text-gray-500">Belum ada bahan. Tambahkan bahan yang kamu punya!</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {ingredients?.data?.map((item) => (
              <span
                key={item.id}
                className="bg-green-100 text-green-700 px-4 py-2 rounded-full flex items-center gap-2"
              >
                {item.name}
                <button
                  onClick={() => deleteMutation.mutate(item.id)}
                  className="text-red-500 hover:text-red-700 font-bold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Suggested Recipes */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Rekomendasi Resep</h2>
        <p className="text-gray-600 mb-4">
          Berdasarkan bahan yang kamu punya, kamu bisa membuat:
        </p>

        {loadingSuggestions ? (
          <LoadingSpinner />
        ) : suggestions?.data?.length === 0 ? (
          <p className="text-gray-500">
            Tambahkan bahan untuk mendapatkan rekomendasi resep.
          </p>
        ) : (
          <div className="space-y-3">
            {suggestions?.data?.map((meal) => (
              <Link
                key={meal.idMeal}
                to={`/recipe/${meal.idMeal}`}
                className="flex items-center gap-4 bg-white p-3 rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-semibold">{meal.strMeal}</h3>
                  <p className="text-sm text-gray-500">
                    Cocok dengan {meal.count} bahan kamu
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
