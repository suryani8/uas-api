import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { recipeService } from '../services/recipeService';
import { useAuthStore } from '../store/authStore';
import RecipeCard from '../components/ui/RecipeCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import toast from 'react-hot-toast';

export default function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const { isAuthenticated } = useAuthStore();

  const queryParam = searchParams.get('q');
  const categoryParam = searchParams.get('category');

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['explore', queryParam, categoryParam],
    queryFn: async () => {
      if (categoryParam) {
        return recipeService.getByCategory(categoryParam);
      }
      if (queryParam) {
        return recipeService.search(queryParam);
      }
      return recipeService.search('');
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ q: searchQuery });
  };

  const handleSave = async (meal) => {
    if (!isAuthenticated) {
      toast.error('Silakan login terlebih dahulu');
      return;
    }

    try {
      await recipeService.saveRecipe({
        mealId: meal.idMeal,
        mealName: meal.strMeal,
        category: meal.strCategory || categoryParam || 'Unknown',
        area: meal.strArea || 'Unknown',
        thumbnail: meal.strMealThumb,
      });
      toast.success('Resep berhasil disimpan!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Gagal menyimpan resep');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {categoryParam ? `Kategori: ${categoryParam}` : 'Jelajahi Resep'}
      </h1>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Cari resep..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            type="submit"
            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600"
          >
            Cari
          </button>
        </div>
      </form>

      {/* Results */}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data?.data?.map((meal) => (
            <RecipeCard
              key={meal.idMeal}
              meal={meal}
              showSaveButton={isAuthenticated}
              onSave={handleSave}
            />
          ))}
        </div>
      )}

      {!isLoading && (!data?.data || data.data.length === 0) && (
        <p className="text-center text-gray-500 py-12">
          Tidak ada resep ditemukan. Coba kata kunci lain.
        </p>
      )}
    </div>
  );
}
