'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { authService } from '@/lib/services';
import toast from 'react-hot-toast';
import { HiMenu, HiX } from 'react-icons/hi';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
    logout();
    toast.success('Logout berhasil');
    router.push('/login');
  };

  const navLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/explore', label: 'Jelajahi' },
    ...(isAuthenticated
      ? [
          { href: '/my-recipes', label: 'Koleksi' },
          { href: '/ingredients', label: 'Bahan' },
        ]
      : []),
  ];

  const isActive = (path) => pathname === path;

  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <img
                src="/logo-hero.png"
                alt="ResepKu Icon"
                className="h-auto w-10 object-contain"
              />
              <img
                src="/logo-text.png"
                alt="ResepKu"
                className="h-8 w-auto object-contain"
              />
            </Link>


          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  isActive(link.href)
                    ? 'bg-orange-500/20 text-orange-400'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-white font-medium">{user?.name}</span>
                </div>
                <button onClick={handleLogout} className="btn-ghost text-sm">
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link href="/login" className="btn-ghost">
                  Masuk
                </Link>
                <Link href="/register" className="btn-primary text-sm py-2">
                  Daftar
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl text-white hover:bg-white/10 transition-colors"
          >
            {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-xl font-medium transition-colors ${
                    isActive(link.href)
                      ? 'bg-orange-500/20 text-orange-400'
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-white/10 mt-2 pt-4">
                {isAuthenticated ? (
                  <button onClick={handleLogout} className="btn-secondary w-full">
                    Logout
                  </button>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="btn-secondary text-center"
                    >
                      Masuk
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setIsOpen(false)}
                      className="btn-primary text-center"
                    >
                      Daftar
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
