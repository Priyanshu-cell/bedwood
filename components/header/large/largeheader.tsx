"use client";
import React, { useEffect, useState } from "react";
import { HeaderLink } from "../links/headerlink";
import Link from "next/link";
import { FaSearch, FaShoppingCart, FaUserTie } from "react-icons/fa";
import { HiOutlineArrowLeft } from "react-icons/hi2";
import { MdMenu } from "react-icons/md";
import { RiMapPinLine } from "react-icons/ri";
import { IoMdHelpCircle } from "react-icons/io";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { cartItemsCountState } from "@/state/atoms/countCartState";
import AssociateForm from "@/form/assiociate";
import { searchState } from "@/state/atoms/searchState"; // Import the search state

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
  const cartItemCount = useRecoilValue(cartItemsCountState);
  const setSearchQuery = useSetRecoilState(searchState); // Set search query state
  const [isFormOpen, setIsFormOpen] = useState(false); // State for form visibility
  const whatsappNumber = "+91 96751 11719"; // Define your WhatsApp number

  // Manage body scroll when sidebar or form is open
  useEffect(() => {
    document.body.style.overflow =
      isSidebarOpen || isFormOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isSidebarOpen, isFormOpen]);

  return (
    <header className="w-full h-auto py-4 px-2 bg-white">
      {/* Desktop View */}
      <div className="hidden md:flex flex-col items-center">
        <div className="flex items-center justify-between w-full max-w-6xl mx-auto">
          {/* Logo */}
          <Link href="/">
            <img src="/logo.png" alt="Logo" className="h-20" />
          </Link>

          {/* Search Bar and Cart & Agent Button */}
          <div className="flex items-center space-x-4 ml-4">
            <div className="relative flex-grow w-64">
              <input
                type="text"
                placeholder="Search..."
                onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
                className="p-1 border border-gray-300 bg-white rounded-md w-full"
              />
              <FaSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 text-2xl" />
            </div>

            {/* Cart Button */}
            <Link
              className="relative flex flex-col items-center justify-center rounded-full"
              href="/cart"
            >
              <FaShoppingCart className="text-gray-600 text-xl mt-2" />
              <span className="absolute -top-1 -right-2 text-xs text-red-500 mt-1">
                {cartItemCount}
              </span>
            </Link>

            {/* Agent Icon */}
            <button
              className="relative flex flex-col items-center justify-center rounded-full"
              onClick={() => setIsFormOpen(true)} // Open form on click
            >
              <FaUserTie className="text-gray-600 text-xl mt-2" />
            </button>
          </div>
        </div>

        {/* Sticky Links Header */}
        <div
          className={`hidden md:block ${
            isScrolled ? "fixed top-0 left-0 w-full border-b bg-white z-40" : ""
          }`}
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
              <MdMenu className="text-gray-600 text-3xl ml-1" />
            </button>

            {/* Logo */}
            <Link href="/">
              <img src="/logo.png" alt="Logo" className="h-16" />
            </Link>
          </div>

          <div className="flex flex-row mr-2 space-x-4">
            {/* Cart Button */}
            <Link
              className="relative flex flex-col items-center justify-center rounded-full"
              href="/cart"
            >
              <FaShoppingCart className="text-gray-600 text-xl mt-2" />
              <span className="absolute -top-1 -right-2 text-xs text-red-500 mt-1">
                {cartItemCount}
              </span>
            </Link>

            {/* Agent Icon */}
            <button
              className="relative flex flex-col items-center justify-center rounded-full"
              onClick={() => setIsFormOpen(true)} // Open form on click
            >
              <FaUserTie className="text-gray-600 text-xl mt-2" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-6xl mx-auto mt-4">
          <div className="relative flex-grow w-full">
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
              className="p-2 border border-gray-300 bg-white rounded-md w-full"
            />
            <FaSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 text-2xl" />
          </div>
        </div>

        {/* Sidebar */}
        <div
          className={`fixed inset-0 bg-gray-200 transform overflow-y-auto pb-10 scroll-smooth ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-500 ease-in-out z-50`}
        >
          <div className="flex items-center justify-center py-2 bg-white">
            {/* Arrow Icon for closing */}
            <button
              className="flex items-center absolute left-0 px-2"
              onClick={() => setIsSidebarOpen(false)}
            >
              <HiOutlineArrowLeft className="text-gray-600 text-2xl" />
            </button>

            {/* Logo */}
            <Link href="/" className="">
              <img src="/logo.png" alt="Logo" className="h-16" />
            </Link>
          </div>
          <hr className="md:hidden border-t border-gray-300 w-full mt-10" />
          <HeaderLink setSideBarOpen={setIsSidebarOpen} />

          {/* Other content */}
          <div className="flex flex-col font-semibold text-gray-700 text-sm mt-4 space-y-4 p-4">
            <button
              className="px-4 flex items-center space-x-4"
              onClick={() => setIsFormOpen(true)} // Open form on click
            >
              <FaUserTie className="text-gray-600 text-lg" />
              <p>Company Associate</p>
            </button>

            <div className="px-4 flex items-center space-x-4">
              <RiMapPinLine className="text-gray-600 text-lg" />
              <p>+91-8630715936 </p>
            </div>
            <div className="px-4 flex items-center space-x-4">
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

        {/* Overlay to prevent scrolling */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-40"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </div>

      {/* Associate Form Popup */}
      {isFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-5 rounded-md shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-600"
              onClick={() => setIsFormOpen(false)}
              aria-label="Close form"
            >
              &times;
            </button>
            <AssociateForm onClose={() => setIsFormOpen(false)} />
          </div>
        </div>
      )}
    </header>
  );
};
