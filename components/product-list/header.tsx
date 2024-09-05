import React from 'react';

interface HeaderProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = ['All', 'Sofa', 'Bed', 'Tables'];

export const Header: React.FC<HeaderProps> = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="font-manrope font-bold text-3xl text-black">Products</h1>
      <div className="flex space-x-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-lg ${selectedCategory === category ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};
