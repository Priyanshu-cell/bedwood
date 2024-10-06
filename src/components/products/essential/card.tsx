import React from 'react';

interface EssentialCardProps {
  image: string;
  title: string;
  description: string;
  link: string;
}

export const EssentialCard: React.FC<EssentialCardProps> = ({ image, title, description, link }) => {
  return (
    <div className="h-auto min-w-[150px] max-w-xs md:min-w-[280px] md:max-w-md lg:min-w-[350px] lg:max-w-lg aspect-square md:aspect-[4/3] bg-white rounded-md shadow-md">
      {/* Image */}
      <img src={image} alt={title} className="w-full h-full object-cover shadow-md" />

      {/* Text Section */}
      <div className="p-4 flex flex-col items-start text-start bg-white">
        <h3 className="md:text-lg text-md font-bold mb-2">{title}</h3>
        <p className="md:text-sm text-xs mb-4">{description}</p>
        <a href={link} className="md:text-sm text-xs font-semibold text-blue-600 hover:underline">Explore More</a>
      </div>
    </div>
  );
};
