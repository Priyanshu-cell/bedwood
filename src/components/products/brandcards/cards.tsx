import React from 'react';
import { Card } from './card';

const cardData = [
  {
    image: '/furniture/1.png',
    title: '',
    paragraph: '',
    link: '/productlist?categoryId=67075e3299a97c3e8c6512f2', // Add the link here
  },
  {
    image: '/furniture/2.png',
    title: '',
    paragraph: '',
    link: '/productlist?categoryId=67076494cb95d84fec71ff78',
  },
  {
    image: '/furniture/3.png',
    title: '',
    paragraph: '',
    link: '/productlist?categoryId=670a3b0ecb95d84fec72235b',
  },
  {
    image: '/furniture/4.jpeg',
    title: '',
    paragraph: '',
    link: '/productlist?subcategoryId=670a42d0cb95d84fec722c35',
  },
  {
    image: '/furniture/5.jpeg',
    title: '',
    paragraph: '',
    link: '/productlist?subcategoryId=670a4191cb95d84fec722acd',
  },
  {
    image: '/furniture/6.png',
    title: '',
    paragraph: '',
    link: '/productlist?subcategoryId=670a43dfcb95d84fec722d34',
  },
];

export const BrandSection = () => {
  return (
    <section className="w-full h-auto py-12 px-6 bg-gray-50">
      {/* Text Section */}
      <div className="md:text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">India&apos;s Finest Online Furniture Brand.</h2>
        <p className="md:text-lg text-gray-600 text-balance">Buy Furniture Online from our extensive collection of wooden furniture units to give your home an elegant touch.</p>
      </div>

      {/* Cards Grid */}
      <div className="w-full max-w-8xl mx-auto flex justify-center">
        {/* For small screens */}
        <div className="md:hidden overflow-x-auto flex space-x-4">
          {cardData.map((card, index) => (
            <Card
              key={index}
              image={card.image}
              title={card.title}
              paragraph={card.paragraph}
              link={card.link} // Pass the link to the card
            />
          ))}
        </div>

        {/* For larger screens */}
        <div className="hidden md:grid grid-cols-3 gap-8">
          {cardData.map((card, index) => (
            <Card
              key={index}
              image={card.image}
              title={card.title}
              paragraph={card.paragraph}
              link={card.link} // Pass the link to the card
            />
          ))}
        </div>
      </div>
    </section>
  );
};
