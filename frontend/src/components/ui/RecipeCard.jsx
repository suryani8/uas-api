'use client';

import Link from 'next/link';
import Image from 'next/image'; // 1. Impor komponen Image
import { HiOutlineHeart, HiHeart, HiArrowRight } from 'react-icons/hi';

export default function RecipeCard({ meal, showSaveButton = false, onSave, isSaved = false }) {
  const name = meal.strMeal || meal.mealName;
  const image = meal.strMealThumb || meal.thumbnail;
  const category = meal.strCategory || meal.category;
  const area = meal.strArea || meal.area;
  const id = meal.idMeal || meal.mealId;

  return (
    <div className="card group hover:-translate-y-2 transition-all duration-300">
      <div className="relative -mx-6 -mt-6 mb-5 overflow-hidden rounded-t-3xl h-52">
        {/* 2. Gunakan Next.js Image Component */}
        <Image 
          src={image} 
          alt={name} 
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
        
        {showSaveButton && onSave && (
          <button
            onClick={(e) => { 
              e.preventDefault(); 
              e.stopPropagation(); 
              onSave(meal); 
            }}
            className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:scale-110 z-10"
          >
            {isSaved ? <HiHeart className="w-5 h-5 text-red-500" /> : <HiOutlineHeart className="w-5 h-5 text-white" />}
          </button>
        )}

        <div className="absolute bottom-4 left-4 flex gap-2">
          {category && <span className="badge badge-orange">{category}</span>}
          {area && <span className="badge badge-blue">{area}</span>}
        </div>
      </div>

      <h3 className="font-bold text-lg text-white mb-4 line-clamp-1 group-hover:text-orange-400 transition-colors">
        {name}
      </h3>

      <Link
        href={`/recipe/${id}`}
        className="flex items-center justify-between w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-300 group/btn"
      >
        <span className="font-medium">Lihat Resep</span>
        <HiArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
      </Link>
    </div>
  );
}