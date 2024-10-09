import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRecoilState } from 'recoil';
import { associateAtom } from '@/src/state';
import { useMutation } from '@tanstack/react-query';
import { TAssociate } from '@/src/services/assiociate/assiociate.type';
import { associatePost } from '@/src/services/assiociate';

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
    },
  });

  // Ensure onSubmit does not return anything
  const onSubmit = async (data: TAssociate): Promise<void> => {
    setAssociateData(data);
    await mutation.mutateAsync(data); // Ensure mutateAsync is awaited for better handling
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="bg-white pt-6 pb-12 px-8 rounded-md shadow-lg md:w-1/3 w-full m-2 relative transition-transform transform scale-95 hover:scale-100 duration-300 ease-out">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-2xl transition-colors"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-lg font-semibold mb-6 text-center text-indigo-600">
          Become a Company Associate!
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="text-sm space-y-4">
          <div className="flex gap-4">
            <div className="w-1/2">
              <label htmlFor="firstName" className="block text-gray-700 mb-1 font-bold">
                First Name
              </label>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <input
                    id="firstName"
                    type="text"
                    {...field}
                    className="border border-gray-300 rounded-md p-2 w-full focus:ring focus:ring-indigo-300 focus:outline-none"
                  />
                )}
              />
              <p className="text-red-500 text-xs">{errors.firstName?.message}</p>
            </div>
            <div className="w-1/2">
              <label htmlFor="lastName" className="block text-gray-700 mb-1 font-bold">
                Last Name
              </label>
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <input
                    id="lastName"
                    type="text"
                    {...field}
                    className="border border-gray-300 rounded-md p-2 w-full focus:ring focus:ring-indigo-300 focus:outline-none"
                  />
                )}
              />
              <p className="text-red-500 text-xs">{errors.lastName?.message}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label htmlFor="phone" className="block text-gray-700 mb-1 font-bold">
                Phone Number
              </label>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <input
                    id="phone"
                    type="text"
                    {...field}
                    className="border border-gray-300 rounded-md p-2 w-full focus:ring focus:ring-indigo-300 focus:outline-none"
                  />
                )}
              />
              <p className="text-red-500 text-xs">{errors.phone?.message}</p>
            </div>
            <div className="w-1/2">
              <label htmlFor="email" className="block text-gray-700 mb-1 font-bold">
                Email
              </label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <input
                    id="email"
                    type="email"
                    {...field}
                    className="border border-gray-300 rounded-md p-2 w-full focus:ring focus:ring-indigo-300 focus:outline-none"
                  />
                )}
              />
              <p className="text-red-500 text-xs">{errors.email?.message}</p>
            </div>
          </div>

          <div>
            <label htmlFor="qualification" className="block text-gray-700 mb-1 font-bold">
              Qualification
            </label>
            <Controller
              name="qualification"
              control={control}
              render={({ field }) => (
                <input
                  id="qualification"
                  type="text"
                  {...field}
                  className="border border-gray-300 rounded-md p-2 w-full focus:ring focus:ring-indigo-300 focus:outline-none"
                />
              )}
            />
            <p className="text-red-500 text-xs">{errors.qualification?.message}</p>
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label htmlFor="age" className="block text-gray-700 mb-1 font-bold">
                Age
              </label>
              <Controller
                name="age"
                control={control}
                render={({ field }) => (
                  <input
                    id="age"
                    type="number"
                    {...field}
                    className="border border-gray-300 rounded-md p-2 w-full focus:ring focus:ring-indigo-300 focus:outline-none"
                  />
                )}
              />
              <p className="text-red-500 text-xs">{errors.age?.message}</p>
            </div>
            <div className="w-1/2">
              <label htmlFor="occupation" className="block text-gray-700 mb-1 font-bold">
                Occupation
              </label>
              <Controller
                name="occupation"
                control={control}
                render={({ field }) => (
                  <input
                    id="occupation"
                    type="text"
                    {...field}
                    className="border border-gray-300 rounded-md p-2 w-full focus:ring focus:ring-indigo-300 focus:outline-none"
                  />
                )}
              />
              <p className="text-red-500 text-xs">{errors.occupation?.message}</p>
            </div>
          </div>

          <div>
            <label htmlFor="address" className="block text-gray-700 mb-1 font-bold">
              Address
            </label>
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <input
                  id="address"
                  type="text"
                  {...field}
                  className="border border-gray-300 rounded-md p-2 w-full focus:ring focus:ring-indigo-300 focus:outline-none"
                />
              )}
            />
            <p className="text-red-500 text-xs">{errors.address?.message}</p>
          </div>

          <div>
            <label htmlFor="country" className="block text-gray-700 mb-1 font-bold">
              Country
            </label>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <input
                  id="country"
                  type="text"
                  {...field}
                  className="border border-gray-300 rounded-md p-2 w-full focus:ring focus:ring-indigo-300 focus:outline-none"
                />
              )}
            />
            <p className="text-red-500 text-xs">{errors.country?.message}</p>
          </div>

          <button
            type="submit"
            className="bg-indigo-600 text-white w-full p-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AssociateForm;
