import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRecoilState } from 'recoil';
import { associateAtom } from '@/state';
import { useMutation } from '@tanstack/react-query';
import { TAssociate } from '@/services/assiociate/assiociate.type';
import { associatePost } from '@/services/assiociate';

// Yup schema for form validation
const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  phone: yup
    .string()
    .matches(/^\d{10}$/, 'Must be exactly 10 digits')
    .required('Phone number is required'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  qualification: yup.string().required('Qualification is required'),
  age: yup
    .number()
    .positive('Age must be a positive number')
    .integer('Age must be an integer')
    .required('Age is required'),
  occupation: yup.string().required('Occupation is required'),
  address: yup.string().required('Address is required'),
  country: yup.string().required('Country is required'),
});

const AssociateForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { control, handleSubmit, formState: { errors } } = useForm<TAssociate>({
    resolver: yupResolver(schema),
  });

  const [associateData, setAssociateData] = useRecoilState(associateAtom);

  // Define the mutation using TanStack Query
  const mutation = useMutation({
    mutationFn: associatePost,
    onSuccess: () => {
      console.log('Form Data submitted successfully');
      onClose(); // Close the form upon success
    },
    onError: (error) => {
      console.error('Error saving data:', error);
      // Handle the error appropriately
    },
  });

  // Ensure onSubmit does not return anything
  const onSubmit = async (data: TAssociate): Promise<void> => {
    setAssociateData(data);
    await mutation.mutateAsync(data); // Ensure mutateAsync is awaited for better handling
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white pt-4 pb-10 px-6 rounded-lg shadow-md md:w-1/2 w-full m-4 relative">
        <button onClick={onClose} className="absolute top-0 right-2 text-gray-500 text-3xl">
          &times;
        </button>
        <h2 className="text-lg font-semibold mb-4 text-center">Become a Company Associate!</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="text-sm">
          <div className="mb-2">
            <label className="block mb-1">First Name</label>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <input type="text" {...field} className="border rounded p-1 w-full text-sm" />
              )}
            />
            <p className="text-red-500 text-xs">{errors.firstName?.message}</p>
          </div>

          <div className="mb-2">
            <label className="block mb-1">Last Name</label>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <input type="text" {...field} className="border rounded p-1 w-full text-sm" />
              )}
            />
            <p className="text-red-500 text-xs">{errors.lastName?.message}</p>
          </div>

          <div className="mb-2">
            <label className="block mb-1">Phone Number</label>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <input type="text" {...field} className="border rounded p-1 w-full text-sm" />
              )}
            />
            <p className="text-red-500 text-xs">{errors.phone?.message}</p>
          </div>

          <div className="mb-2">
            <label className="block mb-1">Email</label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <input type="email" {...field} className="border rounded p-1 w-full text-sm" />
              )}
            />
            <p className="text-red-500 text-xs">{errors.email?.message}</p>
          </div>

          <div className="mb-2">
            <label className="block mb-1">Qualification</label>
            <Controller
              name="qualification"
              control={control}
              render={({ field }) => (
                <input type="text" {...field} className="border rounded p-1 w-full text-sm" />
              )}
            />
            <p className="text-red-500 text-xs">{errors.qualification?.message}</p>
          </div>

          <div className="mb-2">
            <label className="block mb-1">Age</label>
            <Controller
              name="age"
              control={control}
              render={({ field }) => (
                <input type="number" {...field} className="border rounded p-1 w-full text-sm" />
              )}
            />
            <p className="text-red-500 text-xs">{errors.age?.message}</p>
          </div>

          <div className="mb-2">
            <label className="block mb-1">Occupation</label>
            <Controller
              name="occupation"
              control={control}
              render={({ field }) => (
                <input type="text" {...field} className="border rounded p-1 w-full text-sm" />
              )}
            />
            <p className="text-red-500 text-xs">{errors.occupation?.message}</p>
          </div>

          <div className="mb-2">
            <label className="block mb-1">Address</label>
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <input type="text" {...field} className="border rounded p-1 w-full text-sm" />
              )}
            />
            <p className="text-red-500 text-xs">{errors.address?.message}</p>
          </div>

          <div className="mb-2">
            <label className="block mb-1">Country</label>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <input type="text" {...field} className="border rounded p-1 w-full text-sm" />
              )}
            />
            <p className="text-red-500 text-xs">{errors.country?.message}</p>
          </div>

          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-24 text-sm">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AssociateForm;
