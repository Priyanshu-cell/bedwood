'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/types';
import { ProductList } from './productList';
import { OrderSummary } from './orderSummary';
import { getCartItems, addToCart, updateCartItemQuantity, removeCartItem } from '@/utils/cartUtils';
import Link from 'next/link';

export const CartPage = () => {
  const [cartItems, setCartItems] = useState<{ product: Product; quantity: number }[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedItems = getCartItems();
      setCartItems(storedItems);
    }
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setCartItems(getCartItems());
  };

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    updateCartItemQuantity(productId, quantity);
    setCartItems(getCartItems());
  };

  const handleRemoveFromCart = (productId: number) => {
    removeCartItem(productId);
    setCartItems(getCartItems());
  };

  return (
    <div className="container mx-auto pb-12">
      <div className="sm:flex ">
        <div className="md:w-4/6 bg-white px-10 py-10 overflow-hidden">
          <div className="h-[calc(100vh-200px)] overflow-y-auto scrollbar-hide"> {/* Adjust the height as needed */}
            <ProductList
              cartItems={cartItems}
              onRemoveFromCart={handleRemoveFromCart}
              onUpdateQuantity={handleUpdateQuantity}
            />
          </div>
        </div>
        <div id="summary" className="md:w-2/6 px-8 py-10">
          <OrderSummary cartItems={cartItems} />
        </div>
      </div>
      <Link href="/productlist" className="flex font-semibold text-indigo-600 text-sm px-12">
        <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512">
          <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
        </svg>
        Continue Shopping
      </Link>
    </div>
  );
};
