'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import Image from 'next/image'; // 1. Tambahkan import Image
import { useRouter } from 'next/navigation';
import { recipeService } from '@/lib/services';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { HiSearch, HiArrowRight, HiSparkles } from 'react-icons/hi';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: recipeService.getCategories,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) router.push(`/explore?q=${searchQuery}`);
  };

  const quickTags = ['Chicken', 'Beef', 'Seafood', 'Dessert', 'Vegetarian'];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 text-center">
        <div className="animate-float mb-8">
          <div className="inline-block p-6 rounded-full bg-gradient-to-br from-orange-500/20 to-amber-500/20 border border-orange-500/30">
            <span className="text-7xl md:text-8xl block">🍳</span>
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
          Temukan Resep
          <span className="block bg-gradient-to-r from-orange-400 via-amber-400 to-orange-400 bg-clip-text text-transparent">
            Favoritmu
          </span>
        </h1>

        <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
          Jelajahi ribuan resep dari seluruh dunia. Simpan, masak, dan bagikan momen kulinermu.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
          <div className="relative flex gap-3">
            <div className="relative flex-1">
              <HiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari resep favorit... (chicken, pasta, cake)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-dark pl-14 pr-6"
              />
            </div>
            <button type="submit" className="btn-primary px-8">
              <HiSearch className="w-5 h-5 md:hidden" />
              <span className="hidden md:inline">Cari Resep</span>
            </button>
          </div>
        </form>

        {/* Quick Tags */}
        <div className="flex flex-wrap justify-center gap-3">
          {quickTags.map((tag) => (
            <button
              key={tag}
              onClick={() => router.push(`/explore?category=${tag}`)}
              className="px-5 py-2.5 rounded-full text-sm font-medium glass text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-orange-500/20">
              <HiSparkles className="w-6 h-6 text-orange-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Kategori Populer</h2>
          </div>
          <Link href="/explore" className="btn-ghost flex items-center gap-2 text-sm">
            Lihat Semua <HiArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {categories?.data?.slice(0, 14).map((category) => (
              <Link
                key={category.idCategory}
                href={`/explore?category=${category.strCategory}`}
                className="card p-4 text-center group cursor-pointer hover:-translate-y-2 transition-all duration-300"
              >
                <div className="relative mb-4 overflow-hidden rounded-2xl h-20 md:h-24">
                  {/* 2. Gunakan Next.js Image Component */}
                  <Image
                    src={category.strCategoryThumb}
                    alt={category.strCategory}
                    fill
                    sizes="(max-width: 768px) 50vw, 15vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                </div>
                <p className="font-semibold text-gray-300 text-sm group-hover:text-orange-400 transition-colors">
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