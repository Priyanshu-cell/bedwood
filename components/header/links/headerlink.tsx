'use client'
import React, { useState } from 'react';
import Link from 'next/link';

interface SubMenuItem {
  href: string;
  text: string;
}

interface LinkData {
  href: string;
  text: string;
  logo: string; 
  subMenu?: SubMenuItem[]; 
}

interface HeaderLinkProps {
  className?: string;
}

const linkData: LinkData[] = [
  { 
    href: "/productlist", 
    text: "Sofas", 
    logo: "/path/to/sofas-logo.svg",
    subMenu: [
      { href: "/productlist", text: "Room Sofa" },
      { href: "/productlist", text: "Office Sofa" },
      { href: "/productlist", text: "Hotel Sofa" },
      { href: "/productlist", text: "Living Sofa" },
      { href: "/productlist", text: "Sofa Cum Bed" },
      { href: "/productlist", text: "Carvin Sofa" },
    ]
  },
  { 
    href: "/productlist", 
    text: "Bed", 
    logo: "/path/to/bed-logo.svg",
    subMenu: [
      { href: "/productlist", text: "Single Bed" },
      { href: "/productlist", text: "Double Bed" },
      { href: "/productlist", text: "Hotel Bed" },
      { href: "/productlist", text: "Carvin Bed" },
    ]
  },
  { 
    href: "/productlist", 
    text: "Almirah", 
    logo: "/path/to/almirah-logo.svg"
  },
  { 
    href: "/productlist", 
    text: "Dining Tables", 
    logo: "/path/to/dining-tables-logo.svg",
    subMenu: [
      { href: "/productlist", text: "Luxury Dining Table" },
      { href: "/productlist", text: "Hotel Dining Table" },
      { href: "/productlist", text: "Carvin Dining Table" },
    ]
  },
  { 
    href: "/productlist", 
    text: "Chairs", 
    logo: "/path/to/chairs-logo.svg",
    subMenu: [
      { href: "/productlist", text: "Auditorium Chair" },
      { href: "/productlist", text: "Wooden Chair" },
      { href: "/productlist", text: "Racking Chair" },
      { href: "/productlist", text: "Outdoor Lounge Chair" },
    ]
  },
  { 
    href: "/productlist", 
    text: "Furniture", 
    logo: "/path/to/furniture-logo.svg",
    subMenu: [
      { href: "/productlist", text: "Office Furniture" },
      { href: "/productlist", text: "Outdoor Furniture" },
    ]
  },
  { 
    href: "/productlist", 
    text: "Wooden", 
    logo: "/path/to/wooden-logo.svg",
    subMenu: [
      { href: "/productlist", text: "Wooden Side Table" },
      { href: "/productlist", text: "Stool" },
      { href: "/productlist", text: "Jhula" },
    ]
  },
];

export const HeaderLink: React.FC<HeaderLinkProps> = ({ className }) => {
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  return (
    <nav
      className={`md:p-4 flex flex-col md:flex-row md:justify-center md:items-center text-md font-medium w-full max-w-7xl mx-auto ${className}`}
    >
      {linkData.map((link, index) => (
        <div
          key={index}
          className="relative flex items-center md:pl-0 pl-4 py-4 md:py-0  md:px-12 text-gray-700 bg-inherit md:hover:bg-inherit hover:bg-gray-200 hover:text-gray-900 whitespace-nowrap md:space-x-4 md:border-0 border-b border-gray-300"
          onMouseEnter={() => setActiveMenu(index)}
          onMouseLeave={() => setActiveMenu(null)}
        >
          <img
            src={link.logo}
            className="block md:hidden h-6 w-6 mr-2 rounded-full"
          />
          <Link href={link.href} className="flex-grow text-left px-2 md:px-0 md:hover:underline md:hover:underline-offset-8">
            {link.text}
          </Link>
          {link.subMenu && (
            <div
              className={`absolute z-50 top-full left-0  text-sm w-48 bg-white shadow-lg border border-gray-300 ${
                activeMenu === index ? 'block' : 'hidden'
              }`}
              onMouseEnter={() => setActiveMenu(index)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              {link.subMenu.map((subLink, subIndex) => (
                <Link href={subLink.href} key={subIndex} className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
                  {subLink.text}
                </Link>
              ))}
            </div>
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="md:hidden h-6 w-6 text-gray-600 ml-2"
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
