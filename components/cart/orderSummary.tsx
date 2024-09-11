import React, { useState } from 'react';
import { Product } from '@/types';
import { WhatsAppCheckout } from '@/form/whatsappCheckOut'; // Import WhatsAppCheckout component

interface OrderSummaryProps {
  cartItems: { product: Product; quantity: number }[];
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ cartItems }) => {
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  const subtotal = cartItems
    .reduce((total, { product, quantity }) => total + parseFloat(product.price.slice(1)) * quantity, 0)
    .toFixed(2);


  return (
    <div className="max-w-5xl w-full min-w-xl bg-white shadow-md rounded-lg p-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Order Summary</h2>
      <div className="flex justify-between mb-4">
        <p className="text-lg">Items: {cartItems.reduce((total, { quantity }) => total + quantity, 0)}</p>
        <p className="text-lg font-semibold">${subtotal}</p>
      </div>
      <form>
        <div className="flex justify-between mt-6">
          <p className="text-lg font-medium">Total</p>
          <p className="text-lg font-semibold text-indigo-600">${subtotal}</p>
        </div>
      </form>
      
        
      <div className='bg-indigo-500 px-4 py-2 rounded-md mt-2 flex items-center justify-center w-fit '>
        <WhatsAppCheckout
        cartItems={cartItems}
        onCheckoutComplete={() => setShowCheckoutModal(false)} />
      </div>
      

      
    </div>
  );
};
