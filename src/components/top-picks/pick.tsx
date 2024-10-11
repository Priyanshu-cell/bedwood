import React from 'react';

export const TopPicksSection = () => {
  const picks = [
    {
      id: 1,
      src: "/toppicks/sofaset.jpg",
      alt: "Wooden Sofa Set Furniture",
      title: "Sofa set online",
      name: "Sofa Sets",
    },
    {
      id: 2,
      src: "/toppicks/bed.jpg",
      alt: "Wooden Bed Furniture",
      title: "Wooden Bed",
      name: "Beds",
    },
    {
      id: 3,
      src: "/toppicks/diningtable.jpg",
      alt: "Dining Table Set",
      title: "Dining Table set",
      name: "Dining Table Sets",
    },
    {
      id: 4,
      src: "/toppicks/sofacumbed.jpg",
      alt: "Sofa Cum Bed Furniture",
      title: "Sofa cum bed online",
      name: "Sofa Cum Beds",
    },
    {
      id: 5,
      src: "/toppicks/bookshelve.jpg",
      alt: "Wooden Bookshelf Furniture",
      title: "Book Shelves online",
      name: "Book Shelves",
    },
    {
      id: 6,
      src: "/toppicks/coffeetable.png",
      alt: "Coffee Table Furniture",
      title: "Coffee Table Sets online",
      name: "Coffee Tables",
    },
    {
      id: 7,
      src: "/toppicks/studytable.jpg",
      alt: "Study Table Furniture",
      title: "Study Table",
      name: "Study Tables",
    },
    {
      id: 8,
      src: "/toppicks/homedecor.png",
      alt: "Home Decor Items",
      title: "Decor Item",
      name: "Home Decor",
    },
    {
      id: 9,
      src: "/toppicks/homefurnishing.png",
      alt: "Home Furnishing Items",
      title: "Home Furnishing Online",
      name: "Home Furnishing",
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
            <div key={pick.id} className="flex flex-col items-center">
              <div className="relative overflow-hidden rounded-full bg-gray-200 w-24 h-24 sm:w-32 sm:h-32 md:w-44 md:h-44">
                <img
                  src={pick.src}
                  alt={pick.alt}
                  title={pick.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="mt-2 text-center text-xs lg:text-base font-medium">{pick.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
