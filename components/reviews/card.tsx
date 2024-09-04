// src/components/Card.tsx
import React from 'react';

interface CardProps {
  name: string;
  review: string;
  rating: number;
}

export const Card: React.FC<CardProps> = ({ name, review, rating }) => {
  return (
    <div className="bg-gray-200 rounded-lg md:mx-12 m-auto flex flex-col justify-center text-center items-center min-w-[270px] md:min-w-[370px] max-w-xs md:max-w-md aspect-[4/3] flex-shrink-0 w-auto">
      <p className="font-bold uppercase">{name}</p>
      <p className="md:text-lg text-sm font-light italic text-gray-700">{review}</p>
      <div className="flex items-center justify-center space-x-2 mt-4">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`text-yellow-500 w-4 h-4 ${index < rating ? 'block' : 'hidden'}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            stroke="currentColor"
          >
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            ></path>
          </svg>
        ))}
      </div>
    </div>
  );
};

