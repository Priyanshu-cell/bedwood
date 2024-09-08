
import React, { useEffect } from "react";
import { HeaderLink } from "../links/headerlink";
import Link from "next/link";
import { FaSearch, FaShoppingCart} from "react-icons/fa";
import { HiOutlineArrowLongLeft } from "react-icons/hi2";
import { MdMenu } from "react-icons/md";
import { RiMapPinLine } from "react-icons/ri";
import { IoMdHelpCircle } from "react-icons/io";
import { useRecoilValue } from "recoil";
import { cartItemsCountState } from "@/state/atoms/countCartState";

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
          <img src="https://t4.ftcdn.net/jpg/01/33/48/03/360_F_133480376_PWlsZ1Bdr2SVnTRpb8jCtY59CyEBdoUt.jpg" alt="Logo" className="h-8" />

          {/* Search Bar and Cart Button */}
          <div className="flex items-center space-x-4 ml-4">
            <div className="relative flex-grow w-64">
              <input
                type="text"
                placeholder="Search..."
                className="p-1 border border-gray-300 bg-white rounded-md w-full"
              />
              <FaSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 text-2xl" />
            </div>

            {/* Cart Button */}
            <Link className="relative flex flex-col items-center justify-center rounded-full" href="/cart">
              <FaShoppingCart className=" text-gray-600 text-xl mt-2" />
              <span className="absolute -top-1 -right-2 text-xs text-red-500 mt-1"> {cartItemCount}</span>
            </Link>
          </div>
        </div>
        {/* Sticky Links Header */}
        <div className={`${isScrolled ? "fixed top-0 left-0 w-full border-b bg-white z-50" : ""} hidden md:block`}>
          <HeaderLink  />
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex flex-col items-center">
        <div className="flex items-center w-full max-w-6xl mx-auto justify-between">
          <div className="flex items-center">
            {/* Hamburger Icon */}
            <button className="flex items-center" onClick={() => setIsSidebarOpen(true)}>
              <MdMenu className="text-gray-600 text-3xl ml-1" />
            </button>

            {/* Logo */}
            <img src="https://t4.ftcdn.net/jpg/01/33/48/03/360_F_133480376_PWlsZ1Bdr2SVnTRpb8jCtY59CyEBdoUt.jpg" alt="Logo" className="h-8 mx-2" />
          </div>

          {/* Cart Button */}
          <Link className="relative mr-2 flex flex-col items-center justify-center rounded-full" href="/cart">
              <FaShoppingCart className=" text-gray-600 text-xl mt-2" />
              <span className="absolute -top-1 -right-2 text-xs text-red-500 mt-1"> {cartItemCount}</span>
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
            <FaSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 text-2xl" />
          </div>
        </div>

        {/* Sidebar */}
        <div className={`fixed inset-0 bg-gray-200 transform overflow-y-auto pb-10 scroll-smooth ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-500 ease-in-out z-50`}>
          <div className="flex items-center py-2 bg-white">
            {/* Arrow Icon for closing */}
            <button className="flex items-center px-4" onClick={() => setIsSidebarOpen(false)}>
              <HiOutlineArrowLongLeft className="text-gray-600 text-3xl" />
            </button>

            {/* Logo */}
            <img src="https://t4.ftcdn.net/jpg/01/33/48/03/360_F_133480376_PWlsZ1Bdr2SVnTRpb8jCtY59CyEBdoUt.jpg" alt="Logo" className="h-8" />
          </div>
          <hr className="md:hidden border-t border-gray-300 w-full mt-10" />
          <HeaderLink setSideBarOpen={setIsSidebarOpen} />

          {/* other content */}
          <div className="flex flex-col font-semibold text-gray-700 text-sm mt-4 space-y-4 p-4">
            <div className=" px-4 flex items-center space-x-4">
              <RiMapPinLine className="text-gray-600 text-lg" />
              <p>+91-1111111111</p>
            </div>
            <div className=" px-4 flex items-center space-x-4">
              <FaShoppingCart className="text-gray-600 text-lg" />
              <p>Track</p>
            </div>
            <div className=" px-4 flex items-center space-x-4">
              <IoMdHelpCircle className="text-gray-600 text-lg" />
              <p>Help Center</p>
            </div>
          </div>
        </div>

        {/* Overlay to prevent scrolling */}
        {isSidebarOpen && (
          <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={() => setIsSidebarOpen(false)} />
        )}
      </div>
    </header>
  );
};
