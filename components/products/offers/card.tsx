import React from 'react';

interface OfferCardProps {
  image: string;
  title: string;
  description: string;
  link: string;
}

export const OfferCard: React.FC<OfferCardProps> = ({ image, title, description, link }) => {
  return (
    <div className="w-full bg-gray-200 overflow-hidden flex flex-col max-w-xs mx-auto">
      {/* Image */}
      <img src={image} alt={title} className="w-full h-48 object-cover shadow-md" />

      {/* Text Section */}
      <div className="p-4 flex flex-col items-center text-center bg-white">
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-sm mb-4">{description}</p>
        <a href={link} className="text-sm font-semibold underline">Explore More</a>
      </div>
    </div>
  );
};
