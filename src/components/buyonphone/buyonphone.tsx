import Link from 'next/link';
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

export const BuyOnPhoneButton: React.FC = () => {
    const defaultMessage = encodeURIComponent("Hello, I'm interested in your products!");
    const whatsappUrl = `https://wa.me/${"+918630715936"}?text=${defaultMessage}`;

    return (
        <Link
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center p-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-200"
        >
            <div className='flex flex-col items-center'>
                <FaWhatsapp className="text-3xl" />
            </div>
        </Link>
    );
};
