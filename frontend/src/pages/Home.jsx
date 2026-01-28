import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { recipeService } from '../services/recipeService';
import RecipeCard from '../components/ui/RecipeCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: recipeService.getCategories,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?q=${searchQuery}`);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Temukan Resep Favoritmu 🍳
        </h1>
        <p className="text-gray-600 mb-8">
          Jelajahi ribuan resep dari seluruh dunia dan simpan ke koleksi pribadimu
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-xl mx-auto">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Cari resep... (contoh: chicken, pasta)"
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
      </section>

      {/* Categories Section */}
      <section className="py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Kategori</h2>
        
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {categories?.data?.slice(0, 14).map((category) => (
              <Link
                key={category.idCategory}
                to={`/explore?category=${category.strCategory}`}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow text-center"
              >
                <img
                  src={category.strCategoryThumb}
                  alt={category.strCategory}
                  className="w-full h-24 object-cover"
                />
                <p className="py-2 font-medium text-gray-700">
                  {category.strCategory}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
