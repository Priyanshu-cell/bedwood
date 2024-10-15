"use client";
import React, { useEffect, useState } from "react";
import { HeaderLink } from "../links/headerlink";
import Link from "next/link";
import { FaSearch, FaShoppingCart, FaUserTie, FaTimes } from "react-icons/fa";
import { HiOutlineArrowLeft } from "react-icons/hi2";
import { MdMenu, MdMobileFriendly } from "react-icons/md";
import { RiMapPinLine } from "react-icons/ri";
import { IoMdHelpCircle } from "react-icons/io";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { cartItemsCountState } from "@/src/state/atoms/countCartState";

import { searchState } from "@/src/state/atoms/searchState";
import { getProductsList } from "@/src/services/product";
import { TProduct } from "@/src/services/product/product.type";
import AssociateForm from "@/src/form/assiociate";
import { TrackForm } from "@/src/form/trackform";
import { ImTruck } from "react-icons/im";
import SearchBar from "./searchbar";

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
  const setSearchQuery = useSetRecoilState(searchState);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isTrackFormOpen, setIsTrackFormOpen] = useState(false); // State for Track Form
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState<TProduct[]>([]);
  const [noResults, setNoResults] = useState(false);
  const whatsappNumber = "+91 96751 11719";

  // Manage body scroll when sidebar or forms are open
  useEffect(() => {
    document.body.style.overflow =
      isSidebarOpen || isFormOpen || isTrackFormOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isSidebarOpen, isFormOpen, isTrackFormOpen]);

  // Fetch product suggestions based on the search input
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchValue) {
        const products = await getProductsList(); 
        const filteredSuggestions = products.data.filter((product) =>
          product.name.toLowerCase().includes(searchValue.toLowerCase())
        );

        setSuggestions(filteredSuggestions);
        setNoResults(filteredSuggestions.length === 0);
      } else {
        setSuggestions([]);
        setNoResults(false);
      }
    };

    fetchSuggestions();
  }, [searchValue]);

  const handleSearch = () => {
    setSearchQuery(searchValue);
    setSearchValue("");
    setSuggestions([]);
    if (searchValue) {
      window.location.href = `/productlist?query=${encodeURIComponent(searchValue)}`;
    }
  };

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
            <SearchBar onSearch={(query) => {
              window.location.href = `/productlist?query=${encodeURIComponent(query)}`;
            }} />

            {/* Cart Button */}
            <Link
              className="relative flex flex-col items-center justify-center rounded-full pb-2"
              href="/cart"
            >
              <FaShoppingCart className="text-gray-600 text-xl mt-2" />
              <span className="absolute -top-1 -right-2 text-xs text-red-500 mt-1">
                {cartItemCount}
              </span>
            </Link>

            {/* Agent Icon */}
            <button
              className="relative flex flex-col items-center justify-center rounded-full pb-2"
              onClick={() => setIsFormOpen(true)} // Open form on click
            >
              <FaUserTie className="text-gray-600 text-xl mt-2" />
            </button>
          </div>
        </div>

        {/* Sticky Links Header */}
        <div
          className={`hidden md:block ${isScrolled ? "fixed top-0 left-0 w-full border-b bg-white z-40" : ""
            }`}
        >
          <HeaderLink />
        </div>
        <hr className="w-full border bg-slate-300" />
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
        <SearchBar onSearch={(query) => {
          window.location.href = `/productlist?query=${encodeURIComponent(query)}`;
        }} />

        {/* Sidebar */}
        <div
          className={`fixed inset-0 bg-orange-100 transform overflow-y-auto pb-10 scroll-smooth ${
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
            <Link href="/" className="flex flex-col items-center">
              <img src="/logo.png" alt="Logo" className="h-12" />
            </Link>
          </div>

          <HeaderLink />

          {/* Sidebar Content */}
          <div className="flex flex-col font-semibold text-gray-700 text-sm mt-4 space-y-4 p-4">
            {/* Company Associate Button */}
            <button
              className="px-4 flex items-center space-x-4"
              onClick={() => setIsFormOpen(true)}
            >
              <FaUserTie className="text-gray-600 text-lg" />
              <p>Company Associate</p>
            </button>

            {/* Track Order Button */}
            <button
              className="px-4 flex items-center space-x-4"
              onClick={() => setIsTrackFormOpen(true)} // Open Track Form on click
            >
              <ImTruck className="text-gray-600 text-lg" />
              <p>Track Order</p>
            </button>

            {/* Contact Info */}
            <div className="px-4 flex items-center space-x-4">
              <MdMobileFriendly className="text-gray-600 text-lg" />
              <p>+91-8630715936</p>
            </div>

            {/* Help Center */}
            <div className="px-4 flex items-center space-x-4">
              <IoMdHelpCircle className="text-gray-600 text-lg" />
              <a
                href={`https://wa.me/${whatsappNumber.replace(/\s+/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600"
              >
                <p>Help Center</p>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Associate Form */}
      {isFormOpen && <AssociateForm onClose={() => setIsFormOpen(false)} />}
      {/* Track Form */}
      {isTrackFormOpen && <TrackForm onClose={() => setIsTrackFormOpen(false)} />} {/* Add Track Form here */}
    </header>
  );
};

export default LargeHeader;
