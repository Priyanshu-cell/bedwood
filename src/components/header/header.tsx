'use client'
import React, { useState, useEffect } from 'react';
import { LargeHeader } from "./large/largeheader";
import { SmallHeader } from "./small/smallheader";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Scroll event listener to detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      {/* Hide SmallHeader on mobile view */}
      <div className="hidden md:block">
        <SmallHeader />
      </div>
      <div>
        <LargeHeader isScrolled={isScrolled} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      </div>
    </div>
  );
};
