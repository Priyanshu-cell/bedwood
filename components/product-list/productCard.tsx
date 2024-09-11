'use client'
import React, { useState } from "react";
import { Product } from "@/types";
import { ShoppingCartIcon, InformationCircleIcon, StarIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
}

const getRandomRating = (): number =>
  Math.floor(Math.random() * (5 - 3 + 1)) + 3;

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const rating = getRandomRating();

  const handleQuantityChange = (change: number) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  return (
    <div className="bg-inherit relative group">
      {/* Image Container */}
      <div className="w-full md:h-[250px] overflow-hidden mx-auto my-4 relative cursor-pointer">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />

        {/* Detail Button */}
        <Link
          href={`/product/${product.id}`}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-400 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <InformationCircleIcon className="w-6 h-6" />
        </Link>
      </div>

      {/* Text Content */}
      <div className="relative">
        <h3 className="md:text-lg text-sm font-extrabold text-gray-800 mb-2">
          {product.name}
        </h3>
        <p className="text-gray-600 md:text-sm text-xs mb-2">
          High-quality furniture for your home.
        </p>
        <h4 className="md:text-lg text-sm text-gray-800 font-bold mb-4">
          {product.price}
        </h4>

        {/* Rating */}
        <div className="flex items-center mb-2">
          {Array.from({ length: 5 }, (_, index) => (
            <StarIcon
              key={index}
              className={`w-5 h-5 ${index < rating ? "text-yellow-400" : "text-gray-300"}`}
            />
          ))}
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center mb-2">
          <button
            type="button"
            onClick={() => handleQuantityChange(-1)}
            className="bg-gray-200 hover:bg-gray-300 px-2 rounded-sm"
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className="mx-2 text-gray-700">{quantity}</span>
          <button
            type="button"
            onClick={() => handleQuantityChange(1)}
            className="bg-gray-200 hover:bg-gray-300 px-2 rounded-sm"
          >
            +
          </button>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => onAddToCart(product, quantity)}
          className="absolute bottom-0 md:right-5 right-0 bg-gray-100 md:w-10 md:h-10 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-all"
        >
          <ShoppingCartIcon className="md:h-6 md:w-6 w-4 h-4 text-gray-800" />
        </button>
      </div>
    </div>
  );
};
