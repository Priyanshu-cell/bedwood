import React from 'react';
import { OfferCard } from './card'; // Import the updated OfferCard component

export const OfferSection: React.FC = () => {
  const offers = [
    { image: 'https://via.placeholder.com/400x300?text=Offer+1', title: 'Offer 1', description: 'Get 20% off on selected items', link: '#' },
    { image: 'https://via.placeholder.com/400x300?text=Offer+2', title: 'Offer 2', description: 'Buy one get one free on all accessories', link: '#' },
    { image: 'https://via.placeholder.com/400x300?text=Offer+3', title: 'Offer 3', description: 'Save 30% on summer collection', link: '#' },
    { image: 'https://via.placeholder.com/400x300?text=Offer+4', title: 'Offer 4', description: 'Extra 10% off on clearance', link: '#' }
  ];

  return (
    <section className="w-full py-12 px-6 bg-white">
      {/* Text Section */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">Special Offers</h2>
        <p className="text-lg text-gray-600">Check out our latest offers and promotions</p>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {offers.map((offer, index) => (
          <OfferCard
            key={index}
            image={offer.image}
            title={offer.title}
            description={offer.description}
            link={offer.link}
          />
        ))}
      </div>
    </section>
  );
};
