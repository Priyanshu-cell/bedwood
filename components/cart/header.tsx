'use client'

import React from 'react';
import { HomeIcon,ListBulletIcon  } from '@heroicons/react/24/outline';
import Link from 'next/link';

export const CartHeader: React.FC = () => {
  

  return (
    <header className="flex justify-between items-center p-4 bg-slate-50 ">
      <Link
       href='/'
        className="flex items-center space-x-2 text-sm font-medium hover:text-gray-400"
      >
        <HomeIcon className="h-6 w-6" aria-hidden="true" />
        <span>Back to Home</span>
      </Link>
      <Link
       href='/productlist'
        className="flex items-center space-x-2 text-sm font-medium hover:text-gray-400"
      >
        <ListBulletIcon className="h-6 w-6" aria-hidden="true" />
        <span>Products</span>
      </Link>
    </header>
  );
};
