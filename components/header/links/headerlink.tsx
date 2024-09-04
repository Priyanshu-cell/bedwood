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
    href: "/sofas", 
    text: "Sofas", 
    logo: "/path/to/sofas-logo.svg",
    subMenu: [
      { href: "/sofas/room", text: "Room Sofa" },
      { href: "/sofas/office", text: "Office Sofa" },
      { href: "/sofas/hotel", text: "Hotel Sofa" },
      { href: "/sofas/living", text: "Living Sofa" },
      { href: "/sofas/sofa-cum-bed", text: "Sofa Cum Bed" },
      { href: "/sofas/carvin", text: "Carvin Sofa" },
    ]
  },
  { 
    href: "/bed", 
    text: "Bed", 
    logo: "/path/to/bed-logo.svg",
    subMenu: [
      { href: "/bed/single", text: "Single Bed" },
      { href: "/bed/double", text: "Double Bed" },
      { href: "/bed/hotel", text: "Hotel Bed" },
      { href: "/bed/carvin", text: "Carvin Bed" },
    ]
  },
  { 
    href: "/almirah", 
    text: "Almirah", 
    logo: "/path/to/almirah-logo.svg"
  },
  { 
    href: "/dining-tables", 
    text: "Dining Tables", 
    logo: "/path/to/dining-tables-logo.svg",
    subMenu: [
      { href: "/dining-tables/luxury", text: "Luxury Dining Table" },
      { href: "/dining-tables/hotel", text: "Hotel Dining Table" },
      { href: "/dining-tables/carvin", text: "Carvin Dining Table" },
    ]
  },
  { 
    href: "/chairs", 
    text: "Chairs", 
    logo: "/path/to/chairs-logo.svg",
    subMenu: [
      { href: "/chairs/auditorium", text: "Auditorium Chair" },
      { href: "/chairs/wooden", text: "Wooden Chair" },
      { href: "/chairs/racking", text: "Racking Chair" },
      { href: "/chairs/outdoor", text: "Outdoor Lounge Chair" },
    ]
  },
  { 
    href: "/furniture", 
    text: "Furniture", 
    logo: "/path/to/furniture-logo.svg",
    subMenu: [
      { href: "/furniture/office", text: "Office Furniture" },
      { href: "/furniture/outdoor", text: "Outdoor Furniture" },
    ]
  },
  { 
    href: "/wooden", 
    text: "Wooden", 
    logo: "/path/to/wooden-logo.svg",
    subMenu: [
      { href: "/wooden/table", text: "Wooden Side Table" },
      { href: "/wooden/stool", text: "Stool" },
      { href: "/wooden/jhula", text: "Jhula" },
    ]
  },
];

export const HeaderLink: React.FC<HeaderLinkProps> = ({ className }) => {
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  return (
    <nav
      className={`md:p-4 flex flex-col md:flex-row md:justify-center md:items-center text-md w-full max-w-7xl mx-auto ${className}`}
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
