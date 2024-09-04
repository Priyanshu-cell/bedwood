import React from 'react';
import { FurnishingCard } from './card';
import Link from 'next/link';

interface FurnishingCardProps {
  id: number;
  image: string;
  title: string;
  paragraph: string;
}

const cards: FurnishingCardProps[] = [
  { id: 1, title: 'Card 1', image: 'https://via.placeholder.com/400x300?text=Card+1', paragraph: 'Description for Card 1' },
  { id: 2, title: 'Card 2', image: 'https://via.placeholder.com/400x300?text=Card+2', paragraph: 'Description for Card 2' },
  { id: 3, title: 'Card 3', image: 'https://via.placeholder.com/400x300?text=Card+3', paragraph: 'Description for Card 3' },
  { id: 4, title: 'Card 4', image: 'https://via.placeholder.com/400x300?text=Card+4', paragraph: 'Description for Card 4' }
];

export const FurnishingSection: React.FC = () => {
  return (
    <section className="w-full py-12 px-6 bg-white">
      {/* Text Section and View All Button */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center lg:justify-between mb-8 space-y-4 lg:space-y-0">
        <div className="text-start">
          <h2 className="md:text-2xl text-xl font-semibold mb-2">Home Furnishing Items</h2>
          <p className="md:text-lg text-sm text-gray-600">Give Your Home a Touch of WOW</p>
        </div>

        <div className="hidden lg:block text-center">
          <Link href="/furnishing"
             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm">View All
          </Link>
        </div>
      </div>

      {/* Furnishing Grid */}
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 mb-8">
        {cards.map((card) => (
          <FurnishingCard
            key={card.id}
            image={card.image}
            title={card.title}
            paragraph={card.paragraph}
          />
        ))}
      </div>

      {/* View All Button for Small Screens */}
      <div className="lg:hidden flex justify-center mb-8">
        <Link href="/furnishing"
           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-xs">View All
        </Link>
      </div>
    </section>
  );
};
