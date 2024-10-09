'use client'
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Card } from '../index';

const collections = [
  { image: '/collections/1.png', title: '', paragraph: 'Comfortable sofas for your living room' },
  { image: '/collections/2.png', title: '', paragraph: 'Stylish dining table for family meals' },
  { image: '/collections/3.png', title: '', paragraph: 'Cozy beds for good night sleep' },
  { image: '/collections/4.png', title: '', paragraph: 'Functional office desk for productivity' },
  { image: '/collections/5.png', title: '', paragraph: 'Elegent lamp for brightening up the room ' },
  { image: '/collections/6.png', title: '', paragraph: 'Perfect Study tables for productivity  ' },
  { image: '/collections/7.png', title: '', paragraph: 'Comfortable bed for restfull sleep' },
  { image: '/collections/8.png', title: '', paragraph: 'Outdoor Furniture' }
];

export const CollectionsSection = () => {
  return (
    <section className="w-full h-auto py-12 px-6 bg-gray-50">
      {/* Text Section */}
      <div className="text-start mb-8 ">
        <h2 className="md:text-2xl text-xl font-semibold mb-2">New Collections</h2>
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
        {collections.map((item, index) => (
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
