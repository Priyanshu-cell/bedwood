
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
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Modular Furniture Designs</h2>
        <Link href="/furnishing" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          View All
        </Link>
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
              paragraph={item.paragraph}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

