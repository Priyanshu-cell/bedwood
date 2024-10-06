"use client";

import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useRecoilState } from "recoil";
import { cartItemsCountState } from "@/src/state/atoms/countCartState";
import { BiPurchaseTag } from "react-icons/bi";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TProduct } from "@/src/services/product/product.type"; // Importing the TProduct type
import { getProduct } from "@/src/services/product"; // Importing the getProduct function
import { useMutation } from "@tanstack/react-query";
import { OrderPost } from "@/src/services/order";

// Form validation schema using Yup
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  phone: yup.string().matches(/^\d{10}$/, "Phone number must be exactly 10 digits").required("Phone number is required"),
  address: yup.string().required("Address is required"),
});

interface ProductDetailProps {
  id: string; // Changed to string to match the _id type in TProduct
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

const saveCartItems = (cartItems: { product: TProduct; quantity: number }[]) => {
  try {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  } catch (error) {
    console.error("Error saving cart items to localStorage:", error);
  }
};

export const ProductDetail: React.FC<ProductDetailProps> = ({ id }) => {
  const [product, setProduct] = useState<TProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<{ product: TProduct; quantity: number }[]>([]);
  const [cartItemCount, setCartItemCount] = useRecoilState(cartItemsCountState);
  const [quantity, setQuantity] = useState(1);
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // React Hook Form setup
  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
    resolver: yupResolver(schema), // Yup schema for validation
  });

  // Fetch product data using getProduct
  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const productDetail = await getProduct(id); // Fetch product by ID
        setProduct(productDetail || null);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Load cart items
  useEffect(() => {
    const storedCartItems = loadCartItems();
    setCartItems(storedCartItems);
    setCartItemCount(storedCartItems.length);

    // Check if the product is already in the cart
    const productInCart = storedCartItems.some((item: { product: { _id: string; }; }) => item.product._id === id);
    setIsProductInCart(productInCart);
  }, [setCartItemCount, id]);

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    saveCartItems(cartItems);
    setCartItemCount(cartItems.length);
  }, [cartItems, setCartItemCount]);

  const handleAddToCart = (product: TProduct) => {
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

  const SendOrderData = useMutation({
    mutationFn: OrderPost,
    onSuccess: (response) => {
      console.log('Form Data submitted successfully', response);
      
    },
    onError: (error) => {
      console.error('Error saving data:', error);
      // Handle the error appropriately
    },
  });

  const onSubmit = (data: { name: string; email: string; phone: string; address: string; }) => {
    if (!product) return; // Ensure product details are available

    const OrderProductDetail = [{
      "productId": product._id,
      "quantity": quantity
    }];

    const message = `
*Product Details:*
Name: ${product.name}
Category: ${product.category}
Quantity: ${quantity}
Price: ${product.price}
Description: ${product.descriptions}

*User Info:*
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Address: ${data.address}
    `.trim();

    // Encode the message and create the WhatsApp link
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/8630715936?text=${encodedMessage}`;

    // Open the WhatsApp link in a new tab
    window.open(whatsappLink);

    SendOrderData.mutateAsync({name: data.name, email: data.email, phone: data.phone, address: data.address, totalPrice: product.price, productDetails: OrderProductDetail});

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

  // Prepare images for the gallery by mapping over product.image
  const images = product.image.map((imgUrl) => ({
    original: imgUrl,
    thumbnail: imgUrl,
  }));

  return (
    <div className="flex flex-col">
      {/* Main Content */}
      <main className="flex flex-col md:flex-row items-center pt-4 md:pt-6">
        {/* Product Image Gallery */}
        <div className="md:w-1/2 w-full flex flex-col items-center">
          <div className="w-full md:w-auto px-4">
            <ImageGallery
              items={images} // Use mapped images here
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
          <p className="text-gray-600 mb-4">{product.category}</p> {/* Updated to use category */}
          <div className="mb-4">
            <span className="text-2xl font-bold mr-2">{product.price}</span>
          </div>

          <p className="text-gray-700 mb-4 text-balance">{product.descriptions}</p>

          {/* Variation Section */}
          {product.variations && product.variations.length > 0 && (
            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-2">Variations</h4>
              <ul className="list-disc pl-5">
                {product.variations.map((variation, index) => (
                  <li key={index} className="text-gray-700">{variation.type}: {variation.value}</li>
                ))}
              </ul>
            </div>
          )}

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
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleAddToCart(product)}
              disabled={isProductInCart}
              className={`flex items-center px-4 py-2 text-white rounded-md ${isProductInCart ? "bg-gray-400" : "bg-green-600"}`}
            >
              <ShoppingCartIcon className="h-5 w-5 mr-2" />
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="bg-blue-600 flex items-center px-4 py-2 text-white rounded-md"
            >
              <BiPurchaseTag className="h-5 w-5 mr-2" />
              Buy Now
            </button>
          </div>
        </div>
      </main>

      {/* Success Notification */}
      {notification && (
        <p className="text-green-500 mt-2 text-center">{notification}</p>
      )}

      {/* Order Form Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative bg-white w-full max-w-md p-6 mx-auto rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Buy Now</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Name Input */}
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      id="name"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      {...field}
                    />
                  )}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>

              {/* Email Input */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="email"
                      id="email"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      {...field}
                    />
                  )}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>

              {/* Phone Input */}
              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      id="phone"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      {...field}
                    />
                  )}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
              </div>

              {/* Address Input */}
              <div className="mb-4">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      id="address"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      {...field}
                    />
                  )}
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                Confirm Purchase
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
