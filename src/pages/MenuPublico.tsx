import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api';

interface MenuItem {
  name: string;
  price: number;
  sizes?: string[];
}

function MenuPublico() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  const navigate = useNavigate();
  const { role } = useAuth();

  useEffect(() => {
    API.get('/menu-items')
      .then((res) => {
        console.log('📦 Menú recibido:', res.data);
        setMenu(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => console.error('❌ Error al obtener el menú:', err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 via-orange-50 to-yellow-100 p-6 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">

        {user && (
          <span className="text-green-700 font-semibold">
            Hola, {user.nombre} 👋
          </span>
        )}

      </div>

      {/* Botón admin */}
      {user?.role === 'admin' && (
        <button
          onClick={() => navigate('/agregar-producto')}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow-md transition"
        >
          ➕ Agregar nuevo producto
        </button>
      )}

      {/* Menú */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-6">
        {menu.map((item, index) => (
          <div key={index} className="card-flip h-64 rounded-xl shadow-xl">
            <div className="card-inner w-full h-full transition-transform duration-500 hover:scale-105">
              {/* FRONT */}
              <div className="card-front p-6 flex flex-col justify-between border border-orange-200 bg-white shadow-md rounded-lg">
                <div>
                  <h2 className="text-2xl font-bold text-red-600 mb-2">{item.name}</h2>
                  {item.sizes && (
                    <ul className="text-gray-700 text-sm list-disc pl-4">
                      {item.sizes.map((size, i) => (
                        <li key={i}>{size}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="text-lg font-semibold text-green-600 mt-2">
                  {typeof item.price === 'number'
                    ? <>💰 ${item.price.toFixed(2)}</>
                    : <span className="text-red-500">❌ Sin precio</span>}
                </div>
              </div>

              {/* BACK */}
              <div className="card-back flex flex-col justify-center items-center text-center p-6 border border-yellow-300 bg-yellow-50 rounded-lg">
                <p className="text-gray-800 text-base font-medium mb-2">
                  Disfruta nuestras <strong>{item.name}</strong>, una delicia casera con sabor auténtico. 😋
                </p>
                <span className="text-gray-500 text-sm italic">Inicia sesión como usuario para hacer pedidos</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuPublico;
