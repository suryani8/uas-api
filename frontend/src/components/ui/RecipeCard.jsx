import { Link } from 'react-router-dom';

export default function RecipeCard({ meal, showSaveButton = false, onSave }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={meal.strMealThumb || meal.thumbnail}
        alt={meal.strMeal || meal.mealName}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">
          {meal.strMeal || meal.mealName}
        </h3>
        <div className="flex gap-2 mb-3">
          {(meal.strCategory || meal.category) && (
            <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded">
              {meal.strCategory || meal.category}
            </span>
          )}
          {(meal.strArea || meal.area) && (
            <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">
              {meal.strArea || meal.area}
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <Link
            to={`/recipe/${meal.idMeal || meal.mealId}`}
            className="flex-1 bg-orange-500 text-white text-center py-2 rounded-lg hover:bg-orange-600"
          >
            Lihat Detail
          </Link>
          {showSaveButton && onSave && (
            <button
              onClick={() => onSave(meal)}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Simpan
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
