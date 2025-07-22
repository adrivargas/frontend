const Unauthorized = () => {
  return (
    <div className="flex items-center justify-center h-screen text-center">
      <div>
        <h1 className="text-4xl font-bold text-red-600">Acceso Denegado</h1>
        <p className="text-lg mt-4 text-gray-300">
          No tienes permisos para acceder a esta sección.
        </p>
        <a href="/" className="mt-6 inline-block bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
          Volver al inicio
        </a>
      </div>
    </div>
  );
};

export default Unauthorized;
