import React from 'react';

export const ImageSection = () => {
  return (
    <section className="w-full h-[78vh] min-h-[40vh] flex flex-col md:flex-row p-4">
      {/* Slider Image Section */}
      <div className="w-full md:w-3/5 h-full bg-gray-200 flex items-center justify-center">
        {/* Add your slider here */}
        <div className="w-full h-full bg-blue-50 flex items-center justify-center">
          <p>Slider Images Here</p>
        </div>
      </div>

      {/* Other Images Section */}
      <div className="w-full md:w-2/5 h-full flex md:flex-col flex-row">
        {/* First Image */}
        <div className="w-full h-1/2 bg-gray-300 flex items-center justify-center">
          {/* Add your first image here */}
          <p>First Image Here</p>
        </div>
        {/* Second Image */}
        <div className="w-full h-1/2 bg-gray-400 flex items-center justify-center">
          {/* Add your second image here */}
          <p>Second Image Here</p>
        </div>
      </div>
    </section>
  );
};
