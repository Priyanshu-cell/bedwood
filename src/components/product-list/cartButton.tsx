'use client'
import React, { useEffect, useState } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

interface CartButtonProps {
  onClick: () => void;
  itemCount: number;
}

export const CartButton: React.FC<CartButtonProps> = ({ onClick, itemCount }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Ensure component mounts before rendering item count
  }, []);

  return (
    <button
      onClick={onClick}
      className="relative bg-indigo-600 text-white md:p-4 p-2 rounded-full shadow-lg hover:bg-indigo-700 transition duration-300"
    >
      <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
      {isMounted && itemCount > 0 && (
        <p className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount}
        </p>
      )}
    </button>
  );
};
