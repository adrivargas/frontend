import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

// Interfaces para tipado
interface User {
  id: number;
  nombre: string;
  username: string;
  correo: string;
  role: 'admin' | 'user';
}

interface Order {
  id: number;
  tableId: number;
  userId: number;
}

function AdminDashboard() {
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [ordenes, setOrdenes] = useState<Order[]>([]);
  const navigate = useNavigate();

  // Obtener usuarios y órdenes al cargar
  useEffect(() => {
    API.get('/users')
      .then((res) => {
        console.log('👥 Usuarios:', res.data);
        setUsuarios(res.data);
      })
      .catch((err) => console.error('❌ Error usuarios:', err));

    API.get('/orders')
      .then((res) => {
        console.log('📦 Órdenes:', res.data);
        setOrdenes(res.data);
      })
      .catch((err) => console.error('❌ Error órdenes:', err));
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">
        Panel de Administrador 🛠️
      </h1>

      {/* Sección de Usuarios */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">👥 Usuarios registrados</h2>
        <ul className="bg-white shadow p-4 rounded divide-y divide-gray-200">
          {usuarios.map((u) => (
            <li key={u.id} className="py-2 flex justify-between">
              <span>
                <strong>{u.nombre}</strong> ({u.username}) - Rol:{' '}
                <span className="text-blue-600 font-medium">{u.role}</span>
              </span>
              <span className="text-sm text-gray-500">{u.correo}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Sección de Órdenes */}
      <section>
        <h2 className="text-2xl font-semibold mb-3">📦 Pedidos registrados</h2>
        <ul className="bg-white shadow p-4 rounded divide-y divide-gray-200">
          {ordenes.map((o) => (
            <li key={o.id} className="py-2">
              Pedido #{o.id} - Mesa {o.tableId} - Usuario ID: {o.userId}
            </li>
          ))}
        </ul>
      </section>

      {/* Botón volver */}
      <button
        onClick={() => navigate('/')}
        className="mt-8 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        ⬅️ Volver al menú público
      </button>
    </div>
  );
}

export default AdminDashboard;
