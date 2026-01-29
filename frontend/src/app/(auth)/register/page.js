'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authService } from '@/lib/services';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';
import { HiUser, HiMail, HiLockClosed, HiArrowRight } from 'react-icons/hi';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setAuth } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await authService.register(form);
      setAuth(response.data.user, response.data.accessToken);
      toast.success('Registrasi berhasil!');
      router.push('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registrasi gagal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="card p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-4xl shadow-lg shadow-orange-500/30">
              ðŸ³
            </div>
            <h1 className="text-2xl font-bold text-white">Buat Akun</h1>
            <p className="text-gray-400 mt-2">Mulai koleksi resepmu sekarang</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-300 font-medium mb-2 text-sm">Nama</label>
              <div className="relative">
                <HiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-dark pl-12" placeholder="Nama lengkap" required />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-2 text-sm">Email</label>
              <div className="relative">
                <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-dark pl-12" placeholder="nama@email.com" required />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-2 text-sm">Password</label>
              <div className="relative">
                <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="input-dark pl-12" placeholder="Min. 6 karakter" minLength={6} required />
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full btn-primary py-4 flex items-center justify-center gap-2">
              {loading ? 'Memproses...' : (<>Daftar <HiArrowRight className="w-5 h-5" /></>)}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-400">
            Sudah punya akun? <Link href="/login" className="text-orange-400 font-semibold hover:underline">Masuk</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
