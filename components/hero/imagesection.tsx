'use client'
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const images = [
  'https://via.placeholder.com/800x400', 
  'https://via.placeholder.com/800x401',
  'https://via.placeholder.com/800x402',
  'https://via.placeholder.com/800x403',
];

export const ImageSection = () => {
  return (
    <section className="w-full h-[78vh] min-h-[40vh] flex flex-col md:flex-row p-4">
      {/* Slider Image Section */}
      <div className="w-full md:w-3/5 h-full bg-gray-200">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          className="h-full"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={image} alt={`Slide ${index}`} className="w-full h-full object-cover" />
            </SwiperSlide>
          ))}
        </Swiper>
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
