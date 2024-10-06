import React from 'react';
import { EssentialCard } from './card'; // Import the EssentialCard component

interface Essential {
  image: string;
  title: string;
  description: string;
  link: string;
}

export const EssentialsSection: React.FC = () => {
  const essentials: Essential[] = [
    { image: 'https://via.placeholder.com/400x300?text=Essential+1', title: 'Essential 1', description: 'Comfortable sofa for your living room', link: '#' },
    { image: 'https://via.placeholder.com/400x300?text=Essential+2', title: 'Essential 2', description: 'Stylish dining table for family meals', link: '#' },
    { image: 'https://via.placeholder.com/400x300?text=Essential+3', title: 'Essential 3', description: 'Cozy bed for a good night\'s sleep', link: '#' },
    { image: 'https://via.placeholder.com/400x300?text=Essential+4', title: 'Essential 4', description: 'Functional office desk for productivity', link: '#' },
    { image: 'https://via.placeholder.com/400x300?text=Essential+5', title: 'Essential 5', description: 'Elegant lamp for brightening up the room', link: '#' },
    { image: 'https://via.placeholder.com/400x300?text=Essential+6', title: 'Essential 6', description: 'Durable storage solutions for your home', link: '#' },
    { image: 'https://via.placeholder.com/400x300?text=Essential+7', title: 'Essential 7', description: 'Comfortable mattress for restful sleep', link: '#' },
    { image: 'https://via.placeholder.com/400x300?text=Essential+8', title: 'Essential 8', description: 'Stylish outdoor furniture for your patio', link: '#' }
  ];

  return (
    <section className="w-full py-12 px-6 bg-white">
      {/* Text Section */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">Explore Essential Home Furniture</h2>
        <p className="text-lg text-gray-600">Design Your Home Decor, Your Way</p>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {essentials.map((items, index) => (
          <EssentialCard
            key={index}
            image={items.image}
            title={items.title}
            description={items.description}
            link={items.link}
          />
        ))}
      </div>
    </section>
  );
};
