// pages/Contacto.tsx
export default function Contacto() {
  return (
    <div className="min-h-screen bg-yellow-50 flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold text-red-600 mb-4">📞 Contáctanos</h1>
      <ul className="text-lg text-gray-800 space-y-3">
        <li>📱 WhatsApp: <span className="font-semibold">+593 99 123 4567</span></li>
        <li>📞 Teléfono local: <span className="font-semibold">02 234 5678</span></li>
        <li>📧 Email: <span className="font-semibold">contacto@empanadagigante.ec</span></li>
      </ul>
    </div>
  );
}
