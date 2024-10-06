'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const images = [
  '/home/slide1.png', 
  '/home/slide2.png',
  '/home/slide3.png',
  '/home/slide4.png',
];

const sideImages = [
  '/home/sideimg1.png',
  '/home/sideimg2.png'
];

export const ImageSection = () => {
  return (
    <section className="w-full flex flex-col md:flex-row p-4">
      
      {/* Slider Image Section */}
      <div className="w-full md:w-2/3">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          className="h-[175px] md:h-[480px]" // Adjust height for mobile and desktop
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="w-full h-full flex items-center justify-center"> {/* Centering the image */}
                <img 
                  src={image} 
                  alt={`Slide ${index}`} 
                  className="w-full h-full object-cover" // Ensure it fills the container
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Other Images Section */}
      <div className="w-full md:w-1/3 flex-col hidden md:flex">
        {/* First Image */}
        <div className="w-full h-[240px]">
          <img 
            src={sideImages[0]} 
            alt="Side Image 1" 
            className="w-full h-full object-cover" 
          />
        </div>
        
        {/* Second Image */}
        <div className="w-full h-[240px]">
          <img 
            src={sideImages[1]} 
            alt="Side Image 2" 
            className="w-full h-full object-cover" 
          />
        </div>
      </div>
    </section>
  );
};
