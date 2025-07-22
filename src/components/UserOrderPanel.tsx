import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

interface MenuItem {
  name: string;
  price: number;
  sizes?: string[];
}

interface UserOrderPanelProps {
  menu: MenuItem[];
}

const UserOrderPanel = ({ menu }: UserOrderPanelProps) => {
  const [orderItems, setOrderItems] = useState<MenuItem[]>([]);
  const [clientName, setClientName] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const { user } = useAuth();

  const handleAddItem = (item: MenuItem) => {
    setOrderItems([...orderItems, item]);
  };

  const handleSubmitOrder = async () => {
    if (!clientName || !tableNumber || orderItems.length === 0) {
      alert('Por favor completa todos los campos y agrega productos.');
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/orders`,
        {
          userId: user?.id,
          items: orderItems,
          clientName,
          tableNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      alert('✅ Pedido enviado con éxito');
      setOrderItems([]);
      setClientName('');
      setTableNumber('');
    } catch (error) {
      console.error('❌ Error al enviar pedido:', error);
      alert('Hubo un error al enviar el pedido.');
    }
  };

  return (
    <div className="mt-10">
      {/* Panel del pedido */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">🛒 Tu Pedido</h2>
          {orderItems.length === 0 ? (
            <p className="text-gray-600">Aún no has agregado nada.</p>
          ) : (
            <ul className="list-disc pl-5">
              {orderItems.map((item, index) => (
                <li key={index} className="text-gray-800">{item.name}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Formulario */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">📝 Confirmar Pedido</h2>
          <input
            type="text"
            placeholder="Nombre del cliente"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="w-full mb-4 p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Número de mesa"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            className="w-full mb-4 p-2 border rounded"
          />
          <button
            onClick={handleSubmitOrder}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            ✅ Enviar Pedido
          </button>
        </div>
      </div>

      {/* Menú */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {menu.map((item, index) => (
          <div
            key={index}
            className="border border-yellow-300 bg-yellow-50 rounded p-4 flex flex-col justify-between shadow hover:shadow-md"
          >
            <p className="text-gray-800 mb-2">
              Disfruta nuestras <strong>{item.name}</strong> con sabor casero. 😋
            </p>
            <button
              onClick={() => handleAddItem(item)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              ➕ Agregar al pedido
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserOrderPanel;
