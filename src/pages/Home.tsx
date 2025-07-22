import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-yellow-100 to-orange-50 flex items-center justify-center text-center px-4">
      {/* Imagen de fondo desenfocada */}
      <img
        src="/assets/fondo-empanada.jpg"
        className="absolute inset-0 w-full h-full object-cover opacity-10 blur-sm"
        alt="Fondo empanadas"
      />

      {/* Contenido principal */}
      <div className="relative z-10 animate-fade-in-down">
        <h1 className="text-4xl md:text-6xl font-extrabold text-red-700 mb-4 font-[Pacifico]">
          Bienvenidos a La Casa de la Empanada Gigante 🥟
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
          Donde cada bocado cuenta una historia. Disfruta nuestras empanadas artesanales,
          bebidas típicas y platos tradicionales ecuatorianos hechos con amor. ❤️
        </p>

        <div className="mt-6">
          <button
            onClick={() => navigate('/menu')}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            🍽️ Explorar Menú
          </button>
        </div>

        {/* Opcional: Ilustración */}
        <img
          src="/assets/fondo-empanada.png"
          className="w-64 mx-auto mt-8 animate-fade-in-up"
        />
      </div>
    </div>
  );
}
