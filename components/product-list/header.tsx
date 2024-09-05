import React from 'react';

interface HeaderProps {
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}

const categories = ['All', 'Sofa', 'Bed', 'Tables'];

export const Header: React.FC<HeaderProps> = ({ selectedCategory, onCategoryChange }) => {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
            <h1 className="font-manrope font-bold text-2xl sm:text-3xl text-black mb-4 sm:mb-0">Products</h1>
            <div className="flex flex-wrap gap-2 sm:gap-4">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => onCategoryChange(category)}
                        className={`px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base ${selectedCategory === category ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
};
