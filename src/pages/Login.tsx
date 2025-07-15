import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
      username,
      password,
    });

    const { access_token, user } = response.data;

    // Guardamos token y user en localStorage o contexto
    localStorage.setItem('token', access_token);
    localStorage.setItem('user', JSON.stringify(user));

    // Redirigir según rol
    if (user.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/user');
    }
  } catch (err) {
    console.error('Error de login', err);
  }
 };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80 space-y-4"
      >
        <h2 className="text-xl font-semibold text-center text-gray-700">
          Iniciar sesión
        </h2>

        <input
          type="text"
          placeholder="Usuario"
          className="w-full border p-2 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Iniciar sesión
        </button>

        <p className="text-center text-sm text-gray-500">
          ¿No tienes cuenta?{' '}
          <button
          type="button"
          onClick={() => navigate('/register')}
          className="text-blue-600 hover:underline bg-transparent border-none cursor-pointer"
          >
          Regístrate
        </button>

        </p>
      </form>
    </div>
  );
};

export default Login;
