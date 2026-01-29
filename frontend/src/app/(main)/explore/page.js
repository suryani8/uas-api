'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { recipeService } from '@/lib/services';
import { useAuthStore } from '@/store/authStore';
import RecipeCard from '@/components/ui/RecipeCard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import toast from 'react-hot-toast';
import { HiSearch, HiOutlineSearchCircle } from 'react-icons/hi';

export default function ExplorePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const { isAuthenticated } = useAuthStore();

  const queryParam = searchParams.get('q');
  const categoryParam = searchParams.get('category');

  const shouldFetch = !!(queryParam || categoryParam);

  // Fetch hasil pencarian
  const { data, isLoading } = useQuery({
    queryKey: ['explore', queryParam, categoryParam],
    queryFn: async () => {
      if (categoryParam) return recipeService.getByCategory(categoryParam);
      if (queryParam) return recipeService.search(queryParam);
      return { data: [] };
    },
    enabled: shouldFetch,
  });

  // Fetch resep yang sudah disimpan user
  const { data: savedRecipes, refetch: refetchSaved } = useQuery({
    queryKey: ['my-recipes'],
    queryFn: () => recipeService.getSavedRecipes(),
    enabled: isAuthenticated,
  });

  // Buat Map dari mealId ke saved recipe (untuk get id database saat delete)
  const savedRecipesMap = new Map(
    savedRecipes?.data?.map((r) => [String(r.mealId), r]) || []
  );

  // Buat Set dari mealId yang sudah disimpan
  const savedMealIds = new Set(savedRecipesMap.keys());

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/explore?q=${searchQuery}`);
    }
  };

  // Toggle save/unsave
  const handleToggleSave = async (meal) => {
    if (!isAuthenticated) {
      toast.error('Silakan login terlebih dahulu');
      return;
    }

    const mealId = String(meal.idMeal || meal.mealId);
    const isSaved = savedMealIds.has(mealId);

    try {
      if (isSaved) {
        // Hapus dari koleksi
        const savedRecipe = savedRecipesMap.get(mealId);
        if (savedRecipe) {
          await recipeService.deleteSavedRecipe(savedRecipe.id);
          toast.success('Resep dihapus dari koleksi');
        }
      } else {
        // Simpan ke koleksi
        await recipeService.saveRecipe({
          mealId: mealId,
          mealName: meal.strMeal || meal.mealName,
          category: meal.strCategory || categoryParam || 'Unknown',
          area: meal.strArea || 'Unknown',
          thumbnail: meal.strMealThumb || meal.thumbnail,
        });
        toast.success('Resep disimpan ke koleksi');
      }
      refetchSaved(); // Refresh data
    } catch (error) {
      console.error('Toggle save error:', error);
      toast.error(error.response?.data?.message || 'Terjadi kesalahan');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            {categoryParam ? (
              <>Kategori: <span className="text-orange-400">{categoryParam}</span></>
            ) : queryParam ? (
              <>Hasil: <span className="text-orange-400">{queryParam}</span></>
            ) : (
              'Jelajahi Resep'
            )}
          </h1>
          {shouldFetch && data?.data && (
            <p className="text-gray-400 mt-2">{data.data.length} resep ditemukan</p>
          )}
        </div>

        <form onSubmit={handleSearch} className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari resep..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-dark pl-12"
            />
          </div>
          <button type="submit" className="btn-primary">Cari</button>
        </form>
      </div>

      {!shouldFetch ? (
        <div className="text-center py-20">
          <HiOutlineSearchCircle className="w-24 h-24 mx-auto text-gray-600 mb-6" />
          <h3 className="text-2xl font-bold text-white mb-2">Cari Resep Favoritmu</h3>
          <p className="text-gray-400">Ketik nama resep atau bahan untuk mulai mencari</p>
        </div>
      ) : isLoading ? (
        <LoadingSpinner />
      ) : data?.data?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.data.map((meal) => {
            const mealId = String(meal.idMeal || meal.mealId);
            return (
              <RecipeCard
                key={mealId}
                meal={meal}
                showSaveButton={isAuthenticated}
                isSaved={savedMealIds.has(mealId)}
                onSave={handleToggleSave}
              />
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20">
          <HiOutlineSearchCircle className="w-24 h-24 mx-auto text-gray-600 mb-6" />
          <h3 className="text-2xl font-bold text-white mb-2">Tidak ada hasil</h3>
          <p className="text-gray-400">Coba kata kunci lain</p>
        </div>
      )}
    </div>
  );
}
