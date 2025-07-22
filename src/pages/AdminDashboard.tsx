import { useEffect, useState } from 'react';
import API from '../api';

interface User {
  id: number;
  nombre: string;
  username: string;
  correo: string;
  role: 'admin' | 'user';
}

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'usuarios' | 'ordenes' | 'menu'>('usuarios');
  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState([]);
  const [menu, setMenu] = useState([]);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<User>>({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [userRes, orderRes, menuRes] = await Promise.all([
      API.get('/users'),
      API.get('/orders'),
      API.get('/menu-items'),
    ]);
    setUsers(userRes.data);
    setOrders(orderRes.data);
    setMenu(menuRes.data);
  };

  const handleUserEdit = (user: User) => {
    setEditingUserId(user.id);
    setEditForm(user);
  };

  const handleUserUpdate = async () => {
    try {
      await API.put(`/users/${editingUserId}`, editForm);
      alert('Usuario actualizado');
      setEditingUserId(null);
      fetchData();
    } catch (err) {
      console.error(err);
      alert('Error al actualizar usuario');
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'usuarios':
        return (
          <div>
            <h2 className="text-xl font-semibold mb-2">Usuarios</h2>
            <ul className="bg-white border border-gray-300 p-4 rounded shadow space-y-2">
              {users.map((user) => (
                <li key={user.id} className="flex justify-between items-center text-gray-800">
                  {editingUserId === user.id ? (
                    <div className="w-full flex flex-col gap-1">
                      <input
                        value={editForm.nombre || ''}
                        onChange={(e) => setEditForm({ ...editForm, nombre: e.target.value })}
                        className="border p-1 rounded"
                        placeholder="Nombre"
                      />
                      <input
                        value={editForm.username || ''}
                        onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                        className="border p-1 rounded"
                        placeholder="Username"
                      />
                      <input
                        value={editForm.correo || ''}
                        onChange={(e) => setEditForm({ ...editForm, correo: e.target.value })}
                        className="border p-1 rounded"
                        placeholder="Correo"
                      />
                      <select
                        value={editForm.role || 'user'}
                        onChange={(e) => setEditForm({ ...editForm, role: e.target.value as 'admin' | 'user' })}
                        className="border p-1 rounded"
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                      <div className="flex gap-2 mt-1">
                        <button
                          className="bg-green-600 text-white px-2 py-1 rounded text-sm"
                          onClick={handleUserUpdate}
                        >
                          Guardar
                        </button>
                        <button
                          className="bg-gray-400 text-white px-2 py-1 rounded text-sm"
                          onClick={() => setEditingUserId(null)}
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <span>
                        <strong>{user.nombre}</strong> ({user.username}) -{' '}
                        <span className={user.role === 'admin' ? 'text-red-600 font-bold' : 'text-gray-500'}>
                          {user.role}
                        </span>
                      </span>
                      <button
                        onClick={() => handleUserEdit(user)}
                        className="bg-blue-600 text-white px-2 py-1 rounded text-sm"
                      >
                        Editar
                      </button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        );

      case 'ordenes':
        return (
          <div>
            <h2 className="text-xl font-semibold mb-2">Órdenes</h2>
            <ul className="bg-white border border-gray-300 p-4 rounded shadow space-y-1">
              {orders.map((order: any) => (
                <li key={order._id} className="text-gray-800">
                  {order.clientName} - Total: ${Number(order.total || 0).toFixed(2)} - Estado: {order.status}
                </li>
              ))}
            </ul>
          </div>
        );

      case 'menu':
        return (
          <div>
            <h2 className="text-xl font-semibold mb-2">Menú (pendiente implementar edición)</h2>
            <ul className="bg-white border border-gray-300 p-4 rounded shadow space-y-1">
              {menu.map((item: any) => (
                <li key={item.id} className="text-gray-800">
                  {item.name} - ${item.price?.toFixed(2) || '0.00'}
                </li>
              ))}
            </ul>
          </div>
        );
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Panel de Administrador</h1>

      <div className="flex space-x-4 mb-4">
        {['usuarios', 'ordenes', 'menu'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-2 rounded font-semibold transition ${
              activeTab === tab ? 'bg-red-600 text-white shadow' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {tab[0].toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div>{renderContent()}</div>
    </div>
  );
};

export default AdminDashboard;
