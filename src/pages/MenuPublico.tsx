import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api';
import Cart from '../components/Cart';

interface MenuItem {
  name: string;
  sizes?: string[];
}

interface CartItem {
  name: string;
  quantity: number;
}

function MenuPublico() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const navigate = useNavigate();
  const { token, role } = useAuth();

  useEffect(() => {
    API.get('/menu-items')
      .then((res) => setMenu(res.data))
      .catch((err) => console.error('❌ Error al obtener el menú:', err));
  }, []);

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const found = prev.find((p) => p.name === item.name);
      if (found) {
        return prev.map((p) =>
          p.name === item.name ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { name: item.name, quantity: 1 }];
    });
  };

  const removeFromCart = (name: string) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.name === name ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleSubmitOrder = async () => {
    try {
      const order = {
        items: cart,
        tableId: 5,
        statusId: 1,
        userId: 3,
        paymentId: 10,
      };

      const res = await API.post('/orders', order);
      console.log('✅ Pedido enviado:', res.data);
      alert('Pedido enviado exitosamente 🥳');
      setCart([]);
    } catch (error) {
      console.error('❌ Error al enviar el pedido:', error);
      alert('Error al enviar el pedido');
    }
  };

  return (
    <div className="min-h-screen bg-yellow-50 p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-red-700">
          La Casa de la Empanada Gigante 🥟
        </h1>
        {!token && (
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Iniciar Sesión
          </button>
        )}
        {token && (
          <span className="text-green-600 font-semibold">
            Sesión iniciada como <span className="uppercase">{role}</span>
          </span>
        )}
      </div>

      <div className="text-right mb-4 text-lg">
        🛒 Pedido: <span className="font-bold">{cart.reduce((acc, item) => acc + item.quantity, 0)}</span> productos
      </div>

      <div className="mb-6">
        <Cart items={cart} onRemove={removeFromCart} />
        <form className="bg-white p-4 rounded-md shadow-md space-y-3">
          <input type="text" placeholder="Nombre del cliente" className="border p-2 rounded w-full" />
          <input type="number" placeholder="Número de mesa" className="border p-2 rounded w-full" />
          <button
            onClick={handleSubmitOrder}
            className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md w-full"
          >
            Confirmar Pedido
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {menu.map((item, index) => (
          <div key={index} className="bg-white shadow-md p-4 rounded-xl border hover:shadow-xl transition-all">
            <h2 className="text-xl font-bold text-red-600">{item.name}</h2>
            {item.sizes && (
              <ul className="mt-2 text-gray-700 text-sm list-disc list-inside">
                {item.sizes.map((size, i) => (
                  <li key={i}>{size}</li>
                ))}
              </ul>
            )}
            <button
              className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md w-full"
              onClick={() => addToCart(item)}
            >
              Agregar al pedido
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuPublico;
