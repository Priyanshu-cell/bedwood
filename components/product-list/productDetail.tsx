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
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Form validation schema using Yup
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  phone: yup.string().matches(/^\d{10}$/, "Phone number must be exactly 10 digits").required("Phone number is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  postalCode: yup.string().required("Postal code is required"),
});

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
  const [cartItems, setCartItems] = useState<{ product: Product; quantity: number }[]>([]);
  const [cartItemCount, setCartItemCount] = useRecoilState(cartItemsCountState);
  const [quantity, setQuantity] = useState(1);
  const [isMounted, setIsMounted] = useState(false);
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // React Hook Form setup
  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
    },
    resolver: yupResolver(schema), // Yup schema for validation
  });

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

  // Load cart items only after the component is mounted
  useEffect(() => {
    if (isMounted) {
      const storedCartItems = loadCartItems();
      setCartItems(storedCartItems);
      setCartItemCount(storedCartItems.length);

      // Check if the product is already in the cart
      const productInCart = storedCartItems.some((item: { product: { id: number } }) => item.product.id === id);
      setIsProductInCart(productInCart);
    }
  }, [isMounted, setCartItemCount, id]);

  // Mark component as mounted after the first render
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    if (isMounted) {
      saveCartItems(cartItems);
      setCartItemCount(cartItems.length);
    }
  }, [cartItems, isMounted, setCartItemCount]);

  const getRandomRating = (): number => Math.floor(Math.random() * (5 - 3 + 1)) + 3;
  const rating = getRandomRating();

  const handleAddToCart = (product: Product) => {
    if (!isProductInCart) {
      setCartItems((prevCart) => [...prevCart, { product, quantity }]);
      setIsProductInCart(true);
      setNotification("Product added to cart!");
    } else {
      setNotification("This item is already in your cart!");
    }
    setTimeout(() => setNotification(null), 3000);
  };

  const handleBuyNow = () => {
    setShowModal(true);
  };

  const onSubmit = (data: { name: string; email: string; phone: string; address: string; city: string; postalCode: string; }) => {
    if (!product) return; // Ensure product details are available

    const productDetails = {
      name: product.name,
      category: product.category,
      quantity,
      price: product.price,
      description: product.description,
    };

    const message = `
*Product Details:*
Name: ${productDetails.name}
Category: ${productDetails.category}
Quantity: ${quantity}
Price: ${productDetails.price}
Description: ${productDetails.description}

*User Info:*
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Address: ${data.address}
City: ${data.city}
Postal Code: ${data.postalCode}
    `.trim();

    // Encode the message and create the WhatsApp link
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/8630715936?text=${encodedMessage}`;

    // Open the WhatsApp link in a new tab
    window.open(whatsappLink);

    // Close the modal
    setShowModal(false);

    // Reset form fields
    reset();
  };

  if (isLoading) {
    return <p className="text-center font-semibold">Loading...</p>;
  }

  if (!product) {
    return <p className="text-center font-semibold">Product not found</p>;
  }

  // Prepare images for the gallery
  const images = [
    { original: product.imageUrl, thumbnail: product.imageUrl },
    { original: `${product.imageUrl}?random=1`, thumbnail: `${product.imageUrl}?random=1` },
    { original: `${product.imageUrl}?random=2`, thumbnail: `${product.imageUrl}?random=2` },
    { original: `${product.imageUrl}?random=3`, thumbnail: `${product.imageUrl}?random=3` },
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
          <h2 className="md:text-4xl text-2xl font-bold mb-2">{product.name}</h2>
          <p className="text-gray-600 mb-4">{product.category}</p>
          <div className="mb-4">
            <span className="text-2xl font-bold mr-2">{product.price}</span>
          </div>

          <p className="text-gray-700 mb-4 text-balance">{product.description}</p>

          {/* Rating */}
          <div className="flex items-center ">
            {Array.from({ length: 5 }, (_, index) => (
              <StarIcon
                key={index}
                className={`w-6 h-6 ${index < rating ? "text-yellow-400" : "text-gray-300"}`}
              />
            ))}
            <span className="ml-2 text-gray-500">({rating}/5)</span>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-2 p-4 pl-0">
            <button
              onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
              className="bg-gray-300 text-gray-700 px-2 rounded-md"
            >
              -
            </button>
            <p>{quantity}</p>
            <button
              onClick={() => setQuantity((prev) => prev + 1)}
              className="bg-gray-300 text-gray-700 px-2 rounded-md"
            >
              +
            </button>
          </div>

          {/* Add to Cart Button */}
          <div className="flex flex-row space-x-4 my-4">
            <button
              onClick={() => handleAddToCart(product)}
              className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
            >
              <ShoppingCartIcon className="w-5 h-5" />
              <span>Add to Cart</span>
            </button>

            {/* Buy Now Button */}
            <button
              onClick={handleBuyNow}
              className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
            >
              <BiPurchaseTag className="w-5 h-5" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </main>

      {/* Notification for cart */}
      {notification && (
        <div className="fixed bottom-20 -right-20 transform -translate-x-1/2 bg-gray-50 border-t-4 border-green-500 p-4 rounded-md w-80">
          <p className="text-sm text-green-600 text-center">{notification}</p>
        </div>
      )}

      {/* Modal for the form */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Enter Your Details</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block font-semibold">Name</label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                      placeholder="Your name"
                    />
                  )}
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
              </div>

              <div>
                <label className="block font-semibold">Email</label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                      placeholder="Your email"
                    />
                  )}
                />
                {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
              </div>

              <div>
                <label className="block font-semibold">Phone</label>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                      placeholder="Your phone number"
                    />
                  )}
                />
                {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
              </div>

              <div>
                <label className="block font-semibold">Address</label>
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                      placeholder="Your address"
                    />
                  )}
                />
                {errors.address && <span className="text-red-500 text-sm">{errors.address.message}</span>}
              </div>

              <div>
                <label className="block font-semibold">City</label>
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                      placeholder="Your city"
                    />
                  )}
                />
                {errors.city && <span className="text-red-500 text-sm">{errors.city.message}</span>}
              </div>

              <div>
                <label className="block font-semibold">Postal Code</label>
                <Controller
                  name="postalCode"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                      placeholder="Your postal code"
                    />
                  )}
                />
                {errors.postalCode && <span className="text-red-500 text-sm">{errors.postalCode.message}</span>}
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
