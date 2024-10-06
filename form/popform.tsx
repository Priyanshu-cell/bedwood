import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

// Define the type for the form data
interface PopUpFormData {
  name: string;          // Required
  mobileNo: string;      // Required
  address: string;       // Required
  email?: string;        // Optional
}

// Define the validation schema using Yup
const schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  mobileNo: Yup.string().required('Mobile number is required'),
  address: Yup.string().required('Address is required'),
  email: Yup.string().email('Invalid email format').optional(),
});

export const PopUpForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { control, handleSubmit, formState: { errors } } = useForm<PopUpFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: PopUpFormData) => {
    // Construct WhatsApp message
    const message = `Name: ${data.name}\nMobile No: ${data.mobileNo}\nAddress: ${data.address}${data.email ? `\nEmail: ${data.email}` : ''}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${"+919675111719"}?text=${encodedMessage}`; // Replace with the desired number

    // Open WhatsApp with the message
    window.open(whatsappUrl, '_blank');
    
    onClose(); // Close the popup after submission (optional)
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white flex rounded shadow-md relative m-6" style={{ width: '80%', maxWidth: '800px', height: '400px' }}> {/* Set height to 400px */}
        {/* Image on the left */}
        <div className="w-1/2"> {/* Adjusted to 1/2 */}
          <img
            src="/popup.png"
            alt="Descriptive Alt Text"
            className="w-full h-full object-contain rounded-l"
          />
        </div>

        {/* Form on the right */}
        <div className="w-1/2 p-4 overflow-hidden"> {/* Adjusted to 1/2, padding reduced, overflow hidden */}
          {/* Close icon in the top right corner */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <h2 className="text-lg font-bold mb-4">Welcome To Bedwood Furnitures</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block mb-2">
                Name:
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input {...field} className="border rounded w-full p-1" />
                  )}
                />
              </label>
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>

            <div className="mb-4">
              <label className="block mb-2">
                Mobile No:
                <Controller
                  name="mobileNo"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input {...field} className="border rounded w-full p-1" />
                  )}
                />
              </label>
              {errors.mobileNo && <p className="text-red-500">{errors.mobileNo.message}</p>}
            </div>

            <div className="mb-4">
              <label className="block mb-2">
                Address:
                <Controller
                  name="address"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input {...field} className="border rounded w-full p-1" />
                  )}
                />
              </label>
              {errors.address && <p className="text-red-500">{errors.address.message}</p>}
            </div>

            <div className="mb-4">
              <label className="block mb-2">
                Email (optional):
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input {...field} type="email" className="border rounded w-full p-1" />
                  )}
                />
              </label>
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>

            <button type="submit" className="bg-blue-500 text-white rounded px-2 py-1">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};
