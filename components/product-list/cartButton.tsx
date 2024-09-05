import React from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

interface CartButtonProps {
  onClick: () => void;
  itemCount: number;
}

export const CartButton: React.FC<CartButtonProps> = ({ onClick, itemCount }) => {
  return (
    <button
      onClick={onClick}
      className="relative bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition duration-300"
    >
      <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
      {itemCount > 0 && (
        <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </button>
  );
};
