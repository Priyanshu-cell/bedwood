'use client'

import React, { useState } from 'react';
import { generateWhatsAppMessage } from '@/utils/whatsappUtils'; 
import { Product } from '@/types';

interface WhatsAppCheckoutProps {
  cartItems: { product: Product; quantity: number }[];
  onCheckoutComplete?: () => void; // Optional callback when checkout is complete
}

export const WhatsAppCheckout: React.FC<WhatsAppCheckoutProps> = ({ cartItems, onCheckoutComplete }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  const handleCheckout = () => {
    const whatsappLink = generateWhatsAppMessage(cartItems, formData);

    window.open(whatsappLink);
    if (onCheckoutComplete) onCheckoutComplete();
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="text-white"
      >
        Checkout
      </button>

      {/* Modal for form */}
      {showModal && (
        <div className="fixed inset-0 text-black bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg relative w-full max-w-md">
            <button
              onClick={() => setShowModal(false)}
              className="absolute text-2xl top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Complete Your Purchase</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCheckout();
                setShowModal(false);
              }}
              className="flex flex-col space-y-4"
            >
              <div>
                <label htmlFor="name" className="block mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="border border-gray-300 p-2 rounded-md w-full"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="border border-gray-300 p-2 rounded-md w-full"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block mb-1">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="border border-gray-300 p-2 rounded-md w-full"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
