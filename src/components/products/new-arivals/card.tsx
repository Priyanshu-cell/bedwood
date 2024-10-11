import React from 'react';

interface NewArrivalsCardProps {
  image: string;
  title: string;
  paragraph: string;
}

export const NewArrivalsCard: React.FC<NewArrivalsCardProps> = ({ image, title, paragraph }) => {
  return (
   <div className='z-50'>
     <div className="bg-white shadow-lg overflow-hidden flex flex-col min-w-[150px] max-w-xs md:min-w-[300px] md:max-w-md lg:min-w-[350px] lg:max-w-lg relative ">
      {/* Image */}
      <img src={image} alt={title} className="w-full object-cover" />

      {/* Title on Image */}
      <div className="absolute top-0 left-0 p-3 bg-transparent bg-opacity-50 text-black">
        <h3 className="md:text-lg text-sm font-semibold">{title}</h3>
      </div>

      {/* Text Section */}
      <div className="flex flex-col justify-between p-4 bg-white">
        <p className="text-gray-600 text-xs">{paragraph}</p>
      </div>
    </div>
   </div>
  );
};
