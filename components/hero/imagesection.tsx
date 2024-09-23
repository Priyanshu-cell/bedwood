'use client'
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const images = [
  '/home/slide3.jpg', 
  '/home/slide2.jpg',
  '/home/slide1.jpg',
];

const sideImages = [
  '/home/sideimg1.jpg',
  '/home/sideimg2.jpg'
];

export const ImageSection = () => {
  return (
    <section className="w-full md:h-[72vh] min-h-[20vh] flex flex-col md:flex-row p-4">
      {/* Slider Image Section */}
      <div className="w-full h-[30vh] md:w-3/5 md:h-full bg-gray-200">
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
      <div className="w-full md:w-2/5 h-full md:flex-col flex-row md:block hidden">
        {/* First Image */}
        <div className="w-full h-1/2 bg-gray-300 flex items-center justify-center">
          <img src={sideImages[0]} alt="Side Image 1" className="w-full h-full object-cover" />
        </div>
        {/* Second Image */}
        <div className="w-full h-1/2 bg-gray-400 flex items-center justify-center">
          <img src={sideImages[1]} alt="Side Image 2" className="w-full h-full object-cover" />
        </div>
      </div>
    </section>
  );
};
