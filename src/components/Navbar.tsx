import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-yellow-100 px-6 py-4 flex justify-between items-center shadow-md">
      <div className="text-2xl font-bold text-red-700">
        <Link to="/">La Casa de la Empanada Gigante 🥟</Link>
      </div>

      <div className="space-x-4 text-gray-800 font-medium">
        <Link to="/" className="hover:text-red-600 transition">Inicio</Link>
        <Link to="/menu" className="hover:text-red-600 transition">Menú</Link>
        <Link to="/contacto" className="hover:text-red-600 transition">Contacto</Link>

        {!user && (
          <>
            <Link to="/register" className="hover:text-green-600 transition">Registrarse</Link>
            <Link to="/login" className="hover:text-blue-600 transition">Iniciar Sesión</Link>
          </>
        )}

        {user && (
          <>
            {user.role === 'admin' ? (
              <Link to="/admin" className="hover:text-purple-600 transition">Admin</Link>
            ) : (
              <Link to="/user" className="hover:text-green-600 transition">Mi Panel</Link>
            )}
            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="text-sm text-red-600 hover:underline ml-4"
            >
              Cerrar sesión
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
