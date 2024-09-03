// components/NewArrivalsCard.tsx
import React from 'react';

interface CardProps {
  image: string;
  title: string;
  paragraph: string;
}

export const NewArrivalsCard: React.FC<CardProps> = ({ image, title, paragraph }) => {
  return (
    <div className="relative w-full overflow-hidden bg-white shadow-md rounded-lg">
      {/* Image Container */}
      <div className="aspect-[1.5/1]">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        
        {/* Title on top of the image */}
        <div className="absolute top-0 left-0 p-4 bg-transparent text-black">
          <h3 className="text-lg font-bold">{title}</h3>
        </div>
      </div>

      {/* Paragraph below the image */}
      <div className="p-4">
        <p className="text-sm">{paragraph}</p>
      </div>
    </div>
  );
};
