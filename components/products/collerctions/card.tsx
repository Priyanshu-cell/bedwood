import React from 'react';

interface CardProps {
  image: string;
  title: string;
  paragraph: string;
}

export const Card: React.FC<CardProps> = ({ image, title, paragraph }) => {
  return (
    <div className="relative w-full max-w-lg overflow-hidden ">
      {/* Image Container */}
      <div className="aspect-[1.5/1] shadow-md">
        <img src={image} alt={title} className="w-full h-full object-cover" />

        {/* Title on top of the image */}
        <div className="absolute top-0 left-0 p-4 bg-opacity-0 text-black">
          <h3 className="text-lg font-bold mb-2">{title}</h3>
        </div>
      </div>

      {/* Paragraph below the image */}
      <div className="py-1">
        <p className="text-sm">{paragraph}</p>
      </div>
    </div>
  );
};
