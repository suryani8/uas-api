import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { recipeService } from '../services/recipeService';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import toast from 'react-hot-toast';

export default function MyRecipes() {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ personalNotes: '', rating: 0 });

  const { data, isLoading } = useQuery({
    queryKey: ['savedRecipes'],
    queryFn: () => recipeService.getSavedRecipes(),
  });

  const deleteMutation = useMutation({
    mutationFn: recipeService.deleteSavedRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries(['savedRecipes']);
      toast.success('Resep dihapus dari koleksi');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => recipeService.updateSavedRecipe(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['savedRecipes']);
      setEditingId(null);
      toast.success('Catatan berhasil diupdate');
    },
  });

  const handleEdit = (recipe) => {
    setEditingId(recipe.id);
    setEditForm({
      personalNotes: recipe.personalNotes || '',
      rating: recipe.rating || 0,
    });
  };

  const handleUpdate = (id) => {
    updateMutation.mutate({ id, data: editForm });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Koleksi Resep Saya</h1>

      {data?.data?.length === 0 ? (
        <p className="text-center text-gray-500 py-12">
          Belum ada resep tersimpan. Jelajahi dan simpan resep favoritmu!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.data?.map((recipe) => (
            <div key={recipe.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <img
                src={recipe.thumbnail}
                alt={recipe.mealName}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{recipe.mealName}</h3>
                <div className="flex gap-2 mb-3">
                  <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded">
                    {recipe.category}
                  </span>
                  <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">
                    {recipe.area}
                  </span>
                </div>

                {/* Rating */}
                {recipe.rating && (
                  <p className="text-yellow-500 mb-2">
                    {'⭐'.repeat(recipe.rating)}
                  </p>
                )}

                {/* Personal Notes */}
                {editingId === recipe.id ? (
                  <div className="space-y-2 mb-3">
                    <textarea
                      value={editForm.personalNotes}
                      onChange={(e) => setEditForm({ ...editForm, personalNotes: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                      rows={3}
                      placeholder="Catatan pribadi..."
                    />
                    <select
                      value={editForm.rating}
                      onChange={(e) => setEditForm({ ...editForm, rating: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                    >
                      <option value={0}>Pilih Rating</option>
                      {[1, 2, 3, 4, 5].map((r) => (
                        <option key={r} value={r}>{r} Bintang</option>
                      ))}
                    </select>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdate(recipe.id)}
                        className="flex-1 bg-green-500 text-white py-2 rounded-lg text-sm"
                      >
                        Simpan
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="flex-1 bg-gray-300 py-2 rounded-lg text-sm"
                      >
                        Batal
                      </button>
                    </div>
                  </div>
                ) : (
                  recipe.personalNotes && (
                    <p className="text-gray-600 text-sm mb-3 italic">
                      "{recipe.personalNotes}"
                    </p>
                  )
                )}

                {/* Actions */}
                {editingId !== recipe.id && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(recipe)}
                      className="flex-1 bg-blue-500 text-white py-2 rounded-lg text-sm hover:bg-blue-600"
                    >
                      Edit Catatan
                    </button>
                    <button
                      onClick={() => deleteMutation.mutate(recipe.id)}
                      className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm hover:bg-red-600"
                    >
                      Hapus
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
