'use client'
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Card } from '../index';

const bestSellers = [
  { image: '/bestsellerof/1.png', title: '', paragraph: '' },
  { image: '/bestsellerof/2.png', title: '', paragraph: '' },
  { image: '/bestsellerof/3.png', title: '', paragraph: '' },
  { image: '/bestsellerof/4.png', title: '', paragraph: '' },
  { image: '/bestsellerof/5.png', title: '', paragraph: '' },
  { image: '/bestsellerof/6.png', title: '', paragraph: '' },
  { image: '/bestsellerof/7.png', title: '', paragraph: '' },
  { image: '/bestsellerof/8.png', title: '', paragraph: '' }
];

export const BestSellerSection = () => {
  return (
    <section className="w-full h-auto py-12 px-6 bg-gray-50">
      {/* Text Section */}
      <div className="text-start mb-8 px-4">
        <h2 className="text-2xl font-semibold mb-2">Best-Sellers of the Season</h2>
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
        {bestSellers.map((item, index) => (
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
