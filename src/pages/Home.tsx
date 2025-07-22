import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-empanada-blur bg-cover bg-center font-sans">
      {/* Capa de difuminado encima del fondo */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm z-0" />

      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-24 md:py-32">
        <h1 className="text-4xl md:text-6xl font-extrabold text-rojo mb-6 drop-shadow-xl tracking-wide animate-fade-in-down">
          Bienvenidos a <br className="block md:hidden" />
          <span className="inline-block">La Casa de la Empanada Gigante 🥟</span>
        </h1>

        <p className="text-gray-800 text-lg md:text-xl max-w-3xl mb-8 leading-relaxed animate-fade-in-up">
          Donde cada bocado cuenta una historia. Disfruta nuestras empanadas artesanales,
          bebidas típicas y platos tradicionales ecuatorianos hechos con amor. ❤️
        </p>

        <button
            onClick={() => navigate('/menu')}
            className="bg-rojo hover:bg-empanada-800 text-black px-8 py-3 rounded-full shadow-xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
            📢 Explorar Menú
        </button>
      </div>
    </div>
  );
}

export default Home;
