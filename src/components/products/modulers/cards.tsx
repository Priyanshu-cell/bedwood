
'use client'
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Card } from '../index';
import Link from 'next/link';

const Modulers = [
  { image: 'https://via.placeholder.com/300', title: 'Modular 1', paragraph: 'Description 1' },
  { image: 'https://via.placeholder.com/300', title: 'Modular 2', paragraph: 'Description 2' },
  { image: 'https://via.placeholder.com/300', title: 'Modular 3', paragraph: 'Description 3' },
  { image: 'https://via.placeholder.com/300', title: 'Modular 4', paragraph: 'Description 4' },
  { image: 'https://via.placeholder.com/300', title: 'Modular 5', paragraph: 'Description 5' },
  { image: 'https://via.placeholder.com/300', title: 'Modular 6', paragraph: 'Description 6' },
  { image: 'https://via.placeholder.com/300', title: 'Modular 7', paragraph: 'Description 7' },
  { image: 'https://via.placeholder.com/300', title: 'Modular 8', paragraph: 'Description 8' }
];

export const ModulersSection = () => {
  return (
    <section className="w-full h-auto py-12 px-6 bg-gray-50">
      {/* Text Section */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center lg:justify-between mb-8 space-y-4 lg:space-y-0">
        <div className="text-start">
          <h2 className="md:text-2xl text-xl font-semibold mb-2">Modular Furniture Designs</h2>
          <p className="md:text-lg text-sm text-gray-600">The Trendsetters of the Year</p>
        </div>

        <div className="hidden lg:block text-center">
          <Link href="/productlist" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm">
            View All
          </Link>
        </div>
      </div>

      {/* Swiper for Horizontal Scrolling */}
      <Swiper
        modules={[Navigation]}
        navigation
        loop={false} // Disable looping
        spaceBetween={20} // Adjust space between slides
        breakpoints={{
          320: { slidesPerView: 1 }, // 1 card on small screens
          640: { slidesPerView: 2 }, // 2 cards on medium screens
          768: { slidesPerView: 3 }, // 3 cards on larger screens
          1024: { slidesPerView: 4 }, // 4 cards on very large screens
        }}
        className="relative p-4"
      >
        {Modulers.map((item, index) => (
          <SwiperSlide key={index}>
            <Card 
              image={item.image}
              title={item.title}
              paragraph={item.paragraph} link={''}            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

