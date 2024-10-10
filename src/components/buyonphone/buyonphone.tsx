// components/BuyOnPhoneButton.tsx

import Link from 'next/link';
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

export const BuyOnPhoneButton: React.FC = () => {
    const whatsappUrl = `https://wa.me/${"+919675111719"}`;

    return (
        <Link
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-3 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-200"
        >
            <div className='flex flex-col items-center'>
            <FaWhatsapp className="text-3xl" />
            <p className='text-xs px-1'>Buy on </p>
            <p className='text-xs px-1'>Phone </p>
            </div>
        </Link>
    );
};

