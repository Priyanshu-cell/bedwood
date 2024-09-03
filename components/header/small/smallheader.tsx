import React from 'react';

export const SmallHeader = () => {
  return (
    <header className="w-full h-auto p-4 md:px-44 bg-orange-100 flex flex-col md:flex-row md:items-center justify-between">
      {/* Location Section with Icon */}
      <div className="flex flex-row items-center text-base text-gray-800">
        {/* Location Marker SVG */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="h-5 w-5 text-gray-800 mr-2">
          <path fill="#282828" d="M100.232 149.198c-2.8 0-5.4-1.8-7.2-5.2-22.2-41-22.4-41.4-22.4-41.6-3.2-5.1-4.9-11.3-4.9-17.6 0-19.1 15.5-34.6 34.6-34.6s34.6 15.5 34.6 34.6c0 6.5-1.8 12.8-5.2 18.2 0 0-1.2 2.4-22.2 41-1.9 3.4-4.4 5.2-7.3 5.2zm.1-95c-16.9 0-30.6 13.7-30.6 30.6 0 5.6 1.5 11.1 4.5 15.9.6 1.3 16.4 30.4 22.4 41.5 2.1 3.9 5.2 3.9 7.4 0 7.5-13.8 21.7-40.1 22.2-41 3.1-5 4.7-10.6 4.7-16.3-.1-17-13.8-30.7-30.6-30.7z"/>
          <path fill="#282828" d="M100.332 105.598c-10.6 0-19.1-8.6-19.1-19.1s8.5-19.2 19.1-19.2c10.6 0 19.1 8.6 19.1 19.1s-8.6 19.2-19.1 19.2zm0-34.3c-8.3 0-15.1 6.8-15.1 15.1s6.8 15.1 15.1 15.1 15.1-6.8 15.1-15.1-6.8-15.1-15.1-15.1z"/>
        </svg>
        <p className="font-semibold">Location - </p>
        <p className="text-sm md:pl-1">Dehradun</p>
      </div>
      
      {/* Contact and Info Section */}
      <div className="flex flex-col md:flex-row  text-gray-600 text-sm mt-2 md:mt-0 space-y-2 md:space-y-0 md:divide-x-2 divide-gray-600">
        <p className="md:px-2 px-6">+91-1111111111</p>
        <p className="md:px-2 px-6">Track</p>
        <p className="md:px-2 px-6">Help Center</p>
      </div>
    </header>
  );
};
