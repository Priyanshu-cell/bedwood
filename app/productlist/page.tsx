'use client'
import { useState, useEffect } from "react";
import { Header, ProductsPage } from "@/src/components";
import { ArrowUpIcon } from "@heroicons/react/24/solid"; // Using Heroicons for the up arrow icon

export default function ProductListPage() {
  const [isVisible, setIsVisible] = useState(false);

  // Toggle button visibility when scrolling
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top when the button is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Add scroll event listener on component mount
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="relative">
      <Header />
      <ProductsPage />

      {/* Scroll to Top Button */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-10 right-1/2 transform translate-x-1/2 bg-orange-400 text-white p-2 rounded-md shadow-lg hover:bg-indigo-700 transition-all duration-300"
          aria-label="Scroll to Top"
        >
          <ArrowUpIcon className="h-4 w-4" /> {/* Reduced the size of the icon */}
        </button>
      )}
    </div>
  );
}
