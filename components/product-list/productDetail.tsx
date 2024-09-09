"use client";
import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Product } from "@/types";
import { getDummyProducts } from "@/utils/dummyData";
import { ShoppingCartIcon, StarIcon } from "@heroicons/react/24/outline";
import { useRecoilState } from "recoil";
import { cartItemsCountState } from "@/state/atoms/countCartState";
import { BiPurchaseTag } from "react-icons/bi";
import { OrderForm } from "@/form/orderForm";

interface ProductDetailProps {
  id: number;
}

const loadCartItems = () => {
  try {
    const storedItems = localStorage.getItem("cartItems");
    return storedItems ? JSON.parse(storedItems) : [];
  } catch (error) {
    console.error("Error loading cart items from localStorage:", error);
    return [];
  }
};

const saveCartItems = (cartItems: { product: Product; quantity: number }[]) => {
  try {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  } catch (error) {
    console.error("Error saving cart items to localStorage:", error);
  }
};

export const ProductDetail: React.FC<ProductDetailProps> = ({ id }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<
    { product: Product; quantity: number }[]
  >([]);
  const [cartItemCount, setCartItemCount] = useRecoilState(cartItemsCountState);
  const [isMounted, setIsMounted] = useState(false); // Track if component is mounted

  // Fetch product data
  useEffect(() => {
    const fetchProduct = () => {
      const products = getDummyProducts(100);
      const product = products.find((p) => p.id === id);
      setProduct(product || null);
      setIsLoading(false);
    };

    fetchProduct();
  }, [id]);

  // Load cart items only after the component is mounted (to avoid hydration issues)
  useEffect(() => {
    if (isMounted) {
      const storedCartItems = loadCartItems();
      setCartItems(storedCartItems);
      setCartItemCount(storedCartItems.length); // Set initial cart count from localStorage
    }
  }, [isMounted, setCartItemCount]);

  // Mark component as mounted after the first render
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    if (isMounted) {
      saveCartItems(cartItems);
      setCartItemCount(cartItems.length); // update Recoil state with the cart items count
    }
  }, [cartItems, isMounted, setCartItemCount]);

  const getRandomRating = (): number =>
    Math.floor(Math.random() * (5 - 3 + 1)) + 3;

  const rating = getRandomRating();

  const handleAddToCart = (product: Product) => {
    setCartItems((prevCart) => {
      const itemIndex = prevCart.findIndex(
        (item) => item.product.id === product.id
      );
      if (itemIndex >= 0) {
        const newCart = [...prevCart];
        newCart[itemIndex].quantity += 1;
        return newCart;
      }
      return [...prevCart, { product, quantity: 1 }];
    });
    // Set notification message
    setNotification("Product added to cart!");
    // Clear notification after 3 seconds
    setTimeout(() => setNotification(null), 3000);
  };

  if (isLoading) {
    return <p className="text-center font-semibold">Loading...</p>;
  }

  if (!product) {
    return <p className="text-center font-semibold">Product not found</p>;
  }

  // Prepare images for the gallery
  const images = [
    {
      original: product.imageUrl,
      thumbnail: product.imageUrl,
    },
    {
      original: `${product.imageUrl}?random=1`,
      thumbnail: `${product.imageUrl}?random=1`,
    },
    {
      original: `${product.imageUrl}?random=2`,
      thumbnail: `${product.imageUrl}?random=2`,
    },
    {
      original: `${product.imageUrl}?random=3`,
      thumbnail: `${product.imageUrl}?random=3`,
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Main Content */}
      <main className="flex flex-col md:flex-row items-center pt-4 md:pt-6">
        {/* Product Image Gallery */}
        <div className="md:w-1/2 w-full flex flex-col items-center">
          <div className="w-full md:w-auto px-4">
            <ImageGallery
              items={images}
              showNav={false}
              showFullscreenButton={false}
              showPlayButton={false}
              disableSwipe={false}
              showThumbnails={true}
              showBullets={false}
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 px-4 md:m-0 m-6">
          <h2 className="md:text-4xl text-2xl font-bold mb-2">
            {product.name}
          </h2>
          <p className="text-gray-600 mb-4">{product.category}</p>
          <div className="mb-4">
            <span className="text-2xl font-bold mr-2">{product.price}</span>
          </div>

          <p className="text-gray-700 mb-6 text-balance">
            Experience premium sound quality and industry-leading noise
            cancellation with these wireless headphones. Perfect for music
            lovers and frequent travelers.
          </p>

          {/* Rating */}
          <div className="flex items-center mb-4">
            {Array.from({ length: 5 }, (_, index) => (
              <StarIcon
                key={index}
                className={`w-6 h-6 ${
                  index < rating ? "text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2 text-gray-500">({rating}/5)</span>
          </div>

          <div className="flex space-x-4 mb-6 text-nowrap text-xs md:text-sm">
            {/* Add to Cart Button */}
            <button
              onClick={() => handleAddToCart(product)}
              className="bg-gray-800 text-white  py-2 px-4 rounded-md hover:bg-gray-700 transition-all"
            >
              Add to Cart
              <ShoppingCartIcon className="w-6 h-6 inline-block ml-2" />
            </button>
            <button onClick={()=>OrderForm(cartItems, onclose())} className="bg-green-400 flex gap-2 items-center  text-white px-6 py-2 rounded-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
              <BiPurchaseTag className="w-6 h-6 inline-block " />
              BUY NOW
            </button>
          </div>
        </div>
      </main>

      {/* Notification */}
      {notification && (
        <div className="fixed bottom-5 right-5 bg-green-500 text-white px-4 py-2 rounded-md shadow-md transition-opacity duration-300">
          {notification}
        </div>
      )}
    </div>
  );
};
