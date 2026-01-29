'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import Image from 'next/image'; // 1. Tambahkan import Image
import { recipeService } from '@/lib/services';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import toast from 'react-hot-toast';
import { HiPencil, HiTrash, HiStar, HiCheck, HiX } from 'react-icons/hi';

export default function MyRecipesPage() {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ personalNotes: '', rating: 0 });

  const { data, isLoading } = useQuery({ 
    queryKey: ['savedRecipes'], 
    queryFn: recipeService.getSavedRecipes 
  });

  const deleteMutation = useMutation({
    mutationFn: recipeService.deleteSavedRecipe,
    onSuccess: () => { 
      queryClient.invalidateQueries(['savedRecipes']); 
      toast.success('Resep dihapus'); 
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => recipeService.updateSavedRecipe(id, data),
    onSuccess: () => { 
      queryClient.invalidateQueries(['savedRecipes']); 
      setEditingId(null); 
      toast.success('Berhasil diupdate'); 
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-white">Koleksi Saya</h1>
        <p className="text-gray-400 mt-2">{data?.data?.length || 0} resep tersimpan</p>
      </div>

      {data?.data?.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-7xl mb-6">📚</div> {/* 2. Perbaikan emoji */}
          <h3 className="text-2xl font-bold text-white mb-2">Belum ada koleksi</h3>
          <p className="text-gray-400 mb-6">Mulai simpan resep favoritmu</p>
          <Link href="/explore" className="btn-primary">Jelajahi Resep</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.data?.map((recipe) => (
            <div key={recipe.id} className="card">
              <Link href={`/recipe/${recipe.mealId}`} className="relative block -mx-6 -mt-6 mb-5 h-48 overflow-hidden rounded-t-3xl">
                {/* 3. Gunakan Next.js Image */}
                <Image 
                  src={recipe.thumbnail} 
                  alt={recipe.mealName} 
                  fill
                  className="object-cover hover:opacity-90 transition-opacity"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </Link>
              <h3 className="font-bold text-lg text-white mb-3">{recipe.mealName}</h3>
              <div className="flex gap-2 mb-4">
                <span className="badge badge-orange">{recipe.category}</span>
                <span className="badge badge-blue">{recipe.area}</span>
              </div>
              
              {recipe.rating > 0 && (
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <HiStar key={i} className={`w-5 h-5 ${i < recipe.rating ? 'text-yellow-400' : 'text-gray-600'}`} />
                  ))}
                </div>
              )}

              {editingId === recipe.id ? (
                <div className="space-y-3">
                  <textarea 
                    value={editForm.personalNotes} 
                    onChange={(e) => setEditForm({ ...editForm, personalNotes: e.target.value })} 
                    className="input-dark text-sm" 
                    rows={3} 
                    placeholder="Catatan..." 
                  />
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map((s) => (
                      <button key={s} onClick={() => setEditForm({ ...editForm, rating: s })}>
                        <HiStar className={`w-6 h-6 ${s <= editForm.rating ? 'text-yellow-400' : 'text-gray-600'}`} />
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => updateMutation.mutate({ id: recipe.id, data: editForm })} className="flex-1 btn-primary text-sm py-2">
                      <HiCheck className="inline w-4 h-4 mr-1" />Simpan
                    </button>
                    <button onClick={() => setEditingId(null)} className="flex-1 btn-secondary text-sm py-2">
                      <HiX className="inline w-4 h-4 mr-1" />Batal
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {recipe.personalNotes && (
                    <p className="text-gray-400 text-sm mb-4 p-3 rounded-xl bg-white/5 italic">
                      {/* 4. Perbaikan unescaped entities dengan kurung kurawal */}
                      {"\""}{recipe.personalNotes}{"\""}
                    </p>
                  )}
                  <div className="flex gap-2">
                    <button 
                      onClick={() => { 
                        setEditingId(recipe.id); 
                        setEditForm({ personalNotes: recipe.personalNotes || '', rating: recipe.rating || 0 }); 
                      }} 
                      className="flex-1 btn-secondary text-sm py-2"
                    >
                      <HiPencil className="inline w-4 h-4 mr-1" />Edit
                    </button>
                    <button 
                      onClick={() => deleteMutation.mutate(recipe.id)} 
                      className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl text-sm py-2 transition-colors"
                    >
                      <HiTrash className="inline w-4 h-4 mr-1" />Hapus
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}