import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

interface Order {
  id: string;
  date: string;
  status: string;
  items: { name: string }[];
}

const UserDashboard = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (user) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/orders/user/${user.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => setOrders(res.data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  const handleCancelOrder = async (orderId: string) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setOrders((prev) => prev.filter((o) => o.id !== orderId));
    } catch (error) {
      alert('No se pudo cancelar la orden');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Tus órdenes</h2>
      {orders.length === 0 ? (
        <p>No tienes órdenes aún.</p>
      ) : (
        <ul className="space-y-3">
          {orders.map((order) => (
            <li key={order.id} className="p-3 bg-white rounded shadow">
              <p>
                <strong>Fecha:</strong>{' '}
                {new Date(order.date).toLocaleString()}
              </p>
              <p>
                <strong>Productos:</strong>{' '}
                {order.items?.map((i) => i.name).join(', ')}
              </p>
              <p>
                <strong>Estado:</strong> {order.status}
              </p>
              <button
                onClick={() => handleCancelOrder(order.id)}
                className="mt-2 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Cancelar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserDashboard;
