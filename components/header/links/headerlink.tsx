import React from "react";
import Link from "next/link";

interface HeaderLinkProps {
  className?: string;
}

export const HeaderLink: React.FC<HeaderLinkProps> = ({ className }) => {
  return (
    <nav
      className={`md:pt-6 md:pb-4 flex flex-wrap md:justify-center md:items-center md:text-sm text-xs w-full max-w-7xl mx-auto ${className}`}
    >
      <hr className="md:hidden border-t border-gray-300 w-full " />
      <Link
        href="/sofas"
        className="flex-shrink-0 md:mx-2 px-2  text-gray-600 hover:text-gray-900 whitespace-nowrap"
      >
        Sofas
      </Link>
      <hr className="md:hidden border-t border-gray-300 w-full " />
      <Link
        href="/living"
        className="flex-shrink-0 md:mx-2 px-2  text-gray-600 hover:text-gray-900 whitespace-nowrap"
      >
        Living
      </Link>
      <hr className="md:hidden border-t border-gray-300 w-full " />
      <Link
        href="/bedroom"
        className="flex-shrink-0 md:mx-2 px-2  text-gray-600 hover:text-gray-900 whitespace-nowrap"
      >
        Bedroom
      </Link>
      <hr className="md:hidden border-t border-gray-300 w-full " />
      <Link
        href="/dining-kitchen"
        className="flex-shrink-0 md:mx-2 px-2  text-gray-600 hover:text-gray-900 whitespace-nowrap"
      >
        Dining & Kitchen
      </Link>
      <hr className="md:hidden border-t border-gray-300 w-full " />
      <Link
        href="/storage"
        className="flex-shrink-0 md:mx-2 px-2  text-gray-600 hover:text-gray-900 whitespace-nowrap"
      >
        Storage
      </Link>
      <hr className="md:hidden border-t border-gray-300 w-full " />
      <Link
        href="/study-office"
        className="flex-shrink-0 md:mx-2 px-2  text-gray-600 hover:text-gray-900 whitespace-nowrap"
      >
        Study & Office
      </Link>
      <hr className="md:hidden border-t border-gray-300 w-full " />
      <Link
        href="/mattresses"
        className="flex-shrink-0 md:mx-2 px-2  text-gray-600 hover:text-gray-900 whitespace-nowrap"
      >
        Mattresses
      </Link>
      <hr className="md:hidden border-t border-gray-300 w-full " />
      <Link
        href="/decor"
        className="flex-shrink-0 md:mx-2 px-2  text-gray-600 hover:text-gray-900 whitespace-nowrap"
      >
        Decor
      </Link>
      <hr className="md:hidden border-t border-gray-300 w-full " />
      <Link
        href="/lamps-lighting"
        className="flex-shrink-0 md:mx-2 px-2  text-gray-600 hover:text-gray-900 whitespace-nowrap"
      >
        Lamps & Lighting
      </Link>
      <hr className="md:hidden border-t border-gray-300 w-full " />
      <Link
        href="/furnishings"
        className="flex-shrink-0 md:mx-2 px-2  text-gray-600 hover:text-gray-900 whitespace-nowrap"
      >
        Furnishings
      </Link>
      <hr className="md:hidden border-t border-gray-300 w-full " />
      <Link
        href="/outdoor"
        className="flex-shrink-0 md:mx-2 px-2  text-gray-600 hover:text-gray-900 whitespace-nowrap"
      >
        Outdoor
      </Link>
      <hr className="md:hidden border-t border-gray-300 w-full " />
      <Link
        href="/ws-value"
        className="flex-shrink-0 md:mx-2 px-2  text-gray-600 hover:text-gray-900 whitespace-nowrap"
      >
        WS Value
      </Link>
      <hr className="md:hidden border-t border-gray-300 w-full " />
    </nav>
  );
};
