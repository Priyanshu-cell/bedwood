// components/FurnishingSection.tsx
import React from 'react';
import { FurnishingCard } from './card';
import Link from 'next/link';

export const cards = [
  { id: 1, title: 'Card 1', image: 'https://via.placeholder.com/300', paragraph: 'Description for Card 1' },
  { id: 2, title: 'Card 2', image: 'https://via.placeholder.com/300', paragraph: 'Description for Card 2' },
  { id: 3, title: 'Card 3', image: 'https://via.placeholder.com/300', paragraph: 'Description for Card 3' },
  { id: 4, title: 'Card 4', image: 'https://via.placeholder.com/300', paragraph: 'Description for Card 4' },
];

export const FurnishingSection: React.FC = () => {
  return (
    <section className="p-4 bg-gray-50">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Furnishing</h2>
        <Link href="/furnishing"
           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">View All
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <FurnishingCard
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
