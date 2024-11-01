import { TProduct } from '@/src/services/product/product.type';
import React from 'react';
import { FaTrash } from 'react-icons/fa';
import Link from 'next/link'; // Import Link component from Next.js

interface ProductListProps {
  cartItems: { product: TProduct; quantity: number }[];
  onRemoveFromCart: (productId: string) => void; // Updated to string
  onUpdateQuantity: (productId: string, quantity: number) => void; // Updated to string
}

export const ProductList: React.FC<ProductListProps> = ({
  cartItems,
  onRemoveFromCart,
  onUpdateQuantity,
}) => {
  return (
    <div className="shadow-md rounded-lg pb-6 px-4 h-full flex flex-col">
      {/* Header */}
      <div className="sticky z-10 border-b pb-2">
        <h1 className="text-2xl font-semibold">Shopping Cart</h1>
      </div>

      {/* Product List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="space-y-6 flex flex-col items-center">
            {cartItems.map(({ product, quantity }) => (
              <div key={product._id} className="flex items-center justify-between border-b p-6 w-full max-w-4xl">
                <div className="flex items-center space-x-6 w-full">
                  <img
                    src={product.image[0]}
                    alt={product.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    {/* Link to product detail */}
                    <Link href={`/product/${product._id}`} passHref>
                      <h3 className="text-xl font-semibold text-gray-800 hover:text-orange-500 cursor-pointer">
                        {product.name}
                      </h3>
                    </Link>

                    {/* Display price with multiplication if quantity > 1 */}
                    <p className="text-lg text-gray-600">
                      {quantity > 1 ? (
                        <>
                          ₹{product.price} x {quantity} = ₹{(product.price * quantity).toFixed(2)}
                        </>
                      ) : (
                        `₹${product.price}`
                      )}
                    </p>

                    <div className="flex items-center mt-3">
                      <button
                        onClick={() => onUpdateQuantity(product._id, quantity - 1)}
                        className="bg-gray-300 hover:bg-gray-500 px-3 rounded-md text-lg"
                        disabled={quantity <= 1}
                      >
                        -
                      </button>
                      <span className="mx-3 text-lg">{quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(product._id, quantity + 1)}
                        className="bg-gray-300 hover:bg-gray-500 px-3 rounded-md text-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemoveFromCart(product._id)}
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
