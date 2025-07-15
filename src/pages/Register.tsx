import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    celular: '',
    username: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, form);
      alert('Registro exitoso 🎉 Ahora puedes iniciar sesión');
      navigate('/login');
    } catch (err) {
      console.error('Error al registrar', err);
      alert('Hubo un error al registrarte');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-96 space-y-4"
      >
        <h2 className="text-xl font-semibold text-center text-gray-700">Registro</h2>

        <input
          type="text"
          name="nombre"
          placeholder="Nombre completo"
          className="w-full border p-2 rounded"
          value={form.nombre}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="correo"
          placeholder="Correo electrónico"
          className="w-full border p-2 rounded"
          value={form.correo}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="celular"
          placeholder="Celular"
          className="w-full border p-2 rounded"
          value={form.celular}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="username"
          placeholder="Usuario"
          className="w-full border p-2 rounded"
          value={form.username}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          className="w-full border p-2 rounded"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Registrarse
        </button>

        <p className="text-center text-sm text-gray-500">
          ¿Ya tienes cuenta?{' '}
          <a href="/login" className="text-green-600 hover:underline">
            Inicia sesión
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
