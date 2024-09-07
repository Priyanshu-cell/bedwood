'use client'

import React from 'react';

export const CartHeader: React.FC = () => {
  return (
    <header className='w-full h-auto py-4 px-2 bg-gray-50 border-b-2' >
      <div className="flex justify-between items-center  bg-slate-50 md:px-44">
        {/* Logo */}
      <div className="flex items-center space-x-2 text-sm font-medium">
        <span className="text-lg font-bold">YourLogo</span>
      </div>
      
      {/* Contact Information */}
      <div className="flex items-center space-x-2 text-md font-medium">
        <span>Contact Us</span>
      </div>
      </div>
    </header>
  );
};
