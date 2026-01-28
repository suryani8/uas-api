import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { authService } from '../../services/authService';
import toast from 'react-hot-toast';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authService.logout();
      logout();
      toast.success('Logout berhasil');
      navigate('/login');
    } catch (error) {
      logout();
      navigate('/login');
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-orange-500">
            🍳 ResepKu
          </Link>

          <div className="flex items-center gap-6">
            <Link to="/explore" className="text-gray-600 hover:text-orange-500">
              Jelajahi
            </Link>

            {isAuthenticated ? (
              <>
                <Link to="/my-recipes" className="text-gray-600 hover:text-orange-500">
                  Koleksi Saya
                </Link>
                <Link to="/ingredients" className="text-gray-600 hover:text-orange-500">
                  Bahan Saya
                </Link>
                <div className="flex items-center gap-3">
                  <span className="text-gray-600">Halo, {user?.name}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex gap-3">
                <Link
                  to="/login"
                  className="text-orange-500 border border-orange-500 px-4 py-2 rounded-lg hover:bg-orange-50"
                >
                  Masuk
                </Link>
                <Link
                  to="/register"
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
                >
                  Daftar
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
