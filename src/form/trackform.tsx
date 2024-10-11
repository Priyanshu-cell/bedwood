import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

// Define the type for the form data
interface TrackFormData {
  name: string;          
  mobileNo: string;      
  token: string;  
  address: string;      
}

// Define the validation schema using Yup
const schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  mobileNo: Yup.string().required('Mobile number is required'),
  token: Yup.string().required('Token number is required'),
  address: Yup.string().required('Address is required'),
});

export const TrackForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { control, handleSubmit, formState: { errors } } = useForm<TrackFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: TrackFormData) => {
    // Construct WhatsApp message with the custom introductory message
    const message = `I want to enquire about my order\n\nName: ${data.name}\nMobile No: ${data.mobileNo}\nToken: ${data.token}\nAddress: ${data.address}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/8630715936?text=${encodedMessage}`; // Replace with the desired number

    // Open WhatsApp with the message
    window.open(whatsappUrl, '_blank');
    
    onClose(); // Close the popup after submission (optional)
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white flex flex-col md:flex-row rounded shadow-md relative m-6" style={{ width: '90%', maxWidth: '800px', height: 'auto', minHeight: '200px' }}>
        
        {/* Image on the left side */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-4">
          <img src="/home/banner-tracking.png" alt="Track" className="object-cover rounded-lg ml-4" style={{ maxHeight: 'full', width: 'full' }} />
        </div>

        {/* Form on the right */}
        <div className="w-full md:w-1/2 p-4 overflow-hidden flex flex-col items-center justify-center">
          {/* Close icon in the top right corner */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-900"
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

          <h2 className="text-lg text-orange-400 font-bold mb-4 text-center">Welcome To Bedwood Furnitures</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center"> 
            {/* Name Input */}
            <div className="w-full mb-2">
              <label className="block mb-1 text-sm">
                Name:
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input {...field} className="border-2 border-gray-300 rounded-md w-full p-1 text-sm" />
                  )}
                />
              </label>
              {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
            </div>

            {/* Mobile No and Token Input Side by Side */}
            <div className="flex w-full mb-2 space-x-2"> {/* Flex container for side by side */}
              {/* Mobile No Input */}
              <div className="w-full">
                <label className="block mb-1 text-sm">
                  Mobile No:
                  <Controller
                    name="mobileNo"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input {...field} className="border-2 border-gray-300 rounded-md w-full p-1 text-sm" />
                    )}
                  />
                </label>
                {errors.mobileNo && <p className="text-red-500 text-xs">{errors.mobileNo.message}</p>}
              </div>

              {/* Token Input */}
              <div className="w-full">
                <label className="block mb-1 text-sm">
                  Token:
                  <Controller
                    name="token"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input {...field} className="border-2 border-gray-300 rounded-md w-full p-1 text-sm" />
                    )}
                  />
                </label>
                {errors.token && <p className="text-red-500 text-xs">{errors.token.message}</p>}
              </div>
            </div>

            {/* Address Input spanning 3 rows */}
            <div className="w-full mb-2">
              <label className="block mb-1 text-sm">
                Address:
                <Controller
                  name="address"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <textarea {...field} className="border-2 border-gray-300 rounded-md w-full p-1 text-sm h-24 resize-none" />
                  )}
                />
              </label>
              {errors.address && <p className="text-red-500 text-xs">{errors.address.message}</p>}
            </div>

            {/* Submit button aligned to the left */}
            <div className="w-full flex justify-start"> {/* Align left */}
              <button type="submit" className="bg-orange-500 text-sm text-white rounded px-4 py-2">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
