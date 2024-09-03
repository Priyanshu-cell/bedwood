// components/Card.tsx
import React from 'react';

interface CardProps {
  image: string;
  title: string;
  paragraph: string;
  rating: any;
}

export const Card: React.FC<CardProps> = ({ image, title, paragraph, rating }) => {
  return (
    <div className="relative w-full max-w-lg overflow-hidden bg-white shadow-md rounded-lg">
      {/* Image Container */}
      <div className="aspect-[1.5/1]">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        
        {/* Title on top of the image */}
        <div className="absolute top-0 left-0 p-4 bg-gradient-to-t from-black via-transparent to-transparent text-white">
          <h3 className="text-lg font-bold">{title}</h3>
        </div>
      </div>

      {/* Rating Section */}
      <div className="absolute bottom-0 left-0 p-4 text-white bg-gradient-to-t from-black via-transparent to-transparent w-full flex items-center justify-center">
        <div className="flex space-x-1">
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              className={`w-4 h-4 ${index < rating ? 'text-yellow-400' : 'text-gray-400'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 15l-3.09 1.63.59-3.44-2.5-2.43 3.44-.5L10 7.5l1.56 3.56 3.44.5-2.5 2.43.59 3.44L10 15z" />
            </svg>
          ))}
        </div>
      </div>

      {/* Paragraph below the image */}
      <div className="p-4">
        <p className="text-sm">{paragraph}</p>
      </div>
    </div>
  );
};
