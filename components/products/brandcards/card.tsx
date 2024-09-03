import React from 'react';

interface CardProps {
  image: string;
  title: string;
  paragraph: string;
}

export const Card: React.FC<CardProps> = ({ image, title, paragraph }) => {
  return (
    <div className="relative w-full max-w-xl aspect-[4/3] bg-gray-200 overflow-hidden rounded-lg shadow-md">
      {/* Image */}
      <img src={image} alt={title} className="w-full h-full object-cover" />

      {/* Overlay Text */}
      <div className="absolute top-0 left-0 p-4 bg-opacity-0 text-black w-full flex flex-col justify-start">
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-sm">{paragraph}</p>
      </div>
    </div>
  );
};
