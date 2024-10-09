import React from 'react';
import { MapPinIcon } from '@heroicons/react/24/outline'; // Import the Heroicon
import { IoMdHelpCircle } from 'react-icons/io';
import { MdMobileFriendly } from 'react-icons/md';

export const SmallHeader = () => {
  const whatsappNumber = "+91 96751 11719"; // Define your WhatsApp number

  return (
    <header className="w-full h-auto p-4 md:px-44 bg-inherit flex flex-col md:flex-row md:items-center justify-between">
      {/* Location Section with Icon */}
      <div className="flex flex-row items-center text-base text-gray-800">
        {/* Location Marker Heroicon */}
        <MapPinIcon className="h-5 w-5 text-gray-800 mr-2" />
        <p className="font-semibold">Location - </p>
        <p className="text-sm md:pl-1 font-medium">Kotdwar</p>
      </div>

      {/* Contact and Info Section */}
      <div className="flex flex-col md:flex-row text-gray-600 text-sm mt-2 md:mt-0 space-y-2 md:space-y-0 md:divide-x-2 divide-gray-600">
      <div className="px-4 flex items-center space-x-2">
              <MdMobileFriendly className="text-gray-600 text-lg" />
              <p>+91-8630715936 </p>
            </div>
        <div className="md:px-2 px-6">
        <div className="flex items-center space-x-2">
              <IoMdHelpCircle className="text-gray-600 text-lg" />
              <a
                href={`https://wa.me/${whatsappNumber.replace(/\s+/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600"
              >
                <p>Help Center</p>
              </a>
            </div>
        </div>
      </div>
    </header>
  );
};
