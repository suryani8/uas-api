'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { recipeService } from '@/lib/services';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { HiSearch, HiArrowRight, HiOutlineBookOpen, HiOutlineHeart, HiOutlineClipboardList } from 'react-icons/hi';
import { TextAnimate } from '@/components/ui/text-animate';

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

  // Data fitur
  const features = [
    {
      icon: HiOutlineBookOpen,
      title: 'Temukan Resep',
      description: 'Cari ribuan resep dari seluruh dunia dengan mudah dan cepat',
      color: 'text-orange-400',
      bgColor: 'bg-orange-400/10',
    },
    {
      icon: HiOutlineHeart,
      title: 'Simpan Favorit',
      description: 'Simpan resep favoritmu ke koleksi pribadi untuk diakses kapan saja',
      color: 'text-red-400',
      bgColor: 'bg-red-400/10',
    },
    {
      icon: HiOutlineClipboardList,
      title: 'Cari Berdasarkan Bahan',
      description: 'Input bahan yang kamu punya, temukan resep yang bisa dimasak',
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
    },
  ];

  return (
    <div className="space-y-2">
      {/* Hero Section */}
      <section className="relative py-8 md:py-12 text-center">
        <div className="animate-float mb-6">
          <div className="inline-block">
            <Image
              src="/logo-hero.png"
              alt="ResepKu Logo"
              width={100}
              height={100}
              className="drop-shadow-2xl"
              priority
            />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight flex flex-col items-center">
          <TextAnimate
            as="span"
            by="word"
            animation="blurIn"
            duration={0.5}
            startOnView={false}
          >
            Temukan Resep
          </TextAnimate>
          <TextAnimate
            as="span"
            by="word"
            animation="blurIn"
            delay={0.3}
            duration={0.5}
            startOnView={false}
            segmentClassName="block bg-gradient-to-r from-orange-400 via-amber-400 to-orange-400 bg-clip-text text-transparent"
          >
            Favoritmu
          </TextAnimate>
        </h1>

        <p className="text-gray-400 text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
          Jelajahi ribuan resep dari seluruh dunia. Simpan, masak, dan bagikan momen kulinermu.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-10">
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

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-2xl glass hover:bg-white/5 transition-all duration-300"
            >
              <div className={`p-4 rounded-full ${feature.bgColor} mb-4`}>
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Kategori Populer</h2>
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
                <div className="relative mb-3 overflow-hidden rounded-2xl h-20 md:h-24">
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
