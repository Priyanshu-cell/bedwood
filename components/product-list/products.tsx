'use client';
import React, { useEffect, useState } from 'react';
import { ProductCard } from './productCard';
import { Header } from './header';
import { Pagination } from './pagination';
import { CartDialog } from './cartDialog';
import { getDummyProducts } from '@/utils/dummyData';
import { Product } from '@/types';
import { CartButton } from './cartButton';

const saveCartItems = (cartItems: { product: Product; quantity: number }[]) => {
  try {
    console.log('Saving cart items:', cartItems); // Debugging log
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  } catch (error) {
    console.error('Error saving cart items to localStorage:', error);
  }
};

// New function to load cart items
const loadCartItems = () => {
  try {
    const storedItems = localStorage.getItem('cartItems');
    return storedItems ? JSON.parse(storedItems) : [];
  } catch (error) {
    console.error('Error loading cart items from localStorage:', error);
    return [];
  }
};

export const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openCart, setOpenCart] = useState(false);
  const [cartItems, setCartItems] = useState<{ product: Product; quantity: number }[]>(loadCartItems()); // Load cart items on initial state
  const perPage = 8;

  // Fetch dummy products when the component mounts
  useEffect(() => {
    const initialProducts = getDummyProducts();
    setProducts(initialProducts);
    setFilteredProducts(initialProducts);
  }, []);

  // Update cart items when cartItems state changes and save them to localStorage
  useEffect(() => {
    saveCartItems(cartItems);
  }, [cartItems]);

  // Handle category filtering
  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === selectedCategory));
    }
    setCurrentPage(1);
  }, [selectedCategory, products]);

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
      <div className="mx-auto max-w-8xl px-2 sm:px-4 lg:px-8">
        <Header selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
        
        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {paginatedProducts.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>

        {/* Pagination */}
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />

        {/* Cart Button */}
        <div className="fixed md:bottom-8 md:right-8 bottom-12 right-4">
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
