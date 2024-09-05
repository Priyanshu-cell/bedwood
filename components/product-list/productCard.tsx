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
    <div className="bg-white rounded-2xl p-5 cursor-pointer hover:-translate-y-2 transition-all relative shadow-lg">
      <div className="w-5/6 h-[210px] overflow-hidden mx-auto aspect-w-16 aspect-h-9 mb-4">
        <img src={product.imageUrl} alt={product.name} className="h-full w-full object-contain" />
      </div>

      <div className="relative">
        <h3 className="text-lg font-extrabold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-2">Lorem ipsum dolor sit amet.</p>
        <h4 className="text-lg text-gray-800 font-bold mb-4">{product.price}</h4>
        <button
          onClick={() => onAddToCart(product)}
          className="absolute bottom-0 right-5 bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 transition-all">
          <ShoppingCartIcon className="h-6 w-6 text-gray-800" />
        </button>
      </div>
    </div>
  );
};
