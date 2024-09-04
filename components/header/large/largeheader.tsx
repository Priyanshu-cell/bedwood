import React, { useEffect } from 'react';
import { HeaderLink } from '../links/headerlink';

interface LargeHeaderProps {
  isScrolled: boolean;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

export const LargeHeader: React.FC<LargeHeaderProps> = ({
  isScrolled,
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  // Manage body scroll when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isSidebarOpen]);

  return (
    <header className="w-full h-auto py-4 px-2 bg-gray-50">
      {/* Desktop View */}
      <div className="hidden md:flex flex-col items-center">
        <div className="flex items-center justify-between w-full max-w-6xl mx-auto">
          {/* Logo */}
          <img src="/path/to/logo.svg" alt="Logo" className="h-8" />

          {/* Search Bar and Cart Button */}
          <div className="flex items-center space-x-4 ml-4">
            <div className="relative flex-grow w-64">
              <input
                type="text"
                placeholder="Search..."
                className="p-1 border border-gray-300 bg-white rounded-md w-full"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-600"
                fill="none"
                stroke="currentColor"
              >
                <path d="M21.15 19.74a12 12 0 1 0-1.41 1.41l10.55 10.56 1.41-1.41zM12 22a10 10 0 1 1 10-10 10 10 0 0 1-10 10z" />
              </svg>
            </div>

            {/* Cart Button */}
            <button className="flex flex-col items-center justify-center rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 128 128"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
              >
                <path d="M92.1 96c-5.2 0-9.3 4.2-9.3 9.3 0 5.2 4.2 9.3 9.3 9.3s9.3-4.2 9.3-9.3c0-5.1-4.1-9.3-9.3-9.3zm0 16a6.7 6.7 0 1 1 6.7-6.7c0 3.8-3 6.7-6.7 6.7zM41.4 96c-5.2 0-9.3 4.2-9.3 9.3 0 5.2 4.2 9.3 9.3 9.3s9.3-4.2 9.3-9.3c0-5.1-4.2-9.3-9.3-9.3zm0 16a6.7 6.7 0 1 1 6.7-6.7c0 3.8-3 6.7-6.7 6.7zm86.2-73.5c-.5-.8-1.3-1.2-2.2-1.2h-102L19 15.4c-.3-1.2-1.3-2.1-2.6-2.1H2.7C1.2 13.3 0 14.5 0 16c0 1.5 1.2 2.7 2.7 2.7h11.4l14.6 72.6c.3 1.2 1.3 2.1 2.6 2.1h72.2c1.1 0 2-.6 2.4-1.6L127.8 41c.3-.8.3-1.7-.2-2.5zM101.7 88H33.5l-2.7-13.3h76.7L101.7 88zm6.9-16H30.3l-2.7-13.3h86.8L108.6 72zm6.9-16H27l-2.7-13.3h96.9L115.5 56z" />
              </svg>
              <span className="text-xs text-gray-600 mt-1">Cart</span>
            </button>
          </div>
        </div>
        {/* Sticky Links Header */}
        <div
          className={`${
            isScrolled ? 'fixed top-0 left-0 w-full shadow-lg bg-white z-50' : ''
          } hidden md:block`}
        >
          <HeaderLink />
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex flex-col items-center">
        <div className="flex items-center w-full max-w-6xl mx-auto justify-between">
          <div className="flex items-center">
            {/* Hamburger Icon */}
            <button
              className="flex items-center"
              onClick={() => setIsSidebarOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Logo */}
            <img src="/path/to/logo.svg" alt="Logo" className="h-8 mx-2" />
          </div>

          {/* Cart Button */}
          <button className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 128 128"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
            >
              <path d="M92.1 96c-5.2 0-9.3 4.2-9.3 9.3 0 5.2 4.2 9.3 9.3 9.3s9.3-4.2 9.3-9.3c0-5.1-4.1-9.3-9.3-9.3zm0 16a6.7 6.7 0 1 1 6.7-6.7c0 3.8-3 6.7-6.7 6.7zM41.4 96c-5.2 0-9.3 4.2-9.3 9.3 0 5.2 4.2 9.3 9.3 9.3s9.3-4.2 9.3-9.3c0-5.1-4.2-9.3-9.3-9.3zm0 16a6.7 6.7 0 1 1 6.7-6.7c0 3.8-3 6.7-6.7 6.7zm86.2-73.5c-.5-.8-1.3-1.2-2.2-1.2h-102L19 15.4c-.3-1.2-1.3-2.1-2.6-2.1H2.7C1.2 13.3 0 14.5 0 16c0 1.5 1.2 2.7 2.7 2.7h11.4l14.6 72.6c.3 1.2 1.3 2.1 2.6 2.1h72.2c1.1 0 2-.6 2.4-1.6L127.8 41c.3-.8.3-1.7-.2-2.5zM101.7 88H33.5l-2.7-13.3h76.7L101.7 88zm6.9-16H30.3l-2.7-13.3h86.8L108.6 72zm6.9-16H27l-2.7-13.3h96.9L115.5 56z" />
            </svg>
          </button>
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-6xl mx-auto mt-4">
          <div className="relative flex-grow w-full">
            <input
              type="text"
              placeholder="Search..."
              className="p-2 border border-gray-300 bg-white rounded-md w-full"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-600"
              fill="none"
              stroke="currentColor"
            >
              <path d="M21.15 19.74a12 12 0 1 0-1.41 1.41l10.55 10.56 1.41-1.41zM12 22a10 10 0 1 1 10-10 10 10 0 0 1-10 10z" />
            </svg>
          </div>
        </div>

        {/* Sidebar */}
        <div
          className={`fixed inset-0 bg-white transform ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-500 ease-in-out z-50`}
          style={{ overflow: 'hidden' }}
        >
          <div className="flex items-center p-4">
            {/* Arrow SVG for closing */}
            <button
              className="flex items-center mr-4"
              onClick={() => setIsSidebarOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-8 h-7"
                fill="none"
                stroke="currentColor"
              >
                <path d="M19 13H5m7-7l-7 7 7 7" />
              </svg>
            </button>

            {/* Logo */}
            <img src="/path/to/logo.svg" alt="Logo" className="h-8" />
          </div>
          <hr className="md:hidden border-t border-gray-300 w-full mt-4" />
          <HeaderLink  />
        </div>

        {/* Overlay to prevent scrolling */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-40"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </div>
    </header>
  );
};
