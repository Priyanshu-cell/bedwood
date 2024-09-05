// components/cart/ProductList.tsx
import React from 'react';
import { Product } from '@/types';

interface ProductListProps {
  cartItems: { product: Product; quantity: number }[];
  onRemoveFromCart: (productId: number) => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
}

export const ProductList: React.FC<ProductListProps> = ({
  cartItems,
  onRemoveFromCart,
  onUpdateQuantity,
}) => {
  return (
    <div className="flex-1 min-w-fit bg-white shadow-md rounded-lg p-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Shopping Cart</h2>
      <div className="grid md:grid-cols-4 gap-6">
        {cartItems.map(({ product, quantity }) => (
          <div key={product.id} className="flex flex-col shadow-md rounded-md px-6 py-4">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-44 h-44 object-cover rounded-lg"
            />
            <h3 className="text-lg text-start font-semibold text-gray-800 mt-2">{product.name}</h3>
            <div className="flex flex-row  gap-6 m-2">
               <div>
                 <p className="text-gray-600 ">{product.price}</p>
               </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                  className="bg-gray-300 hover:bg-gray-500 px-2 rounded-md"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="text-gray-700">{quantity}</span>
                <button
                  onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                  className="bg-gray-300 hover:bg-gray-500 px-2 rounded-md"
                >
                  +
                </button>
              </div>
            </div>
            
            <button
              onClick={() => onRemoveFromCart(product.id)}
              className="bg-red-500 hover:bg-red-600 px-2 text-white py-1 rounded-md"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-between border-t pt-4">
        <p className="font-bold text-xl">Subtotal</p>
        <p className="font-bold text-xl">
          ${cartItems.reduce((total, { product, quantity }) => total + parseFloat(product.price.slice(1)) * quantity, 0).toFixed(2)}
        </p>
      </div>
    </div>
  );
};
