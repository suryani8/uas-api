'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import Image from 'next/image'; // 1. Impor komponen Image
import { ingredientService } from '@/lib/services';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import toast from 'react-hot-toast';
import { HiPlus, HiX, HiLightBulb, HiArrowRight } from 'react-icons/hi';

export default function IngredientsPage() {
  const [newIngredient, setNewIngredient] = useState('');
  const queryClient = useQueryClient();

  const { data: ingredients, isLoading } = useQuery({ 
    queryKey: ['ingredients'], 
    queryFn: ingredientService.getAll 
  });
  
  const { data: suggestions, isLoading: loadingSuggestions } = useQuery({ 
    queryKey: ['suggestions'], 
    queryFn: ingredientService.getSuggestions 
  });

  const addMutation = useMutation({
    mutationFn: ingredientService.add,
    onSuccess: () => { 
      queryClient.invalidateQueries(['ingredients', 'suggestions']); 
      setNewIngredient(''); 
      toast.success('Bahan ditambahkan'); 
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Gagal'),
  });

  const deleteMutation = useMutation({
    mutationFn: ingredientService.delete,
    onSuccess: () => { 
      queryClient.invalidateQueries(['ingredients', 'suggestions']); 
      toast.success('Bahan dihapus'); 
    },
  });

  const handleAdd = (e) => { 
    e.preventDefault(); 
    if (newIngredient.trim()) addMutation.mutate(newIngredient.trim()); 
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Bahan di Dapur</h1>
        <p className="text-gray-400 mb-6">Tambahkan bahan untuk rekomendasi resep</p>

        <form onSubmit={handleAdd} className="flex gap-3 mb-6">
          <input 
            type="text" 
            value={newIngredient} 
            onChange={(e) => setNewIngredient(e.target.value)} 
            placeholder="chicken, garlic, onion..." 
            className="input-dark flex-1" 
          />
          <button type="submit" disabled={addMutation.isPending} className="btn-primary">
            <HiPlus className="w-5 h-5" />
          </button>
        </form>

        {isLoading ? (
          <LoadingSpinner size="small" />
        ) : ingredients?.data?.length === 0 ? (
          <div className="card text-center py-12">
            <div className="text-5xl mb-4">🥦</div> {/* Perbaikan emoji */}
            <p className="text-gray-400">Belum ada bahan</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {ingredients?.data?.map((item) => (
              <span key={item.id} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 font-medium">
                {item.name}
                <button 
                  onClick={() => deleteMutation.mutate(item.id)} 
                  className="hover:bg-green-500/30 rounded-full p-0.5 transition-colors"
                >
                  <HiX className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-yellow-500/20">
            <HiLightBulb className="w-6 h-6 text-yellow-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">Rekomendasi</h2>
        </div>

        {loadingSuggestions ? (
          <LoadingSpinner size="small" />
        ) : suggestions?.data?.length === 0 ? (
          <div className="card text-center py-12">
            <div className="text-5xl mb-4">💡</div> {/* Perbaikan emoji */}
            <p className="text-gray-400">Tambah bahan untuk rekomendasi</p>
          </div>
        ) : (
          <div className="space-y-3">
            {suggestions?.data?.map((meal) => (
              <Link key={meal.idMeal} href={`/recipe/${meal.idMeal}`} className="flex items-center gap-4 card p-4 group">
                {/* 2. Menggunakan Next.js Image Component */}
                <div className="relative w-16 h-16 flex-shrink-0">
                  <Image 
                    src={meal.strMealThumb} 
                    alt={meal.strMeal} 
                    fill
                    sizes="64px"
                    className="object-cover rounded-xl"
                  />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-semibold text-white group-hover:text-orange-400 transition-colors">
                    {meal.strMeal}
                  </h3>
                  <p className="text-sm text-orange-400">{meal.count} bahan cocok</p>
                </div>
                <HiArrowRight className="w-5 h-5 text-gray-500 group-hover:text-orange-400 transition-colors" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}