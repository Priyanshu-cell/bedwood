'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Card } from './card';

interface Review {
  name: string;
  review: string;
  rating: number;
}

const sampleReviews: Review[] = [
  { name: 'John Doe', review: 'This podcast is amazing!', rating: 3 },
  { name: 'Jane Smith', review: 'A must-listen for true crime enthusiasts!', rating: 4 },
  { name: 'Emily Johnson', review: 'Highly recommend!', rating: 5 },
  { name: 'Michael Brown', review: 'Fantastic podcast with great storytelling.', rating: 4 },
  { name: 'Laura White', review: 'An engaging and enjoyable listen.', rating: 5 },
];

export const ReviewSection: React.FC = () => {
  return (
    <section className="bg-white px-4 py-12 md:py-24">
      <div className="max-w-screen-2xl mx-auto">
        <h2 className="font-semibold text-black text-center md:text-3xl text-lg leading-none uppercase max-w-2xl mx-auto mb-12">
          Their Words, Our Pride
        </h2>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="h-full"
        >
          {sampleReviews.map((review, index) => (
            <SwiperSlide key={index}>
              <Card
                name={review.name}
                review={review.review}
                rating={review.rating}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
