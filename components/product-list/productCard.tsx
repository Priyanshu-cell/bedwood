// components/ProductCard.tsx
import React from 'react';
import { Product } from '@/types';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-2xl px-4  relative shadow-lg">
      {/* Image */}
      <div className="w-full md:h-[210px] overflow-hidden mx-auto my-4 cursor-pointer hover:-translate-y-2 transition-all duration-300">
        <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
      </div>

      {/* Text Content */}
      <div className="relative ">
        <h3 className="md:text-lg text-sm font-extrabold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-gray-600 md:text-sm text-xs mb-2">High-quality furniture for your home.</p>
        <h4 className="md:text-lg text-sm text-gray-800 font-bold mb-4">{product.price}</h4>
        
        {/* Add to Cart Button */}
        <button
          onClick={() => onAddToCart(product)}
          className=" absolute bottom-0 md:right-5 right-0 bg-gray-100 md:w-10 md:h-10 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-all"
        >
          <ShoppingCartIcon className="md:h-6 md:w-6 w-4 h-4 text-gray-800" />
        </button>
      </div>
    </div>
  );
};
