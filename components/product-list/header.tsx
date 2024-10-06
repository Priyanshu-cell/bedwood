import { useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useProducts } from '@/hooks/useProducts'; // Adjust the path as necessary
import { useRecoilState, useSetRecoilState } from 'recoil';
import { refetchProductData } from '@/state/atoms/refetchdata';
import { selectedCategoryState } from '@/state/atoms/filterstate';

interface HeaderProps {
  selectedCategory: string;
  selectedSortOption: string;
  onSortChange: (sortOption: string) => void;
  selectedLayout: string;
  onLayoutChange: (layout: string) => void;
}

const categories = ['All']; // Keeping only "All" as the category
const sortOptions = [
  { value: '1', label: 'Price (Low to High)' }, 
  { value: '-1', label: 'Price (High to Low)' }
];
const layoutOptionsMobile = ['2x2', '3x3'];
const layoutOptionsDesktop = ['3x3', '4x4', '5x5'];

export const Header: React.FC<HeaderProps> = ({
  selectedCategory,
  selectedSortOption,
  onSortChange,
  selectedLayout,
  onLayoutChange
}) => {
  const queryClient = useQueryClient();
  const { refetch } = useProducts(selectedSortOption); // Initial call without categoryId
  const [refetchdata, setrefetchdata] = useRecoilState(refetchProductData);
  const setSelectedCategory = useSetRecoilState(selectedCategoryState);


  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(window.location.search);

    if (category === 'All') {
      setrefetchdata(true)
      setSelectedCategory("")
      params.delete("categoryId"); // Clear categoryId parameter
      refetch(); // Refetch the products without category
    } else {
      params.set("categoryId", category); // Set categoryId for other categories
      refetch();
      setrefetchdata(false); // Refetch the products with the selected category
    }

    // Update the URL without refreshing
    window.history.replaceState({}, "", `/productlist`);
  };

  return (
    <div className="sticky md:top-14 top-0 bg-gray-50 shadow-xs shadow-slate-100 z-30">
      <div className="mx-auto max-w-8xl px-2 lg:px-8 py-4 flex flex-row justify-between items-center gap-4">
        
        {/* Left Section: Sort and Filter */}
        <div className="flex flex-row items-center gap-4">
          {/* Sort Selection */}
          <div className="hidden md:flex items-center space-x-2">
            <label htmlFor="sort" className="text-gray-600 text-sm md:text-base">Sort by:</label>
            <select
              id="sort"
              value={selectedSortOption}
              onChange={(e) => onSortChange(e.target.value)}
              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 text-sm md:text-base"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Filter Selection */}
          <div className=" md:flex space-x-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)} // Use the new handler
                className={`px-4 py-2 rounded-lg ${selectedCategory === category ? 'bg-gray-300 text-black' : 'bg-gray-200 text-black'} text-sm md:text-base`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Mobile View */}
          <div className="md:hidden flex-row space-y-2">
           
            <select
              value={selectedSortOption}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-2/3 p-2 rounded-lg bg-gray-200 text-gray-800 text-sm"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right Section: Layout Options */}
        <div className="flex md:flex-row flex-col items-center gap-2">
          {/* Mobile Layout Options */}
          <div className="md:hidden flex flex-col items-center gap-2">
            {layoutOptionsMobile.map((layout) => (
              <button
                key={layout}
                onClick={() => onLayoutChange(layout)}
                className={`px-4 py-2 rounded-lg text-xs ${selectedLayout === layout ? 'bg-gray-300 text-black' : 'bg-gray-200 text-black'} text-sm`}
              >
                {layout}
              </button>
            ))}
          </div>

          {/* Desktop Layout Options */}
          <div className="hidden md:flex flex-row items-center gap-2">
            {layoutOptionsDesktop.map((layout) => (
              <button
                key={layout}
                onClick={() => onLayoutChange(layout)}
                className={`px-4 py-2 rounded-lg text-xs ${selectedLayout === layout ? 'bg-gray-300 text-black' : 'bg-gray-200 text-black'} text-sm md:text-base`}
              >
                {layout}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
