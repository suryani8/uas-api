'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { authService } from '@/lib/services';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';
import { HiMail, HiLockClosed, HiArrowRight } from 'react-icons/hi';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setAuth } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await authService.login(form);
      setAuth(response.data.user, response.data.accessToken);
      toast.success('Login berhasil!');
      router.push('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login gagal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="card p-8">
          <div className="text-center mb-8">
            {/* Logo ResepKu */}
            <div className="inline-block mb-4">
              <Image
                src="/logo-hero.png"
                alt="ResepKu Logo"
                width={80}
                height={80}
                className="mx-auto drop-shadow-lg"
              />
            </div>
            <h1 className="text-2xl font-bold text-white">Selamat Datang</h1>
            <p className="text-gray-400 mt-2">Masuk ke akun ResepKu</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-300 font-medium mb-2 text-sm">Email</label>
              <div className="relative">
                <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input 
                  type="email" 
                  value={form.email} 
                  onChange={(e) => setForm({ ...form, email: e.target.value })} 
                  className="input-dark pl-12" 
                  placeholder="nama@email.com" 
                  required 
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-2 text-sm">Password</label>
              <div className="relative">
                <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input 
                  type="password" 
                  value={form.password} 
                  onChange={(e) => setForm({ ...form, password: e.target.value })} 
                  className="input-dark pl-12" 
                  placeholder="Masukkan password" 
                  required 
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="w-full btn-primary py-4 flex items-center justify-center gap-2"
            >
              {loading ? 'Memproses...' : (
                <>
                  Masuk <HiArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-400">
            Belum punya akun?{' '}
            <Link href="/register" className="text-orange-400 font-semibold hover:underline">
              Daftar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
