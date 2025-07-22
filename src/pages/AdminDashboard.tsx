
import { useEffect, useState } from 'react';
import API from '../api';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'usuarios' | 'ordenes' | 'menu'>('usuarios');
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [menu, setMenu] = useState([]);

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

  const handlePriceUpdate = async (id: number, newPrice: number) => {
    await API.put(`/menu-items/${id}`, { price: newPrice });
    fetchData();
  };

  const handleDelete = async (id: number) => {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      try {
        await API.delete(`/menu-items/${id}`);
        alert('Producto eliminado');
        fetchData();
      } catch (err) {
        console.error(err);
        alert('Error al eliminar el producto');
      }
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'usuarios':
        return (
          <div>
            <h2 className="text-xl font-semibold mb-2">Usuarios</h2>
            <ul className="bg-gray-800 p-2 rounded space-y-1">
              {users.map((user: any) => (
                <li key={user.id}>
                  {user.nombre} ({user.username}) - {user.role}
                </li>
              ))}
            </ul>
          </div>
        );
      case 'ordenes':
        return (
          <div>
            <h2 className="text-xl font-semibold mb-2">Órdenes</h2>
            <ul className="bg-gray-800 p-2 rounded space-y-1">
              {orders.map((order: any) => (
                <li key={order._id}>
                  {order.clientName} - Total: ${order.total} - Estado: {order.status}
                </li>
              ))}
            </ul>
          </div>
        );
      case 'menu':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Agregar nuevo producto</h2>
              <form
                className="bg-gray-800 p-4 rounded space-y-4"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const name = (e.currentTarget.elements.namedItem('name') as HTMLInputElement).value;
                  const price = parseFloat((e.currentTarget.elements.namedItem('price') as HTMLInputElement).value);

                  try {
                    await API.post('/menu-items', { name, price });
                    alert('Producto agregado exitosamente');
                    fetchData();
                    e.currentTarget.reset();
                  } catch (err) {
                    console.error(err);
                    alert('Error al agregar producto');
                  }
                }}
              >
                <div>
                  <label className="block mb-1">Nombre</label>
                  <input name="name" className="w-full p-2 text-black rounded" required />
                </div>
                <div>
                  <label className="block mb-1">Precio</label>
                  <input name="price" type="number" step="0.01" className="w-full p-2 text-black rounded" required />
                </div>
                <button type="submit" className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded mt-2">
                  Agregar Producto
                </button>
              </form>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Editar productos</h2>
              <ul className="bg-gray-800 p-2 rounded space-y-2">
                {menu.map((item: any) => (
                  <li key={item.id} className="flex justify-between items-center">
                    <span>{item.name}</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        defaultValue={item.price}
                        onBlur={(e) => handlePriceUpdate(item.id, parseFloat(e.target.value))}
                        className="bg-white text-black rounded px-2 w-24"
                      />
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-sm"
                      >
                        Eliminar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Panel de Administrador</h1>

      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setActiveTab('usuarios')}
          className={`px-4 py-2 rounded ${activeTab === 'usuarios' ? 'bg-blue-700' : 'bg-gray-700'}`}
        >
          Usuarios
        </button>
        <button
          onClick={() => setActiveTab('ordenes')}
          className={`px-4 py-2 rounded ${activeTab === 'ordenes' ? 'bg-blue-700' : 'bg-gray-700'}`}
        >
          Órdenes
        </button>
        <button
          onClick={() => setActiveTab('menu')}
          className={`px-4 py-2 rounded ${activeTab === 'menu' ? 'bg-blue-700' : 'bg-gray-700'}`}
        >
          Menú
        </button>
      </div>

      <div>{renderContent()}</div>
    </div>
  );
};

export default AdminDashboard;
