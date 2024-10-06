import React from 'react';

interface FurnishingCardProps {
  image: string;
  title: string;
  paragraph: string;
}

export const FurnishingCard: React.FC<FurnishingCardProps> = ({ image, title, paragraph }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col min-w-[150px] max-w-xs md:min-w-[300px] md:max-w-md lg:min-w-[350px] lg:max-w-lg aspect-auto">
      {/* Image */}
      <img src={image} alt={title} className="w-full object-cover" style={{ height: 'auto' }} />

      {/* Text Section */}
      <div className="flex flex-col justify-between p-4 bg-white">
        <div>
          <h3 className="md:text-lg text-sm font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 text-xs mb-4">{paragraph}</p>
        </div>
      </div>
    </div>
  );
};
