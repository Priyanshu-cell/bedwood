import React from 'react';
import { Product } from '@/types';
import { FaTrash } from 'react-icons/fa';

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
    <div className="bg-white shadow-md rounded-lg pb-6 px-4 h-full flex flex-col">
      {/* Header */}
      <div className="sticky bg-white z-10 border-b pb-2">
        <h1 className="text-2xl font-semibold">Shopping Cart</h1>
      </div>

      {/* Product List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="space-y-6 flex flex-col items-center">
            {cartItems.map(({ product, quantity }) => (
              <div key={product.id} className="flex items-center justify-between border-b p-6 w-full max-w-4xl">
                <div className="flex items-center space-x-6 w-full">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>

                    {/* Display price with multiplication if quantity > 1 */}
                    <p className="text-lg text-gray-600">
                      {quantity > 1 ? (
                        <>
                          {product.price} x {quantity} = $
                          {(parseFloat(product.price.slice(1)) * quantity).toFixed(2)}
                        </>
                      ) : (
                        product.price
                      )}
                    </p>

                    <div className="flex items-center mt-3">
                      <button
                        onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                        className="bg-gray-300 hover:bg-gray-500 px-3 rounded-md text-lg"
                        disabled={quantity <= 1}
                      >
                        -
                      </button>
                      <span className="mx-3 text-lg">{quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                        className="bg-gray-300 hover:bg-gray-500 px-3 rounded-md text-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemoveFromCart(product.id)}
                    className="text-red-500 hover:text-red-600 text-sm"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
