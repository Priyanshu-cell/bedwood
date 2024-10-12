"use client";
import React, { useEffect, useState } from "react";
import { ProductCard } from "./productCard";
import { Header } from "./header";
import { CartDialog } from "./cartDialog";
import { TProduct } from "@/src/services/product/product.type";
import { CartButton } from "./cartButton";
import { cartItemsCountState } from "@/src/state/atoms/countCartState";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  addToCart,
  updateCartItemQuantity,
  removeCartItem,
  getCartItems,
} from "@/src/utils/cartUtils";
import { useProducts } from "@/src/hooks/useProducts";
import { selectedCategoryState, selectedSubCategoryState } from "@/src/state/atoms/filterstate"; // Import selectedSubCategoryState
import { refetchProductData } from "@/src/state/atoms/refetchdata";

export const ProductsPage: React.FC = () => {
  const [sortValue, setSortValue] = useState<string>("1"); // Default to low to high
  const categoryId = useRecoilValue(selectedCategoryState);
  const SubCategoryId = useRecoilValue(selectedSubCategoryState); // Get selected subcategory
  const { data, isLoading, isError, refetch } = useProducts(
    sortValue,
    categoryId,
    SubCategoryId // Pass subcategory to the hook
  );
  const refetchdata = useRecoilValue(refetchProductData);

  if (refetchdata) {
    refetch();
    console.log("Refetch Data", refetchdata);
  }

  useEffect(() => {
    refetch();
  }, [refetchdata]);

  // Extract products from response data
  const products = data?.data || [];

  const [selectedCategory, setSelectedCategory] = useRecoilState(
    selectedCategoryState
  );
  const [selectedSubCategory, setSelectedSubCategory] = useRecoilState(
    selectedSubCategoryState
  )
  const [selectedLayout, setSelectedLayout] = useState("2x2");
  const [openCart, setOpenCart] = useState(false);
  const [cartItems, setCartItems] = useState< 
    { product: TProduct; quantity: number; variation?: string }[] 
  >([]);
  const [cartItemCount, setCartItemCount] = useRecoilState(cartItemsCountState);

  // console.log("Products Category", products);
  console.log("Selected category", selectedCategory);
  console.log("Selected Subcategory", selectedSubCategory);

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

  // Handle subcategory change
  const handleSubSubCategoryChange = (Subcategory: string) => {
    setSelectedSubCategory(Subcategory);
  };

  // Handle sorting changes
  const handleSortChange = (sortOption: string) => {
    setSortValue(sortOption);
  };

  // Handle layout change
  const handleLayoutChange = (layout: string) => {
    setSelectedLayout(layout);
  };

  // Add product to cart
  const handleAddToCart = (
    product: TProduct,
    quantity: number,
    variationId?: string
  ) => {
    addToCart(product, quantity, variationId);
    setCartItems(getCartItems());
  };

  // Update product quantity in cart
  const handleUpdateQuantity = (
    productId: string,
    quantity: number,
    variationId?: string
  ) => {
    updateCartItemQuantity(productId, quantity, variationId);
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

  // console.log("Products in list", products);

  if (isLoading) return <div className="text-center">Loading products...</div>;
  if (isError)
    return <div className="text-center">Error fetching products!</div>;

  return (
    <section className="pb-12 bg-gray-100 min-h-screen">
      <div className="mx-auto max-w-8xl">
        <Header
          selectedCategory={selectedCategory}
          onSortChange={handleSortChange}
          onLayoutChange={handleLayoutChange}
          selectedLayout={selectedLayout}
          selectedSortOption={sortValue}
        />

        {/* Product Grid Layout */}
        <div className="py-10 px-2 lg:px-8 mx-auto">
          {/* Mobile: Default to 2x2 */}
          <div
            className={`grid gap-4 transition-transform duration-200 ease-in-out ${
              selectedLayout === "1x1"
                ? "grid-cols-1"
                : selectedLayout === "2x2"
                ? "grid-cols-2"
                : "grid-cols-2" // Default to 2x2 for mobile
            } md:hidden`} // Hide on desktop
          >
            {isLoading ? (
              <p>Loading products...</p>
            ) : isError ? (
              <p>Failed to load products.</p>
            ) : products.length > 0 ? (
              products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>

          {/* Desktop: Default to 3x3 */}
          <div
            className={`hidden md:grid gap-4 transition-transform duration-200 ease-in-out ${
              selectedLayout === "3x3"
                ? "md:grid-cols-3"
                : selectedLayout === "4x4"
                ? "md:grid-cols-4"
                : "md:grid-cols-3" // Default to 3x3 for desktop
            }`}
          >
            {isLoading ? (
              <p>Loading products...</p>
            ) : isError ? (
              <p>Failed to load products.</p>
            ) : products.length > 0 ? (
              products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>
        </div>

        {/* Cart Button */}
        <div className="fixed md:bottom-8 md:right-8 bottom-12 right-4">
          <CartButton
            onClick={() => setOpenCart(true)}
            itemCount={cartItemCount}
          />
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
