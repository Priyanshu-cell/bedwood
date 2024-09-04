import React from 'react';

interface OfferCardProps {
  image: string;
  title: string;
  description: string;
  link: string;
}

export const OfferCard: React.FC<OfferCardProps> = ({ image, title, description, link }) => {
  return (
    <div className="h-auto min-w-[150px] max-w-xs md:min-w-[300px] md:max-w-md lg:min-w-[350px] lg:max-w-lg aspect-square md:aspect-[4/3] bg-white">
      {/* Image */}
      <img src={image} alt={title} className="w-full h-full object-cover shadow-md" />

      {/* Text Section */}
      <div className="p-4 flex flex-col items-center text-center bg-white">
        <h3 className="md:text-lg text-md font-bold mb-2">{title}</h3>
        <p className="md:text-sm text-xs mb-4">{description}</p>
        <a href={link} className="md:text-sm text-xs font-semibold text-blue-600 hover:underline">Explore More</a>
      </div>
    </div>
  );
};
