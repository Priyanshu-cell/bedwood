import React from 'react';

export const TopPicksSection = () => {
  return (
    <section className="w-full h-auto py-12 px-6 bg-gray-50 flex flex-col items-center">
      {/* Text Section */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">Top Picks For You</h2>
        <p className="text-lg text-gray-600">Impressive Collection for Your Dream Home</p>
      </div>

      {/* Images Grid Section */}
      <div className="w-full max-w-7xl grid grid-cols-6 gap-2">
        {/* First Row */}
        <div className="col-span-1 flex items-center justify-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
            <img src="https://via.placeholder.com/150" alt="Top Pick 1" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="col-span-1 flex items-center justify-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
            <img src="https://via.placeholder.com/150" alt="Top Pick 2" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="col-span-1 flex items-center justify-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
            <img src="https://via.placeholder.com/150" alt="Top Pick 3" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="col-span-1 flex items-center justify-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
            <img src="https://via.placeholder.com/150" alt="Top Pick 4" className="w-full h-full object-cover" />
          </div>
        </div>
        {/* Second Row */}
        <div className="col-span-1 flex items-center justify-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
            <img src="https://via.placeholder.com/150" alt="Top Pick 5" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="col-span-1 flex items-center justify-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
            <img src="https://via.placeholder.com/150" alt="Top Pick 6" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="col-span-1 flex items-center justify-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
            <img src="https://via.placeholder.com/150" alt="Top Pick 7" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="col-span-1 flex items-center justify-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
            <img src="https://via.placeholder.com/150" alt="Top Pick 8" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="col-span-1 flex items-center justify-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
            <img src="https://via.placeholder.com/150" alt="Top Pick 9" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="col-span-1 flex items-center justify-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
            <img src="https://via.placeholder.com/150" alt="Top Pick 10" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="col-span-1 flex items-center justify-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
            <img src="https://via.placeholder.com/150" alt="Top Pick 11" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="col-span-1 flex items-center justify-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
            <img src="https://via.placeholder.com/150" alt="Top Pick 12" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};
