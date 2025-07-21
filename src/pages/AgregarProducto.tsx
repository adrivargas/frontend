import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const AgregarProducto = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [sizes, setSizes] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const producto = {
      name,
      price: parseFloat(price),
      sizes: sizes ? sizes.split(',').map(s => s.trim()) : undefined,
    };

    try {
      await API.post('/menu-items', producto);
      alert('✅ Producto agregado');
      navigate('/');
    } catch (err) {
      console.error('❌ Error al agregar producto:', err);
      alert('Error al agregar producto');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md space-y-4 w-full max-w-md border border-gray-200"
      >
        <h2 className="text-2xl font-semibold text-center text-orange-700">Agregar Nuevo Producto</h2>
        <input
          type="text"
          placeholder="Nombre del producto"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-3 rounded"
          required
        />
        <input
          type="number"
          placeholder="Precio"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border p-3 rounded"
          required
        />
        <input
          type="text"
          placeholder="Tamaños separados por coma (opcional)"
          value={sizes}
          onChange={(e) => setSizes(e.target.value)}
          className="w-full border p-3 rounded"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Guardar producto
        </button>
      </form>
    </div>
  );
};

export default AgregarProducto;
