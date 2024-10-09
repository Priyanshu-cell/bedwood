'use client';
import React, { useState } from "react";
import { TProduct } from "@/src/services/product/product.type";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
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

  // Use a fallback image if product image is not available
  const productImage = Array.isArray(product.image) && product.image.length > 0 
    ? `http://${product.image[0]}` // Include full URL
    : 'https://placehold.co/250x250.png'; // Fallback image

  // Log the image source for debugging
  console.log('Product:', product);

  return (
    <div className="bg-inherit relative group p-4 border rounded-lg shadow-lg transition-transform duration-200 hover:scale-105">
      {/* Image Link */}
      <Link href={`/product/${product._id}`} className="block">
        {/* Image Container */}
        <div className="w-full h-[250px] overflow-hidden relative cursor-pointer">
          <img
            src={productImage} // Use the full URL here
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              // If the image fails to load, use the placeholder
              e.currentTarget.src = 'https://placehold.co/250x250.png';
            }}
          />
        </div>
      </Link>

      {/* Text Content */}
      <div className="relative mt-4">
        <h3 className="text-lg font-extrabold text-gray-800 mb-1">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-1">{product.descriptions}</p>
        <h4 className="text-lg text-gray-800 font-bold mb-2">₹{product.price}</h4>
        

        {/* Quantity Selector */}
        <div className="flex items-center mb-2 z-10">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation(); // Prevent the link from being triggered
              handleQuantityChange(-1);
            }}
            className="bg-gray-200 hover:bg-gray-300 px-2 rounded-sm"
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className="mx-2 text-gray-700">{quantity}</span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation(); // Prevent the link from being triggered
              handleQuantityChange(1);
            }}
            className="bg-gray-200 hover:bg-gray-300 px-2 rounded-sm"
          >
            +
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent the link from being triggered
          onAddToCart(product, quantity);
        }}
        className="absolute bottom-4 right-4 bg-blue-600 text-white py-1 px-2 text-sm rounded-md hover:bg-blue-500 transition-colors duration-200"
      >
        <ShoppingCartIcon className="h-4 w-4 inline-block mr-1" />
        Add
      </button>
    </div>
  );
};
