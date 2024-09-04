import React from 'react';
import Link from 'next/link';

// Define the data type for link items
interface LinkData {
  href: string;
  text: string;
  logo: string; // URL or path to the logo image
}

// Dummy data for links
const linkData: LinkData[] = [
  { href: "/sofas", text: "Sofas", logo: "/path/to/sofas-logo.svg" },
  { href: "/living", text: "Living", logo: "/path/to/living-logo.svg" },
  { href: "/bedroom", text: "Bedroom", logo: "/path/to/bedroom-logo.svg" },
  { href: "/dining-kitchen", text: "Dining & Kitchen", logo: "/path/to/dining-kitchen-logo.svg" },
  { href: "/storage", text: "Storage", logo: "/path/to/storage-logo.svg" },
  { href: "/study-office", text: "Study & Office", logo: "/path/to/study-office-logo.svg" },
  { href: "/mattresses", text: "Mattresses", logo: "/path/to/mattresses-logo.svg" },
  { href: "/decor", text: "Decor", logo: "/path/to/decor-logo.svg" },
  { href: "/lamps-lighting", text: "Lamps & Lighting", logo: "/path/to/lamps-lighting-logo.svg" },
  { href: "/furnishings", text: "Furnishings", logo: "/path/to/furnishings-logo.svg" },
  { href: "/outdoor", text: "Outdoor", logo: "/path/to/outdoor-logo.svg" },
  { href: "/ws-value", text: "WS Value", logo: "/path/to/ws-value-logo.svg" },
];

interface HeaderLinkProps {
  className?: string;
}

export const HeaderLink: React.FC<HeaderLinkProps> = ({ className }) => {
  return (
    <nav
      className={`md:p-4 flex flex-col md:flex-row md:justify-center md:items-center text-sm w-full max-w-7xl mx-auto ${className}`}
    >
      {linkData.map((link, index) => (
        <div
          key={index}
          className="md:hover:bg-inherit flex items-center py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900 whitespace-nowrap md:space-x-4 px-2 md:border-0 border-b border-gray-200"
        >
          {/* Logo for desktop view */}
          <img
            src={link.logo}
            className="md:hidden block h-6 w-6 ml-2 rounded-full"
          />
          <Link href={link.href} className="flex-grow text-left px-2 md:px-0 md:hover:underline md:hover:underline-offset-8">
            {link.text}
          </Link>
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
