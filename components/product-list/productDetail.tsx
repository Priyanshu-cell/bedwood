'use client';
import React, { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css'; 
import { useRouter } from 'next/navigation'; // Import useRouter
import { Product } from '@/types';
import { getDummyProducts } from '@/utils/dummyData';
import { addToCart } from '@/utils/cartUtils';
import { ShoppingCartIcon, StarIcon } from "@heroicons/react/24/outline";
import { CartButton } from './cartButton';

interface ProductDetailProps {
  id: number;
}

const loadCartItems = () => {
  try {
    const storedItems = localStorage.getItem('cartItems');
    return storedItems ? JSON.parse(storedItems) : [];
  } catch (error) {
    console.error('Error loading cart items from localStorage:', error);
    return [];
  }
};

const saveCartItems = (cartItems: { product: Product; quantity: number }[]) => {
  try {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  } catch (error) {
    console.error('Error saving cart items to localStorage:', error);
  }
};

export const ProductDetail: React.FC<ProductDetailProps> = ({ id }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<{ product: Product; quantity: number }[]>(loadCartItems());
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    const fetchProduct = () => {
      const products = getDummyProducts(100);
      const product = products.find(p => p.id === id);
      setProduct(product || null);
      setIsLoading(false);
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    saveCartItems(cartItems);
  }, [cartItems]);

  const getRandomRating = (): number =>
    Math.floor(Math.random() * (5 - 3 + 1)) + 3;

  const rating = getRandomRating();

  const handleAddToCart = (product: Product) => {
    setCartItems(prevCart => {
      const itemIndex = prevCart.findIndex(item => item.product.id === product.id);
      if (itemIndex >= 0) {
        const newCart = [...prevCart];
        newCart[itemIndex].quantity += 1;
        return newCart;
      }
      return [...prevCart, { product, quantity: 1 }];
    });
    // Set notification message
    setNotification('Product added to cart!');
    // Clear notification after 3 seconds
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCartButtonClick = () => {
    router.push('/cart'); // Navigate to the cart page
  };

  if (isLoading) {
    return <p className='text-center font-semibold'>Loading...</p>;
  }

  if (!product) {
    return <p className='text-center font-semibold'>Product not found</p>;
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
    }
  ];

  return (
    <div className="flex flex-col">

      {/* Main Content */}
      <main className="flex flex-col md:flex-row items-center  p-4 md:p-6">
        {/* Product Image Gallery */}
        <div className="md:w-1/2 w-full flex flex-col items-center">
          <ImageGallery items={images} showNav={false} showFullscreenButton={false} showPlayButton={false} />
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 w-full max-w-md px-4 md:px-6 text-left">
          <h1 className="text-xl md:text-6xl font-bold text-gray-800 mb-2">
            {product.name}
          </h1>
          <p className="text-gray-600 text-lg md:text-3xl mb-2 ">
            High-quality furniture for your home.
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
            {product.price}
          </h2>

          {/* Rating */}
          <div className="flex items-center mb-4">
            {Array.from({ length: 5 }, (_, index) => (
              <StarIcon
                key={index}
                className={`w-6 h-6 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
              />
            ))}
            <span className="ml-2 text-gray-500">({rating}/5)</span>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => handleAddToCart(product)}
            className="bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-all"
          >
            Add to Cart
            <ShoppingCartIcon className="w-6 h-6 inline-block ml-2" />
          </button>
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
