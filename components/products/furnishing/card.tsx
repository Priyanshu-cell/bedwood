// components/card.tsx
import React from 'react';

interface CardProps {
  image: string;
  title: string;
  paragraph: string;
}

export const FurnishingCard: React.FC<CardProps> = ({ image, title, paragraph }) => {
  return (
    <div className="relative w-full overflow-hidden bg-white shadow-md rounded-lg">
      {/* Image Container */}
      <div className="aspect-[1.5/1]">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* Paragraph below the image */}
      <div className="p-4 text-center">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm">{paragraph}</p>
      </div>
    </div>
  );
};
