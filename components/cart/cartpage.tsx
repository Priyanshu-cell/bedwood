'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/types';
import { ProductList } from './productList';
import { OrderSummary } from './orderSummary';
import { getCartItems, addToCart, updateCartItemQuantity, removeCartItem } from '@/utils/cartUtils';

export const CartPage = () => {
  const [cartItems, setCartItems] = useState<{ product: Product; quantity: number }[]>([]);

  // Load cart items from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedItems = getCartItems();
      setCartItems(storedItems);  // Set the cart items from localStorage
    }
  }, []);

  // Handle adding a product to the cart
  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setCartItems(getCartItems()); // Reload cart items after updating localStorage
  };

  // Handle quantity update
  const handleUpdateQuantity = (productId: number, quantity: number) => {
    updateCartItemQuantity(productId, quantity);
    setCartItems(getCartItems()); // Reload cart items after updating
  };

  // Handle removing an item from the cart
  const handleRemoveFromCart = (productId: number) => {
    removeCartItem(productId);
    setCartItems(getCartItems()); // Reload cart items after removing
  };

  return (
    <div className="overflow-y-auto">
      <section className="bg-gray-50 py-10 px-4 h-full mx-auto">
        <div className="flex flex-col gap-4 justify-center items-center m-auto">
          {/* Cart Product List */}
          <ProductList
            cartItems={cartItems}
            onRemoveFromCart={handleRemoveFromCart}
            onUpdateQuantity={handleUpdateQuantity}
          />
          
          {/* Order Summary */}
          <OrderSummary cartItems={cartItems} />
        </div>
      </section>
    </div>
  );
};
