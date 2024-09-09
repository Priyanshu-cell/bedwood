import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { Product } from '@/types';
import { sendOrderToWhatsApp } from '@/utils/whatsapp';

interface OrderFormProps {
  cartItems: { product: Product; quantity: number }[];
  onClose: () => void;
  isOpen:  boolean;
}

interface FormData {
  name: string;
  mobileNo: string;
  email: string;
  address: string;
}

export const OrderForm: React.FC<OrderFormProps> = ({ cartItems, onClose }) => {
  const { handleSubmit, control, reset } = useForm<FormData>();
  
  const mutation = useMutation({
    mutationFn: (orderData: { formData: FormData; cartItems: { product: Product; quantity: number }[] }) => {
      const { formData, cartItems } = orderData;
      return sendOrderToWhatsApp(formData, cartItems);
    },
    onSuccess: (res) => {

      alert(JSON.stringify(res));
      reset();
      onClose();
    },
    onError: () => {
      alert('Failed to send the order. Please try again.');
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate({ formData: data, cartItems });
  };

  return (
    <div className="max-w-5xl w-full min-w-xl bg-white shadow-md rounded-lg p-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Order Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Name</label>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => <input {...field} id="name" className="border rounded-md p-2 w-full" />}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="mobileNo" className="block text-gray-700">Mobile Number</label>
          <Controller
            name="mobileNo"
            control={control}
            defaultValue=""
            render={({ field }) => <input {...field} id="mobileNo" className="border rounded-md p-2 w-full" />}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => <input {...field} id="email" className="border rounded-md p-2 w-full" />}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700">Address</label>
          <Controller
            name="address"
            control={control}
            defaultValue=""
            render={({ field }) => <textarea {...field} id="address" className="border rounded-md p-2 w-full" />}
          />
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          <ul className="list-disc ml-5">
            {cartItems.map(({ product, quantity }) => (
              <li key={product.id} className="mb-2">
                <p><strong>{product.name}</strong></p>
                <p>Description: {product.description}</p>
                <p>Price: ${product.price}</p>
                <p>Quantity: {quantity}</p>
              </li>
            ))}
          </ul>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700"
        >
          Submit Order
        </button>
      </form>
    </div>
  );
};


