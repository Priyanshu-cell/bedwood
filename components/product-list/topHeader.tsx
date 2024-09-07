// components/topHeader.tsx
import React from 'react';
import Link from 'next/link';
import { FaHome } from 'react-icons/fa'; 

export const TopHeader: React.FC = () => {
  return (
    <div className="flex items-center bg-transparent">
      <Link href="/" 
        className="flex items-center justify-center m-4">
          <FaHome className="h-8 w-8 text-gray-800 hover:text-gray-600" />
      </Link>
    </div>
  );
};
