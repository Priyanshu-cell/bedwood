// components/NewArrivalsSection.tsx
import React from 'react';
import { NewArrivalsCard } from './card';  // Adjust the import path as necessary
import Link from 'next/link';

export const newArrivals = [
  { id: 1, title: 'New Arrival 1', image: 'https://via.placeholder.com/300', paragraph: 'Description for New Arrival 1' },
  { id: 2, title: 'New Arrival 2', image: 'https://via.placeholder.com/300', paragraph: 'Description for New Arrival 2' },
  { id: 3, title: 'New Arrival 3', image: 'https://via.placeholder.com/300', paragraph: 'Description for New Arrival 3' },
  { id: 4, title: 'New Arrival 4', image: 'https://via.placeholder.com/300', paragraph: 'Description for New Arrival 4' },
];

export const NewArrivalsSection: React.FC = () => {
  return (
    <section className="p-4 bg-gray-50">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">New Arrivals </h2>
        <Link href="/new-arrivals"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">View All
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {newArrivals.map((card) => (
          <NewArrivalsCard
            key={card.id}
            image={card.image}
            title={card.title}
            paragraph={card.paragraph}
          />
        ))}
      </div>
    </section>
  );
};
