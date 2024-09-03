import React from 'react';
import { Card } from './card';

export const BrandSection = () => {
  return (
    <section className="w-full h-auto py-12 px-6 bg-gray-50">
      {/* Text Section */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">Indias Finest Online Furniture Brand</h2>
        <p className="text-lg text-gray-600">Buy Furniture Online from our extensive collection of wooden furniture units to give your home an elegant touch</p>
      </div>

      {/* Cards Grid */}
      <div className="w-full max-w-8xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <Card
          image="https://via.placeholder.com/300"
          title="Card 1"
          paragraph="This is a description for card 1."
        />
        <Card
          image="https://via.placeholder.com/300"
          title="Card 2"
          paragraph="This is a description for card 2."
        />
        <Card
          image="https://via.placeholder.com/300"
          title="Card 3"
          paragraph="This is a description for card 3."
        />
        <Card
          image="https://via.placeholder.com/300"
          title="Card 4"
          paragraph="This is a description for card 4."
        />
        <Card
          image="https://via.placeholder.com/300"
          title="Card 5"
          paragraph="This is a description for card 5."
        />
        <Card
          image="https://via.placeholder.com/300"
          title="Card 6"
          paragraph="This is a description for card 6."
        />
      </div>
    </section>
  );
};
