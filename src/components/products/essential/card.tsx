import React from 'react';

interface EssentialCardProps {
  image: string;
  title: string;
  description: string;
  link: string;
}

export const EssentialCard: React.FC<EssentialCardProps> = ({ image, title, description, link }) => {
  return (
    <div className="flex flex-col h-full bg-white rounded-md shadow-md overflow-hidden">
      {/* Image */}
      <div className="relative w-full h-64">
        <img src={image} alt={title} className="absolute inset-0 w-full h-full object-fill" />
      </div>

      {/* Text Section */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        <h3 className="md:text-lg text-md font-bold mb-2">{title}</h3>
        <p className="md:text-sm text-xs mb-4">{description}</p>
        <a href={link} className="md:text-sm text-xs font-semibold text-blue-600 hover:underline">
          Explore More
        </a>
      </div>
    </div>
  );
};
