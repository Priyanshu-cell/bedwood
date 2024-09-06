'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/types';
import { ProductList } from './productList';
import { OrderSummary } from './orderSummary';
import { getStoredCartItems, saveCartItems } from '@/utils/cartUtils'; 

export const CartPage = () => {
  const [cartItems, setCartItems] = useState<{ product: Product; quantity: number }[]>([]);

  // Ensure cart is loaded only on the client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedItems = getStoredCartItems();
      setCartItems(storedItems);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      saveCartItems(cartItems);
    }
  }, [cartItems]);

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    setCartItems(prevCart => {
      const itemIndex = prevCart.findIndex(item => item.product.id === productId);
      if (itemIndex >= 0) {
        if (quantity <= 0) {
          return prevCart.filter(item => item.product.id !== productId);
        }
        const newCart = [...prevCart];
        newCart[itemIndex].quantity = quantity;
        return newCart;
      }
      return prevCart;
    });
  };

  const handleRemoveFromCart = (productId: number) => {
    setCartItems(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  return (
    <div className="overflow-y-auto">
      <section className="bg-gray-50 py-10 px-4 h-full mx-auto">
        <div className="flex flex-col gap-4 justify-center items-center m-auto">
          <ProductList
            cartItems={cartItems}
            onRemoveFromCart={handleRemoveFromCart}
            onUpdateQuantity={handleUpdateQuantity}
          />
          <OrderSummary cartItems={cartItems} />
        </div>
      </section>
    </div>
  );
};
