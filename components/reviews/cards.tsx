import React from 'react';
import { Card } from './card'; // Adjust the import path as necessary
import Link from 'next/link';

const Reviews = [
  { image: 'https://via.placeholder.com/300', title: 'Best Seller 1', paragraph: 'Description 1', rating: 4 },
  { image: 'https://via.placeholder.com/300', title: 'Best Seller 2', paragraph: 'Description 2', rating: 5 },
  { image: 'https://via.placeholder.com/300', title: 'Best Seller 3', paragraph: 'Description 3', rating: 3 },
  { image: 'https://via.placeholder.com/300', title: 'Best Seller 4', paragraph: 'Description 4', rating: 4 },
  { image: 'https://via.placeholder.com/300', title: 'Best Seller 5', paragraph: 'Description 5', rating: 2 },
  { image: 'https://via.placeholder.com/300', title: 'Best Seller 6', paragraph: 'Description 6', rating: 5 },
  { image: 'https://via.placeholder.com/300', title: 'Best Seller 7', paragraph: 'Description 7', rating: 4 },
  { image: 'https://via.placeholder.com/300', title: 'Best Seller 8', paragraph: 'Description 8', rating: 3 }
];

export const ReviewsSection: React.FC = () => {
  return (
    <section className="w-full h-auto py-12 px-6 bg-gray-50">
      {/* Text Section */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Modular Furniture Designs</h2>
        <Link href="/furnishing">
          <a className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">View All</a>
        </Link>
      </div>

      {/* Horizontal Scrolling Cards Row */}
      <div className="flex overflow-x-auto space-x-6 p-4">
        {Reviews.map((item, index) => (
          <div 
            key={index} 
            className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
          >
            <Card 
              image={item.image}
              title={item.title}
              paragraph={item.paragraph}
              rating={item.rating}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
