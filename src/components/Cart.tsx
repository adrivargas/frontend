// src/components/Cart.tsx
import React from 'react';

interface CartItem {
  name: string;
  quantity: number;
}

interface Props {
  items: CartItem[];
  onRemove: (name: string) => void;
}

const Cart: React.FC<Props> = ({ items, onRemove }) => {
  return (
    <div className="bg-white shadow-lg p-4 rounded-md">
      <h2 className="text-2xl font-bold text-red-700 mb-4">🛒 Tu Pedido</h2>

      {items.length === 0 ? (
        <p className="text-gray-500">Aún no has agregado nada.</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li key={i} className="flex justify-between items-center border-b pb-1">
              <span>
                {item.quantity} × {item.name}
              </span>
              <button
                onClick={() => onRemove(item.name)}
                className="text-red-500 hover:underline"
              >
                Quitar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
