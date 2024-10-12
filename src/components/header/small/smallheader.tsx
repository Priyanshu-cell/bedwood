'use client'
import React, { useState } from "react";
import { MapPinIcon } from "@heroicons/react/24/outline"; // Import the Heroicon
import { IoMdHelpCircle } from "react-icons/io";
import { MdMobileFriendly } from "react-icons/md";
import { ImTruck } from "react-icons/im";
import { TrackForm } from "@/src/form/trackform";
import { FaTruckFast } from "react-icons/fa6";

export const SmallHeader = () => {
  const whatsappNumber = "+91 96751 11719"; // Define your WhatsApp number
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to control popup visibility

  // Change the event type to MouseEvent<HTMLElement>
  const handleTrackClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault(); // Prevent the link from navigating
    setIsPopupOpen(true); // Open the popup form
  };

  const handleClosePopup = () => setIsPopupOpen(false); // Close the popup form

  return (
    <header className="w-full h-auto p-4 md:px-44 bg-inherit flex flex-col md:flex-row md:items-center justify-between">
      {/* Location Section with Icon */}
      <div className="flex flex-row items-center text-base text-gray-800 md:space-x-2 md:divide-x-2 divide-gray-600" >
        
        <div className="flex flex-row items-center md:pl-1 ">
          <MapPinIcon className="h-5 w-5 text-gray-800" /> 
          <p className="text-sm md:pl-1 font-medium">Kotdwar</p>
        </div>

        <div className="flex flex-row items-center md:pl-1 text-orange-400">
          <FaTruckFast className="h-5 w-5" />
          <p className="text-sm md:pl-1 font-medium">Fast Delivery</p>
        </div>

      </div>

      {/* Contact and Info Section */}
      <div className="flex flex-col md:flex-row text-gray-600 text-sm mt-2 md:mt-0 space-y-2 md:space-y-0 md:divide-x-2 divide-gray-600">
        <div className="px-4 flex items-center space-x-2">
          <MdMobileFriendly className="text-gray-600 text-lg" />
          <p>+91-8630715936</p>
        </div>
        <div className="md:px-2 px-6">
          <div className="flex items-center space-x-2">
            <ImTruck className="text-gray-600 text-lg" />
            {/* When the user clicks on this, the popup form will appear */}
            <button
              className="text-gray-600"
              onClick={handleTrackClick} // Call the function directly
            >
              <p>Track</p>
            </button>
          </div>
        </div>
        <div className="md:px-2 px-6">
          <div className="flex items-center space-x-2">
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

      {/* Popup form appears when the Track button is clicked */}
      {isPopupOpen && <TrackForm onClose={handleClosePopup} />}
    </header>
  );
};
