'use client'
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ProductCard } from './productCard';
import { Header } from './header';
import { CartDialog } from './cartDialog';
import { getDummyProducts } from '@/utils/dummyData';
import { Product } from '@/types';
import { CartButton } from './cartButton';
import { cartItemsCountState } from '@/state/atoms/countCartState';
import { useRecoilState } from 'recoil';
import { addToCart, updateCartItemQuantity, removeCartItem, getCartItems } from '@/utils/cartUtils';

export const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSortOption, setSelectedSortOption] = useState('Price (Low to High)');
  const [selectedLayout, setSelectedLayout] = useState('3x3');
  const [openCart, setOpenCart] = useState(false);
  const [cartItems, setCartItems] = useState<{ product: Product; quantity: number }[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [cartItemCount, setCartItemCount] = useRecoilState(cartItemsCountState);
  const perPage = 8;

  useEffect(() => {
    const initialProducts = getDummyProducts(100);
    setProducts(initialProducts);
    setFilteredProducts(initialProducts);
  }, []);

  useEffect(() => {
    setCartItemCount(cartItems.length);
  }, [cartItems, setCartItemCount]);

  useEffect(() => {
    let filtered = selectedCategory === 'All' 
      ? [...products]
      : products.filter(product => product.category === selectedCategory);

    const convertPriceToNumber = (price: string) => parseFloat(price.replace('$', ''));

    if (selectedSortOption === 'Price (Low to High)') {
      filtered.sort((a, b) => convertPriceToNumber(a.price) - convertPriceToNumber(b.price));
    } else if (selectedSortOption === 'Price (High to Low)') {
      filtered.sort((a, b) => convertPriceToNumber(b.price) - convertPriceToNumber(a.price));
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, selectedSortOption, products]);

  const fetchMoreData = () => {
    setTimeout(() => {
      setFilteredProducts(prev => [
        ...prev,
        ...getDummyProducts(prev.length + perPage),
      ]);
    }, 500);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setFilteredProducts(products.filter(product => category === 'All' || product.category === category));
  };

  const handleSortChange = (sortOption: string) => {
    setSelectedSortOption(sortOption);
  };

  const handleLayoutChange = (layout: string) => {
    setSelectedLayout(layout);
  };

  const handleAddToCart = (product: Product, quantity: number) => {
    addToCart(product, quantity);
    setCartItems(getCartItems());
  };

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    updateCartItemQuantity(productId, quantity);
    setCartItems(getCartItems());
  };

  const handleRemoveFromCart = (productId: number) => {
    removeCartItem(productId);
    setCartItems(getCartItems());
  };

  const openCartDialog = () => {
    setOpenCart(true);
  };

  return (
    <section className="pb-12 bg-gray-100 min-h-screen">
      <div className="mx-auto max-w-8xl">
        <Header 
          selectedCategory={selectedCategory} 
          onCategoryChange={handleCategoryChange} 
          selectedSortOption={selectedSortOption} 
          onSortChange={handleSortChange} 
          onLayoutChange={handleLayoutChange}
          selectedLayout={selectedLayout}
        />

        <InfiniteScroll
          dataLength={filteredProducts.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4 className='text-center md:text-xl text-sm font-semibold'>Loading...</h4>}
          endMessage={<p className='md:text-xl text-sm text-center font-semibold'>No more products</p>}
        >
          <div className={`grid gap-6 my-10 px-4 lg:px-8 
            ${selectedLayout === '2x2' ? 'grid-cols-2 md:grid-cols-3' 
            : selectedLayout === '3x3' ? 'grid-cols-3 md:grid-cols-3'
            : selectedLayout === '4x4' ? 'grid-cols-4 md:grid-cols-4'
            : 'grid-cols-5 md:grid-cols-5'}`}>
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
            ))}
          </div>
        </InfiniteScroll>

        <div className="fixed md:bottom-8 md:right-8 bottom-12 right-4">
          <CartButton onClick={openCartDialog} itemCount={cartItemCount} />
        </div>

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
