'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image'; // 1. Tambahkan import Image
import { useQuery } from '@tanstack/react-query';
import { recipeService } from '@/lib/services';
import { useAuthStore } from '@/store/authStore';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import toast from 'react-hot-toast';
import { HiHeart, HiPlay, HiArrowLeft } from 'react-icons/hi';

export default function RecipeDetailPage() {
  const { id } = useParams();
  const { isAuthenticated } = useAuthStore();

  const { data, isLoading } = useQuery({
    queryKey: ['recipe', id],
    queryFn: () => recipeService.getDetail(id),
  });

  const meal = data?.data;

  const handleSave = async () => {
    if (!isAuthenticated) {
      toast.error('Silakan login terlebih dahulu');
      return;
    }
    try {
      await recipeService.saveRecipe({
        mealId: meal.idMeal,
        mealName: meal.strMeal,
        category: meal.strCategory,
        area: meal.strArea,
        thumbnail: meal.strMealThumb,
      });
      toast.success('Resep disimpan!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Gagal menyimpan');
    }
  };

  const getIngredients = () => {
    const ingredients = [];
    if (!meal) return ingredients;
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient?.trim()) {
        ingredients.push({ ingredient, measure });
      }
    }
    return ingredients;
  };

  if (isLoading) return <LoadingSpinner />;
  
  if (!meal) {
    return (
      <div className="text-center py-20">
        <div className="text-7xl mb-6">😕</div>
        <h3 className="text-2xl font-bold text-white">Resep tidak ditemukan</h3>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link href="/explore" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors">
        <HiArrowLeft className="w-5 h-5" /> Kembali
      </Link>

      <div className="card overflow-hidden">
        {/* Hero Image */}
        <div className="relative -mx-6 -mt-6 mb-8 h-72 md:h-96">
          {/* 2. Gunakan Next.js Image untuk Hero */}
          <Image 
            src={meal.strMealThumb} 
            alt={meal.strMeal} 
            fill
            priority // Tambahkan priority karena ini LCP (gambar utama)
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="badge badge-orange">{meal.strCategory}</span>
              <span className="badge badge-blue">{meal.strArea}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">{meal.strMeal}</h1>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button onClick={handleSave} className="btn-primary flex items-center gap-2">
            <HiHeart className="w-5 h-5" /> Simpan Resep
          </button>
          {meal.strYoutube && (
            <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer" className="btn-secondary flex items-center gap-2">
              <HiPlay className="w-5 h-5" /> Video Tutorial
            </a>
          )}
        </div>

        {/* Ingredients */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">🥗 Bahan-bahan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {getIngredients().map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                {/* 3. Gunakan Image untuk Ikon Bahan */}
                <div className="relative w-12 h-12 flex-shrink-0">
                  <Image
                    src={`https://www.themealdb.com/images/ingredients/${item.ingredient}-Small.png`}
                    alt={item.ingredient}
                    fill
                    sizes="48px"
                    className="object-contain"
                  />
                </div>
                <div>
                  <p className="font-medium text-white">{item.ingredient}</p>
                  <p className="text-sm text-gray-400">{item.measure}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">👨‍🍳 Cara Membuat</h2>
          <div className="space-y-4">
            {meal.strInstructions.split('\n').map((p, i) => (
              p.trim() && <p key={i} className="text-gray-300 leading-relaxed">{p}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}