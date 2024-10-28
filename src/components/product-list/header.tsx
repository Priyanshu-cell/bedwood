import { useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useProducts } from '@/src/hooks/useProducts'; // Adjust the path as necessary
import { useRecoilState, useSetRecoilState } from 'recoil';
import { refetchProductData } from '@/src/state/atoms/refetchdata';
import { selectedCategoryState } from '@/src/state/atoms/filterstate';
import Link from 'next/link';

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
const layoutOptionsMobile = ['1x1', '2x2']; // Updated for mobile
const layoutOptionsDesktop = ['3x3', '4x4']; // Desktop layouts

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
      setrefetchdata(true);
      setSelectedCategory("");
      params.delete("categoryId"); // Clear categoryId parameter
      refetch(); // Refetch the products without category
    } else {
      setSelectedCategory(category);
      params.set("categoryId", category); // Set categoryId for other categories
      refetch(); // Refetch the products with the selected category
      setrefetchdata(false);
    }
  
    // Update the URL without refreshing, including query parameters
    window.history.replaceState({}, "", `/productlist?${params.toString()}`);
  };
  

  return (
    <div className="sticky md:top-8 top-0 bg-orange-50 shadow-xs shadow-slate-100 z-30">
      <div className="mx-auto max-w-8xl px-2 lg:px-8 py-4 flex flex-row justify-between items-center gap-4">
        
        {/* Left Section: Sort and Filter */}
        <div className="flex flex-row items-center gap-4">
          {/* Sort Selection */}
          <div className="hidden md:flex items-center space-x-2">
            <label htmlFor="sort" className="text-black text-sm md:text-base">Sort by:</label>
            <select
              id="sort"
              value={selectedSortOption}
              onChange={(e) => onSortChange(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white border text-gray-800 text-sm md:text-base"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Filter Selection */}
          <div className="md:flex space-x-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)} // Use the new handler
                className={`px-4 py-2 border rounded-lg ${selectedCategory === category ? 'bg-white text-black' : 'bg-white text-black'} text-sm md:text-base`}
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
              className="w-2/3 p-2 text-xs rounded-lg border bg-white text-gray-800 "
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
        <div className="flex flex-row items-center gap-2">
          {/* Mobile Layout Options */}
          <div className="md:hidden flex flex-row items-center gap-2">
            {layoutOptionsMobile.map((layout) => (
              <button
                key={layout}
                onClick={() => onLayoutChange(layout)}
                className={`px-2 py-2 border rounded-lg text-xs ${selectedLayout === layout ? 'bg-orange-200 text-black' : 'bg-white text-black'} text-sm`}
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
                className={`px-2 py-2 border rounded-lg text-xs ${selectedLayout === layout ? 'bg-orange-200 text-black' : 'bg-white text-black'} text-sm md:text-base`}
              >
                {layout}
              </button>
            ))}
          </div>

          {/* Catalog Download Button */}
          <Link
          href="/catalog"
           className="group relative">
            <button
              className="bg-white border md:w-10 md:h-10 h-7 w-7 flex justify-center items-center rounded-lg hover:text-orange-500 hover:translate-y-1 hover:duration-300"
            >
              <svg
                className="w-6 h-6"
                stroke="currentColor"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                  stroke-linejoin="round"
                  stroke-linecap="round"
                ></path>
              </svg>
            </button>

            <span
              className="absolute w-20 text-center -bottom-12 left-[50%] -translate-x-[50%] origin-bottom tracking-wider z-20 scale-0 px-1 rounded-lg bg-white text-orange-500 py-2 text-sm transition-all duration-300 ease-in-out group-hover:scale-100"
            >
              Catalog
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
