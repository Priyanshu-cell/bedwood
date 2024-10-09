'use client';

import React from 'react';
import Link from 'next/link';
import { IoMdHelpCircle } from 'react-icons/io';

export const CartHeader: React.FC = () => {
  const whatsappNumber = '1234567890'; // Replace with the actual number

  return (
    <header className='w-full h-auto py-4 bg-gray-50 border-b-2'>
      <div className="flex justify-between items-center bg-slate-50 md:px-12">
        {/* Logo */}
        <div className="flex items-center space-x-2 text-sm font-medium">
          <Link href="/">
            <img src="/logo.png" alt="Logo" className="h-16" />
          </Link>
        </div>

        {/* Help Center */}
        <div className="px-4 flex items-center space-x-1">
          <IoMdHelpCircle className="text-gray-500 hover:to-gray-600 text-lg" />
          <a
            href={`https://wa.me/${whatsappNumber.replace(/\s+/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:to-gray-600"
          >
            <p>Help Center</p>
          </a>
        </div>
      </div>
    </header>
  );
};
