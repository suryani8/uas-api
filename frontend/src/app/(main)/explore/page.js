'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { recipeService } from '@/lib/services';
import { useAuthStore } from '@/store/authStore';
import RecipeCard from '@/components/ui/RecipeCard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import toast from 'react-hot-toast';
import { HiSearch } from 'react-icons/hi';

export default function ExplorePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const { isAuthenticated } = useAuthStore();

  const queryParam = searchParams.get('q');
  const categoryParam = searchParams.get('category');

  const { data, isLoading } = useQuery({
    queryKey: ['explore', queryParam, categoryParam],
    queryFn: async () => {
      if (categoryParam) return recipeService.getByCategory(categoryParam);
      if (queryParam) return recipeService.search(queryParam);
      return recipeService.search('');
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/explore?q=${searchQuery}`);
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
      toast.success('Resep disimpan!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Gagal menyimpan');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            {categoryParam ? (<>Kategori: <span className="text-orange-400">{categoryParam}</span></>) 
              : queryParam ? (<>Hasil: <span className="text-orange-400">{queryParam}</span></>) 
              : 'Jelajahi Resep'}
          </h1>
          {data?.data && <p className="text-gray-400 mt-2">{data.data.length} resep ditemukan</p>}
        </div>

        <form onSubmit={handleSearch} className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input type="text" placeholder="Cari resep..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="input-dark pl-12" />
          </div>
          <button type="submit" className="btn-primary">Cari</button>
        </form>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : data?.data?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.data.map((meal) => (
            <RecipeCard key={meal.idMeal} meal={meal} showSaveButton={isAuthenticated} onSave={handleSave} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-7xl mb-6">ðŸ”</div>
          <h3 className="text-2xl font-bold text-white mb-2">Tidak ada hasil</h3>
          <p className="text-gray-400">Coba kata kunci lain</p>
        </div>
      )}
    </div>
  );
}
