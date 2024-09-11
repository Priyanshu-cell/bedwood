'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { generateWhatsAppMessage } from '@/utils/whatsappUtils'; 
import { Product } from '@/types';

interface WhatsAppCheckoutProps {
  cartItems: { product: Product; quantity: number }[];
  onCheckoutComplete?: () => void; // Optional callback when checkout is complete
}

// Define the schema using Yup
const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  phone: yup.string().matches(/^\d{10}$/, 'Phone number must be exactly 10 digits').required('Phone number is required'),
});

export const WhatsAppCheckout: React.FC<WhatsAppCheckoutProps> = ({ cartItems, onCheckoutComplete }) => {
  const [showModal, setShowModal] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
    resolver: yupResolver(schema),
  });

  const handleCheckout = (data: { name: string; email: string; phone: string }) => {
    const whatsappLink = generateWhatsAppMessage(cartItems, data);
    window.open(whatsappLink);
    if (onCheckoutComplete) onCheckoutComplete();
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="text-white"
      >
        Checkout via WhatsApp
      </button>

      {/* Modal for form */}
      {showModal && (
        <div className="fixed inset-0 text-black bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 ">
          <div className="bg-white p-6 rounded-md shadow-lg relative w-full max-w-md m-4">
            <button
              onClick={() => setShowModal(false)}
              className="absolute text-3xl top-2 right-3 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Complete Your Purchase</h2>
            <form
              onSubmit={handleSubmit(handleCheckout)}
              className="flex flex-col space-y-4"
            >
              <div>
                <label htmlFor="name" className="block mb-1">Name</label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      id="name"
                      {...field}
                      className="border border-gray-300 p-2 rounded-md w-full"
                    />
                  )}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block mb-1">Email</label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="email"
                      id="email"
                      {...field}
                      className="border border-gray-300 p-2 rounded-md w-full"
                    />
                  )}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>
              <div>
                <label htmlFor="phone" className="block mb-1">Phone</label>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="tel"
                      id="phone"
                      {...field}
                      className="border border-gray-300 p-2 rounded-md w-full"
                    />
                  )}
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
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
