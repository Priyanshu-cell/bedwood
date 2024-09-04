import React from "react";
import Link from "next/link";

interface HeaderLinkProps {
  className?: string;
}

export const HeaderLink: React.FC<HeaderLinkProps> = ({ className }) => {
  return (
    <nav
      className={`md:p-4 flex flex-col md:flex-row md:justify-center md:items-center text-sm w-full max-w-7xl mx-auto ${className}`}
    >
      {["/Sofas", "/living", "/Bedroom", "/Dining-kitchen", "/Storage", "/Study-office", "/Mattresses", "/Decor", "/Lamps-lighting", "/Furnishings", "/Outdoor", "/Ws-value"].map((href, index) => (
        
        <div
          key={index}
          className="flex items-center py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900 whitespace-nowrap md:space-x-4 md:px-4 md:border-0 border-b border-gray-200"
        >
            
          <Link href={href} className="flex-grow text-left px-2">
            {href.split('/')[1].replace('-', ' ')}
          </Link>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="md:hidden h-5 w-5 text-gray-600 ml-2"
            fill="none"
            stroke="currentColor"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        
        </div>
        
      ))}
      
      
    </nav>
  );
};
