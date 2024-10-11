import React, { useState } from 'react';

import { WhatsAppCheckout } from '@/src/form/whatsappCheckOut'; // Import WhatsAppCheckout component
import { TProduct } from '@/src/services/product/product.type';

interface OrderSummaryProps {
  cartItems: { product: TProduct; quantity: number }[];
  onCheckout: () => void; // Add onCheckout prop
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ cartItems, onCheckout }) => {
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  // Calculate the subtotal
  const subtotal = cartItems
    .reduce((total, { product, quantity }) => total + product.price * quantity, 0)
    .toFixed(2);

  // Calculate the total number of distinct products (not including their quantity)
  const distinctProductsCount = cartItems.length;

  return (
    <div className="max-w-5xl w-full min-w-xl bg-white shadow-md rounded-lg p-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Order Summary</h2>
      
      {/* Display the count of distinct products */}
      <div className="flex justify-between mb-4">
        <p className="text-lg">Items: {distinctProductsCount}</p> {/* Distinct product count */}
        <p className="text-lg font-semibold">${subtotal}</p>
      </div>

      <form>
        <div className="flex justify-between mt-6">
          <p className="text-lg font-medium">Total</p>
          <p className="text-lg font-semibold text-orange-600">${subtotal}</p>
        </div>
      </form>

      <div className='bg-orange-400 hover:bg-orange-600 text-black px-4 py-2 rounded-md mt-2 flex items-center justify-center w-fit '>
        <WhatsAppCheckout
          cartItems={cartItems}
          onCheckoutComplete={() => {
            setShowCheckoutModal(false);
            onCheckout(); // Clear the cart after checkout
          }}
        />
      </div>
    </div>
  );
};
