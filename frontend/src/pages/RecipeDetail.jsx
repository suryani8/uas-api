import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { recipeService } from '../services/recipeService';
import { useAuthStore } from '../store/authStore';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import toast from 'react-hot-toast';

export default function RecipeDetail() {
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
      toast.success('Resep berhasil disimpan!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Gagal menyimpan resep');
    }
  };

  // Extract ingredients
  const getIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push({ ingredient, measure });
      }
    }
    return ingredients;
  };

  if (isLoading) return <LoadingSpinner />;
  if (!meal) return <p className="text-center py-12">Resep tidak ditemukan</p>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-80 object-cover"
        />

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold text-gray-800">{meal.strMeal}</h1>
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
            >
              Simpan ke Koleksi
            </button>
          </div>

          <div className="flex gap-3 mb-6">
            <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
              {meal.strCategory}
            </span>
            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
              {meal.strArea}
            </span>
          </div>

          {/* Ingredients */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Bahan-bahan</h2>
            <ul className="grid grid-cols-2 gap-2">
              {getIngredients().map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  {item.measure} {item.ingredient}
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Cara Membuat</h2>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">
              {meal.strInstructions}
            </p>
          </div>

          {/* YouTube Video */}
          {meal.strYoutube && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-3">Video Tutorial</h2>
              <a
                href={meal.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-500 hover:underline"
              >
                Tonton di YouTube →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
