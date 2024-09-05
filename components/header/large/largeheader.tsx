import React, { useEffect } from "react";
import { HeaderLink } from "../links/headerlink";
import Link from "next/link";

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
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
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
            <Link className="flex flex-col items-center justify-center rounded-full"
            href='/cart'>
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
            </Link>
          </div>
        </div>
        {/* Sticky Links Header */}
        <div
          className={`${
            isScrolled
              ? "fixed top-0 left-0 w-full shadow-lg bg-white z-50"
              : ""
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Logo */}
            <img src="/path/to/logo.svg" alt="Logo" className="h-8 mx-2" />
          </div>

          {/* Cart Button */}
          <Link className="flex items-center"
          href="/cart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 128 128"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
            >
              <path d="M92.1 96c-5.2 0-9.3 4.2-9.3 9.3 0 5.2 4.2 9.3 9.3 9.3s9.3-4.2 9.3-9.3c0-5.1-4.1-9.3-9.3-9.3zm0 16a6.7 6.7 0 1 1 6.7-6.7c0 3.8-3 6.7-6.7 6.7zM41.4 96c-5.2 0-9.3 4.2-9.3 9.3 0 5.2 4.2 9.3 9.3 9.3s9.3-4.2 9.3-9.3c0-5.1-4.2-9.3-9.3-9.3zm0 16a6.7 6.7 0 1 1 6.7-6.7c0 3.8-3 6.7-6.7 6.7zm86.2-73.5c-.5-.8-1.3-1.2-2.2-1.2h-102L19 15.4c-.3-1.2-1.3-2.1-2.6-2.1H2.7C1.2 13.3 0 14.5 0 16c0 1.5 1.2 2.7 2.7 2.7h11.4l14.6 72.6c.3 1.2 1.3 2.1 2.6 2.1h72.2c1.1 0 2-.6 2.4-1.6L127.8 41c.3-.8.3-1.7-.2-2.5zM101.7 88H33.5l-2.7-13.3h76.7L101.7 88zm6.9-16H30.3l-2.7-13.3h86.8L108.6 72zm6.9-16H27l-2.7-13.3h96.9L115.5 56z" />
            </svg>
          </Link>
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
          className={`fixed inset-0 bg-gray-200 transform overflow-y-auto pb-10 scroll-smooth ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-500 ease-in-out z-50`}
        >
          <div className="flex items-center pt-4 bg-white">
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
          <hr className="md:hidden border-t border-gray-300 w-full mt-10" />
          <HeaderLink />

          {/* other content */}
          <div className="flex flex-col font-semibold text-gray-700 text-sm mt-4 space-y-4 p-4">
            <div className=" px-4 flex items-center space-x-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                viewBox="0 0 24 24"
              >
                <path d="M18.48 22.926l-1.193.658c-6.979 3.621-19.082-17.494-12.279-21.484l1.145-.637 3.714 6.467-1.139.632c-2.067 1.245 2.76 9.707 4.879 8.545l1.162-.642 3.711 6.461zm-9.808-22.926l-1.68.975 3.714 6.466 1.681-.975-3.715-6.466zm8.613 14.997l-1.68.975 3.714 6.467 1.681-.975-3.715-6.467z" />
              </svg>
              <p>+91-1111111111</p>
            </div>
            <div className=" px-4 flex items-center space-x-4">
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill-rule="evenodd"
                clip-rule="evenodd"
              >
                <path d="M16.533 14.322l-.061.678h4.304c.146-.643.224-1.313.224-2l-.004-.243.987-1.56.649-1.024c.24.902.368 1.85.368 2.827 0 6.071-4.929 11-11 11-2.642 0-5.067-.933-6.964-2.487.617-.314 1.152-.765 1.564-1.314.891.669 1.91 1.178 3.013 1.481l-.084-.16c-.544-1.045-.994-2.138-1.336-3.265l-.061-.208 1.847-.819c.081.299.171.596.27.891.353 1.058.815 2.079 1.365 3.049.124.219.253.434.386.647.246-.399.48-.804.696-1.219.487-.935.89-1.912 1.196-2.921.068-.223.131-.448.189-.675h-3.587l6.039-2.678zm3.53 2.678h-3.926c-.133.592-.297 1.177-.489 1.753-.338 1.009-.762 1.988-1.262 2.927 2.489-.684 4.548-2.411 5.677-4.68zm-.814-7.711c-1.521-2.411-2.583-4.232-2.583-5.805 0-1.924 1.743-3.484 3.667-3.484 1.925 0 3.667 1.56 3.667 3.484s-1.59 4.221-3.667 7.516l-.002-.003-14.332 6.355.001.074c0 1.656-1.345 3-3 3-1.656 0-3-1.344-3-3s1.344-3 3-3c.914 0 1.733.41 2.283 1.055l13.966-6.192zm-16.026 1.711c-.142.623-.218 1.271-.223 1.936v.064c-.715 0-1.391.167-1.991.464l-.009-.464c0-6.071 4.929-11 11-11 1.139 0 2.238.174 3.272.496-.042.195-.072.394-.089.593-.044.517.001 1.029.105 1.532-.304-.12-.616-.223-.935-.31l.183.359c.578 1.157 1.048 2.37 1.39 3.618l.186.75-4.396 1.962h-2.155c-.044.332-.078.666-.101 1l-2.037.903c.007-.636.048-1.271.122-1.903h-4.322zm6.423-6.689c-2.503.678-4.576 2.41-5.71 4.689h3.958c.094-.408.202-.812.324-1.213.364-1.201.847-2.364 1.428-3.476zm2.353-.104c-.265.443-.516.894-.746 1.356-.52 1.041-.943 2.13-1.25 3.253l-.05.184h4.093c-.069-.262-.144-.523-.225-.781-.351-1.121-.817-2.205-1.377-3.237-.142-.262-.291-.52-.445-.775zm8.334.835c-.759 0-1.375-.616-1.375-1.375 0-.76.616-1.375 1.375-1.375s1.375.615 1.375 1.375c0 .759-.616 1.375-1.375 1.375z" />
              </svg>
              <p>Track</p>
            </div>
            <div className=" px-4 flex items-center space-x-4">
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill-rule="evenodd"
                clip-rule="evenodd"
              >
                <path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm.053 17c.466 0 .844-.378.844-.845 0-.466-.378-.844-.844-.844-.466 0-.845.378-.845.844 0 .467.379.845.845.845zm.468-2.822h-.998c-.035-1.162.182-2.054.939-2.943.491-.57 1.607-1.479 1.945-2.058.722-1.229.077-3.177-2.271-3.177-1.439 0-2.615.877-2.928 2.507l-1.018-.102c.28-2.236 1.958-3.405 3.922-3.405 1.964 0 3.615 1.25 3.615 3.22 0 1.806-1.826 2.782-2.638 3.868-.422.563-.555 1.377-.568 2.09z" />
              </svg>
              <p>Help Center</p>
            </div>
          </div>
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
