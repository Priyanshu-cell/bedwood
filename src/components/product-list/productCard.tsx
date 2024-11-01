'use client';
import React, { useState } from "react";
import { TProduct } from "@/src/services/product/product.type";
import { MinusIcon, PlusIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface ProductCardProps {
  product: TProduct;
  onAddToCart: (product: TProduct, quantity: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (change: number) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  const productImage = Array.isArray(product.image) && product.image.length > 0 
    ? `${product.image[0]}` 
    : 'https://placehold.co/250x250.png'; 

  return (
    <div className="bg-white relative p-4 border rounded-lg shadow-lg flex flex-col justify-between h-full">
      {/* Image */}
      <Link prefetch={true} href={`/product/${product._id}`} className="block">
        <div className="w-full h-[180px] md:h-[250px] overflow-hidden relative cursor-pointer">
          <img
            src={productImage}
            alt={product.name}
            className="h-full w-full object-contain transition-transform duration-300 hover:scale-110"
            onError={(e) => {
              e.currentTarget.src = 'https://placehold.co/250x250.png';
            }}
          />
        </div>
      </Link>

      {/* Product Details */}
      <div className="md:p-5  p-1">
        {/* Responsive text size */}
        <h3 className="text-xs sm:text-sm md:text-lg font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-orange-600 transition-colors duration-300">
          {product.name}
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2">
          {product.descriptions}
        </p>

        <hr className="my-4" />

        {/* Price and Quantity Section */}
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-sm sm:text-lg font-extrabold text-orange-600">₹{product.price}</h4>
          <div className="flex items-center bg-gray-100 rounded-full p-1">
            {/* Minus Button */}
            <button
              onClick={() => handleQuantityChange(-1)}
              className={`h-6 w-6 text-gray-500 hover:text-orange-600 transition-colors duration-200 p-1 rounded-full ${quantity <= 1 && 'opacity-50 cursor-not-allowed'}`}
              disabled={quantity <= 1}
            >
              <MinusIcon className="h-3 w-3" />
            </button>

            {/* Quantity Display */}
            <span className="text-xs sm:text-sm text-gray-700 font-medium w-6 sm:w-8 text-center">
              {quantity}
            </span>

            {/* Plus Button */}
            <button
              onClick={() => handleQuantityChange(1)}
              className="h-6 w-6 text-gray-500 hover:text-orange-600 transition-colors duration-200 p-1 rounded-full"
            >
              <PlusIcon className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product, quantity);
          }}
          className="w-full bg-orange-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-orange-500 transition-colors duration-300 flex items-center justify-center space-x-2"
        >
          <ShoppingCartIcon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
          <span className="text-xs sm:text-sm">Add to Cart</span>
        </button>
      </div>
    </div>
  );
};
