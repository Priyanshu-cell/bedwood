import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const TopPicksSection = () => {
  const picks = [
    {
      id: 1,
      href: "/sofa-sets",
      src: "/images/home-new1/icon1.jpg",
      alt: "Wooden Sofa Set Furniture",
      title: "Sofa set online",
      name: "Sofa Sets",
    },
    {
      id: 2,
      href: "/beds",
      src: "/images/home-new1/icon2.jpg",
      alt: "Wooden Bed Furniture",
      title: "Wooden Bed",
      name: "Beds",
    },
    {
      id: 3,
      href: "/dining-table-sets",
      src: "/images/home-new1/icon3.jpg",
      alt: "Wooden Dining Furniture",
      title: "Dining Table set",
      name: "Dining Table Sets",
    },
    {
      id: 4,
      href: "/sofa-cum-beds",
      src: "/images/home-new1/icon4.jpg",
      alt: "Wooden Sofa Come Bed Furniture",
      title: "Sofa cum bed online",
      name: "Sofa Cum Beds",
    },
    {
      id: 5,
      href: "/tv-units",
      src: "/images/home-new1/icon10.jpg",
      alt: "Wooden Tv Unit Furniture",
      title: "Wooden TV Unit",
      name: "TV Units",
    },
    {
      id: 6,
      href: "/bookshelves",
      src: "/images/home-new1/icon7.jpg",
      alt: "Wooden Bookshelf Furniture Online",
      title: "Book Shelves online",
      name: "Book Shelves",
    },
    {
      id: 7,
      href: "/coffee-tables",
      src: "/images/home-new1/icon8.jpg",
      alt: "Buy Coffee Table for Home | Wooden Coffee Table Furniture",
      title: "Coffee Table Sets online",
      name: "Coffee Tables",
    },
    {
      id: 8,
      href: "/study-tables",
      src: "/images/home-new1/icon6.jpg",
      alt: "Wooden Study Table Furniture",
      title: "Study Table",
      name: "Study Tables",
    },
    {
      id: 9,
      href: "/home-decors",
      src: "/images/home-new1/icon11.jpg",
      alt: "Home Decor Items",
      title: "Decor Item",
      name: "Home Decor",
    },
    {
      id: 10,
      href: "/home-furnishing",
      src: "/images/home-new1/icon9.jpg",
      alt: "Home Furnishing Items",
      title: "Home Furnishing Online",
      name: "Home Furnishing",
    },
    {
      id: 11,
      href: "/lamps-and-lighting",
      src: "/images/home-new1/icon12.jpg",
      alt: "Lamp Lights Online in India",
      title: "Lamp and Lighting",
      name: "Lamps & Lightings",
    },
    {
      id: 12,
      href: "/furniture-sale",
      src: "/images/home-new1/icon5.jpg",
      alt: "Furniture Sale Online in India",
      title: "Wooden Online Sale",
      name: "Sale",
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold">Top Picks For You</h2>
        <p className="text-lg text-gray-600">Impressive Collection for Your Dream Home</p>
      </div>
      <div className="relative overflow-x-auto scrollbar-hidden">
        <div className="flex items-center space-x-4">
          {picks.map((pick) => (
            <Link key={pick.id} href={pick.href} className="flex flex-col items-center">
              <div className="relative overflow-hidden rounded-full bg-gray-200 w-24 h-24 sm:w-32 sm:h-32 md:w-44 md:h-44">
                <img
                  src={pick.src}
                  alt={pick.alt}
                  title={pick.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="mt-2 text-center text-xs lg:text-base font-medium">{pick.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
