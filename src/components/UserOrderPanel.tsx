import { useState } from 'react';

interface MenuItem {
  _id: string;
  name: string;
  price: number | string;
}

interface Props {
  menu: MenuItem[];
}

const UserOrderPanel = ({ menu }: Props) => {
  const [pedido, setPedido] = useState<MenuItem[]>([]);
  const [clientName, setClientName] = useState('');
  const [tableNumber, setTableNumber] = useState('');

  const agregarAlPedido = (item: MenuItem) => {
    setPedido([...pedido, item]);
  };

  const enviarPedido = () => {
    if (!clientName || !tableNumber || pedido.length === 0) {
      alert('Completa todos los campos y agrega productos al pedido.');
      return;
    }

    // Lógica para enviar pedido al backend...
    alert('Pedido enviado');
    setPedido([]);
    setClientName('');
    setTableNumber('');
  };

  const menuFiltrado = menu.filter((item) => item && item.name);


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Pedido */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-bold mb-2">🚲 Tu Pedido</h2>
        {pedido.length === 0 ? (
          <p className="text-gray-500">Aún no has agregado nada.</p>
        ) : (
          <ul className="list-disc list-inside">
            {pedido.map((item, index) => (
              <li key={index}>
                {item.name} - ${Number(item.price || 0).toFixed(2)}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Confirmar */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-bold mb-2">📄 Confirmar Pedido</h2>
        <input
          type="text"
          placeholder="Nombre del cliente"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          className="border p-2 mb-2 w-full rounded"
        />
        <input
          type="text"
          placeholder="Número de mesa"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
          className="border p-2 mb-2 w-full rounded"
        />
        <button
          onClick={enviarPedido}
          className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700"
        >
          ✅ Enviar Pedido
        </button>
      </div>

      {/* Tarjetas Flip */}
      <div className="col-span-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {menuFiltrado.map((item) => (
          <div key={item._id} className="card-flip h-64">
            <div className="card-inner">
              {/* FRONT */}
              <div className="card-front p-4 flex flex-col justify-center items-center shadow-lg border">
                <h3 className="text-xl font-bold text-red-600">{item.name}</h3>
                <p className="text-green-600 mt-2 font-semibold">
                  💰 ${Number(item.price || 0).toFixed(2)}
                </p>
              </div>

              {/* BACK */}
              <div className="card-back p-4 flex flex-col justify-between items-center text-center shadow-lg border">
                <p className="text-gray-700 mb-2">
                  Disfruta nuestras <strong>{item.name}</strong> con sabor casero. 😋
                </p>
                <button
                  onClick={() => agregarAlPedido(item)}
                  className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 transition"
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
};

export default UserOrderPanel;
