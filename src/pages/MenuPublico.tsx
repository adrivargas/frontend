import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api';
import Cart from '../components/Cart';

interface MenuItem {
  name: string;
  price: number;
  sizes?: string[];
}

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

function MenuPublico() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  const navigate = useNavigate();
  const { token, role } = useAuth();

  useEffect(() => {
    API.get('/menu-items')
      .then((res) => {
        console.log('📦 Menú recibido:', res.data);
        setMenu(Array.isArray(res.data) ? res.data : []);
      })
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
    return [...prev, { name: item.name, price: item.price, quantity: 1 }];
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
  if (!user) {
    alert('Debes iniciar sesión para enviar un pedido.');
    return;
  }

  try {
    const order = {
      items: cart,
      tableId: 5, // Puedes hacerlo dinámico si tienes selector
      statusId: 1,
      userId: user.id,
      paymentId: 10,
    };

    const res = await API.post('/orders', order);
    console.log('✅ Pedido enviado:', res.data);

    setCart([]);
    alert('🎉 ¡Pedido enviado con éxito!');
  } catch (error) {
    console.error('❌ Error al enviar el pedido:', error);
    alert('Error al enviar el pedido');
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 via-orange-50 to-yellow-100 p-6 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
      <h1 className="text-3xl font-bold text-red-700">
        La Casa de la Empanada Gigante 🥟
      </h1>

      {user ? (
        <span className="text-green-700 font-semibold">
          Hola, {user.nombre} 👋
        </span>
      ) : (
        <button
          onClick={() => navigate('/login')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Iniciar Sesión
        </button>
      )}
      </div>

      {user?.role === 'admin' && (
        <button
        onClick={() => navigate('/agregar-producto')}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow-md transition"
        >
        ➕ Agregar nuevo producto
        </button>
      )}



      {/* Pedido Count */}
      <div className="text-right mb-4 text-lg font-medium text-gray-700">
        🛒 Pedido: <span className="text-red-700 font-bold">{cart.reduce((acc, item) => acc + item.quantity, 0)}</span> productos
      </div>

      

      {/* Carrito y Formulario */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Cart items={cart} onRemove={removeFromCart} />
        <form
          onSubmit={handleSubmitOrder}
          className="bg-white rounded-lg shadow-md p-6 space-y-4 border border-gray-200"
        >
          <h2 className="text-2xl font-semibold text-yellow-700 mb-2">📝 Confirmar Pedido</h2>
          <input
            type="text"
            placeholder="Nombre del cliente"
            className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
            type="number"
            placeholder="Número de mesa"
            className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition shadow"
          >
            ✅ Enviar Pedido
          </button>
        </form>
      </div>

      {/* Menú */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
    {menu.map((item, index) => (
      <div key={index} className="card-flip h-64 rounded-xl shadow-xl">
        <div className="card-inner w-full h-full">
          {/* FRONT */}
          <div className="card-front p-6 flex flex-col justify-between border border-orange-200">
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
              💰 ${item.price.toFixed(2)}
            </div>
          </div>

          {/* BACK */}
          <div className="card-back flex flex-col justify-center items-center text-center p-6 border border-yellow-300">
            <p className="text-gray-800 text-sm mb-4">
              Disfruta nuestras <strong>{item.name}</strong>, una delicia casera con sabor auténtico. 😋
            </p>
            <button
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow"
              onClick={() => addToCart(item)}
            >
              ➕ Agregar al pedido
            </button>
            </div>
           </div>
          </div>
         ))}
       </div>

    </div>
  );
}

export default MenuPublico;
