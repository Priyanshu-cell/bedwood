'use client'
import React, { useEffect, useState } from "react";
import { ProductCard } from "./productCard";
import { Header } from "./header";
import { CartDialog } from "./cartDialog";
import { TProduct } from "@/services/product/product.type";
import { CartButton } from "./cartButton";
import { cartItemsCountState } from "@/state/atoms/countCartState";
import { useRecoilState } from "recoil";
import { addToCart, updateCartItemQuantity, removeCartItem, getCartItems } from "@/utils/cartUtils";
import { useProducts } from "@/hooks/useProducts";

export const ProductsPage: React.FC = () => {
  const [sortValue, setSortValue] = useState<string>('1'); // Default to low to high
  const { data, isLoading, isError } = useProducts(sortValue);
  
  // Extract products from response data
  const products = data?.data || [];

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLayout, setSelectedLayout] = useState("2x2");
  const [openCart, setOpenCart] = useState(false);
  const [cartItems, setCartItems] = useState<{ product: TProduct; quantity: number; }[]>([]);
  const [cartItemCount, setCartItemCount] = useRecoilState(cartItemsCountState);

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const storedItems = getCartItems();
    setCartItems(storedItems);
  }, []);

  // Update cart item count whenever cartItems state changes
  useEffect(() => {
    setCartItemCount(cartItems.length);
  }, [cartItems, setCartItemCount]);

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  // Handle sorting changes
  const handleSortChange = (sortOption: string) => {
    setSortValue(sortOption); // Update this line to change sorting based on selected option
  };

  // Handle layout change
  const handleLayoutChange = (layout: string) => {
    setSelectedLayout(layout);
  };

  // Add product to cart
  const handleAddToCart = (product: TProduct, quantity: number) => {
    addToCart(product, quantity);
    setCartItems(getCartItems());
  };

  // Update product quantity in cart
  const handleUpdateQuantity = (productId: string, quantity: number) => {
    updateCartItemQuantity(productId, quantity);
    setCartItems(getCartItems());
  };

  // Remove product from cart
  const handleRemoveFromCart = (productId: string) => {
    removeCartItem(productId);
    setCartItems(getCartItems());
  };

  // Clear the cart
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  if (isLoading) return <div className="text-center">Loading products...</div>;
  if (isError) return <div className="text-center">Error fetching products!</div>;

  return (
    <section className="pb-12 bg-gray-100 min-h-screen">
      <div className="mx-auto max-w-8xl">
        <Header
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          onSortChange={handleSortChange}
          onLayoutChange={handleLayoutChange}
          selectedLayout={selectedLayout}
          selectedSortOption={sortValue}
        />

        {/* Product Grid Layout */}
        <div
          className={`grid gap-6 my-10 px-4 lg:px-8 
          ${selectedLayout === "2x2" ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-3" : 
            selectedLayout === "3x3" ? "grid-cols-3 lg:grid-cols-3" : 
            selectedLayout === "4x4" ? "grid-cols-4 lg:grid-cols-4" : 
            selectedLayout === "5x5" ? "grid-cols-5 lg:grid-cols-5" : ""}`
          }
        >
          {/* Render Product Cards */}
          {products.map((product: TProduct) => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {/* Cart Button */}
        <div className="fixed md:bottom-8 md:right-8 bottom-12 right-4">
          <CartButton onClick={() => setOpenCart(true)} itemCount={cartItemCount} />
        </div>

        {/* Cart Dialog */}
        <CartDialog
          open={openCart}
          onClose={() => setOpenCart(false)}
          cartItems={cartItems}
          onRemoveFromCart={handleRemoveFromCart}
          onUpdateQuantity={handleUpdateQuantity}
          clearCart={clearCart}
        />
      </div>
    </section>
  );
};
