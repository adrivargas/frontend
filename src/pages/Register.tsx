import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await API.post('/auth/register', {
        username,
        password,
        role: 'user'  // Forzamos que sea un usuario normal
      });

      alert('✅ Registro exitoso. Inicia sesión.');
      navigate('/login'); // o si quieres: navigate('/user') para ir directo
    } catch (error) {
      console.error('❌ Error al registrar:', error);
      alert('Error al registrarse');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-100">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-6">Registrarse</h2>

        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full p-2 mb-4 border rounded"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 mb-4 border rounded"
        />

        <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded">
          Registrarse
        </button>
        <p className="text-sm text-center text-gray-600">
          ¿Ya tienes cuenta? <a href="/login" className="text-blue-600 hover:underline">Inicia sesión</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
