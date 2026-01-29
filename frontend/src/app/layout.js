import './globals.css';
import Providers from '@/components/Providers';
import Navbar from '@/components/layout/Navbar';

export const metadata = {
  title: 'ResepKu - Temukan Resep Favoritmu',
  description: 'Jelajahi ribuan resep dari seluruh dunia',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-slate-900 text-white">
        <Providers>
          <div className="min-h-screen relative">
            {/* Background Blobs */}
            <div className="blob-orange -top-40 -right-40 animate-pulse-glow" />
            <div className="blob-purple top-1/2 -left-20 animate-pulse-glow" />
            
            {/* Content */}
            <div className="relative z-10">
              <Navbar />
              <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
