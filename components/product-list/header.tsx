import React from 'react';

interface HeaderProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = ['All', 'Sofa', 'Bed', 'Tables'];

export const Header: React.FC<HeaderProps> = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="flex justify-between items-center mb-8 overflow-hidden">
      {/* Dynamic Title with responsive text sizing */}
      <h1 className="font-manrope font-bold text-3xl text-black md:text-xl sm:text-lg">Products</h1>
      
      {/* Category Selection */}
      <div className="flex space-x-4 items-center">
        
        {/* Dropdown for mobile view */}
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 md:hidden"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Buttons for desktop view */}
        <div className="hidden md:flex space-x-2">
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
    </div>
  );
};
