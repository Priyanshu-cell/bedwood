'use client';

import React, { useEffect, useState } from 'react';
import { ProductCard } from './productCard';
import { Header } from './header';
import { Pagination } from './pagination';
import { CartDialog } from './cartDialog';
import { getDummyProducts } from '@/utils/dummyData';
import { Product } from '@/types';
import { CartButton } from './cartButton';

const getStoredCartItems = (): { product: Product; quantity: number }[] => {
  if (typeof window !== 'undefined') {
    const storedCart = localStorage.getItem('cartItems');
    try {
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error('Error parsing cart items from localStorage:', error);
      return [];
    }
  }
  return [];
};

const saveCartItems = (cartItems: { product: Product; quantity: number }[]) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart items to localStorage:', error);
    }
  }
};

export const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openCart, setOpenCart] = useState(false);
  const [cartItems, setCartItems] = useState<{ product: Product; quantity: number }[]>([]);
  const perPage = 8;

  useEffect(() => {
    const initialProducts = getDummyProducts();
    setProducts(initialProducts);
    setFilteredProducts(initialProducts);
  }, []);

  useEffect(() => {
    const storedItems = getStoredCartItems();
    setCartItems(storedItems);
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === selectedCategory));
    }
    setCurrentPage(1);
  }, [selectedCategory, products]);

  useEffect(() => {
    saveCartItems(cartItems);
  }, [cartItems]);

  const totalPages = Math.ceil(filteredProducts.length / perPage);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * perPage, currentPage * perPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

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
  };

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    setCartItems(prevCart => {
      const itemIndex = prevCart.findIndex(item => item.product.id === productId);
      if (itemIndex >= 0) {
        if (quantity <= 0) {
          return prevCart.filter(item => item.product.id !== productId);
        }
        const newCart = [...prevCart];
        newCart[itemIndex].quantity = quantity;
        return newCart;
      }
      return prevCart;
    });
  };

  const handleRemoveFromCart = (productId: number) => {
    setCartItems(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const openCartDialog = () => {
    setOpenCart(true);
  };

  return (
    <section className="py-12 bg-gray-100">
      <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
        <Header selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
        
        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {paginatedProducts.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>

        {/* Pagination */}
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />

        {/* Cart Button */}
        <div className="fixed bottom-8 right-8">
          <CartButton onClick={openCartDialog} itemCount={cartItems.length} />
        </div>

        {/* Cart Dialog */}
        <CartDialog
          open={openCart}
          onClose={() => setOpenCart(false)}
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveFromCart={handleRemoveFromCart}
        />
      </div>
    </section>
  );
};
