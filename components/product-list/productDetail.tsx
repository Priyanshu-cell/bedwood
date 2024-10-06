"use client";

import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useRecoilState } from "recoil";
import { cartItemsCountState } from "@/state/atoms/countCartState";
import { BiPurchaseTag } from "react-icons/bi";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TProduct } from "@/services/product/product.type"; // Importing the TProduct type
import { getProduct } from "@/services/product"; // Importing the getProduct function
import { useMutation } from "@tanstack/react-query";
import { OrderPost } from "@/services/order";

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
        console.log('Product Detial in useeffect', productDetail)
        setProduct(productDetail || null);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);
  console.log('Product Detail', product)

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
    console.log("Product", product._id)

    const OrderProductDetail = [{
      "productId": product._id,
      "quantity": quantity
    }]


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

    SendOrderData.mutateAsync({name: data.name, email: data.email, phone: data.phone, address: data.address, totalPrice: product.price, productDetails: OrderProductDetail})

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
    { original: product.image, thumbnail: product.image },
    { original: `${product.image}?random=1`, thumbnail: `${product.image}?random=1` },
    { original: `${product.image}?random=2`, thumbnail: `${product.image}?random=2` },
    { original: `${product.image}?random=3`, thumbnail: `${product.image}?random=3` },
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
          <div className="flex space-x-2 mt-4">
            <button
              onClick={() => handleAddToCart(product)}
              className="bg-blue-600 text-white py-2 px-4 rounded-md flex items-center"
            >
              <ShoppingCartIcon className="h-5 w-5 mr-2" />
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="bg-green-600 text-white py-2 px-4 rounded-md flex items-center"
            >
              <BiPurchaseTag className="h-5 w-5 mr-2" />
              Buy Now
            </button>
          </div>
        </div>
      </main>

      {/* Notification Display */}
      {notification && <div className="text-red-500 text-center my-4">{notification}</div>}

      {/* Modal for WhatsApp Order */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-bold mb-4">Order Product</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    placeholder="Your Name"
                    {...field}
                    className="w-full border-2 border-gray-300 p-2 rounded mb-4"
                  />
                )}
              />
              <p className="text-red-500">{errors.name?.message}</p>

              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <input
                    type="email"
                    placeholder="Your Email"
                    {...field}
                    className="w-full border-2 border-gray-300 p-2 rounded mb-4"
                  />
                )}
              />
              <p className="text-red-500">{errors.email?.message}</p>

              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <input
                    type="tel"
                    placeholder="Your Phone Number"
                    {...field}
                    className="w-full border-2 border-gray-300 p-2 rounded mb-4"
                  />
                )}
              />
              <p className="text-red-500">{errors.phone?.message}</p>

              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    placeholder="Your Address"
                    {...field}
                    className="w-full border-2 border-gray-300 p-2 rounded mb-4"
                  />
                )}
              />
              <p className="text-red-500">{errors.address?.message}</p>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded-md"
                >
                  Send Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
