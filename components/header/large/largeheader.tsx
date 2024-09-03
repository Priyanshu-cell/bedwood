import React from 'react';
import Link from 'next/link';

export const LargeHeader = () => {
  return (
    <header className="w-full h-auto py-4 px-6 bg-gray-50">
      {/* Upper Section with Logo and Search Bar */}
      <div className="mb-2 flex flex-col items-center">
        <div className="flex flex-col md:flex-row md:items-center justify-between w-full max-w-6xl mx-auto">
          <div className="flex-shrink-0">
            {/* Logo */}
            <img src="/path/to/logo.svg" alt="Logo" className="h-8" />
          </div>
          <div className="flex flex-row items-center space-x-4 mt-2 md:mt-0">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="p-1 border border-gray-300 w-64 md:w-96 bg-white rounded-md"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-600"
                fill="none"
                stroke="currentColor"
              >
                <path d="M21.15 19.74a12 12 0 1 0-1.41 1.41l10.55 10.56 1.41-1.41zM12 22a10 10 0 1 1 10-10 10 10 0 0 1-10 10z" data-name="49-Search"/>
              </svg>
            </div>
            {/* Cart Button with Text Below */}
            <button className="flex flex-col items-center justify-center  rounded-full ">
              <svg
                version="1.1"
                id="shopping_x5F_carts_1_"
                xmlns="http://www.w3.org/2000/svg"
                x="0"
                y="0"
                viewBox="0 0 128 128"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
              >
                <g id="_x31__1_">
                  <path d="M92.1 96c-5.2 0-9.3 4.2-9.3 9.3 0 5.2 4.2 9.3 9.3 9.3s9.3-4.2 9.3-9.3c0-5.1-4.1-9.3-9.3-9.3zm0 16a6.7 6.7 0 1 1 6.7-6.7c0 3.8-3 6.7-6.7 6.7zM41.4 96c-5.2 0-9.3 4.2-9.3 9.3 0 5.2 4.2 9.3 9.3 9.3s9.3-4.2 9.3-9.3c0-5.1-4.2-9.3-9.3-9.3zm0 16a6.7 6.7 0 1 1 6.7-6.7c0 3.8-3 6.7-6.7 6.7zm86.2-73.5c-.5-.8-1.3-1.2-2.2-1.2h-102L19 15.4c-.3-1.2-1.3-2.1-2.6-2.1H2.7C1.2 13.3 0 14.5 0 16c0 1.5 1.2 2.7 2.7 2.7h11.4l14.6 72.6c.3 1.2 1.3 2.1 2.6 2.1h72.2c1.1 0 2-.6 2.4-1.6L127.8 41c.3-.8.3-1.7-.2-2.5zM101.7 88H33.5l-2.7-13.3h76.7L101.7 88zm6.9-16H30.3l-2.7-13.3h86.8L108.6 72zm6.9-16H27l-2.7-13.3h96.9L115.5 56z"/>
                </g>
              </svg>
              <span className="text-xs text-gray-600 mt-1">Cart</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Lower Section with Links */}
      <div className="flex flex-col items-center">
        <nav className="flex flex-wrap justify-center text-sm w-full max-w-7xl mx-auto">
          <Link href="/sofas" className="mx-2 md:mx-4 mt-2 text-gray-600 hover:text-gray-900">
            Sofas
          </Link>
          <Link href="/living" className="mx-2 md:mx-4 mt-2 text-gray-600 hover:text-gray-900">
            Living
          </Link>
          <Link href="/bedroom" className="mx-2 md:mx-4 mt-2 text-gray-600 hover:text-gray-900">
            Bedroom
          </Link>
          <Link href="/dining-kitchen" className="mx-2 md:mx-4 mt-2 text-gray-600 hover:text-gray-900">
            Dining & Kitchen
          </Link>
          <Link href="/storage" className="mx-2 md:mx-4 mt-2 text-gray-600 hover:text-gray-900">
            Storage
          </Link>
          <Link href="/study-office" className="mx-2 md:mx-4 mt-2 text-gray-600 hover:text-gray-900">
            Study & Office
          </Link>
          <Link href="/mattresses" className="mx-2 md:mx-4 mt-2 text-gray-600 hover:text-gray-900">
            Mattresses
          </Link>
          <Link href="/decor" className="mx-2 md:mx-4 mt-2 text-gray-600 hover:text-gray-900">
            Decor
          </Link>
          <Link href="/lamps-lighting" className="mx-2 md:mx-4 mt-2 text-gray-600 hover:text-gray-900">
            Lamps & Lighting
          </Link>
          <Link href="/furnishings" className="mx-2 md:mx-4 mt-2 text-gray-600 hover:text-gray-900">
            Furnishings
          </Link>
          <Link href="/outdoor" className="mx-2 md:mx-4 mt-2 text-gray-600 hover:text-gray-900">
            Outdoor
          </Link>
          <Link href="/ws-value" className="mx-2 md:mx-4 mt-2 text-gray-600 hover:text-gray-900">
            WS Value
          </Link>
        </nav>
      </div>
    </header>
  );
};
