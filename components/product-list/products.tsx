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

const saveCartItems = (cartItems: { product: Product; quantity: number }[]) => {
  try {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  } catch (error) {
    console.error('Error saving cart items to localStorage:', error);
  }
};

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
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSortOption, setSelectedSortOption] = useState('Price (Low to High)');
  const [selectedLayout, setSelectedLayout] = useState('3x3'); // Default layout for desktop
  const [openCart, setOpenCart] = useState(false);
  const [cartItems, setCartItems] = useState<{ product: Product; quantity: number }[]>(loadCartItems());
  const [hasMore, setHasMore] = useState(true);
  const [cartItemCount, setCartItemCount] = useRecoilState(cartItemsCountState);
  const perPage = 8;

  // Initial product load
  useEffect(() => {
    setProducts(getDummyProducts(100));
    setFilteredProducts(getDummyProducts(100));
  }, []);

  useEffect(() => {
    saveCartItems(cartItems);
    setCartItemCount(cartItems.length); // update Recoil state with the cart items count
  }, [cartItems, setCartItemCount]);

  useEffect(() => {
    let filtered = selectedCategory === 'All' 
      ? [...products]
      : products.filter(product => product.category === selectedCategory);

    const convertPriceToNumber = (price: string) => parseFloat(price.replace('$', ''));

    if (selectedSortOption === 'Price (Low to High)') {
      filtered = [...filtered].sort((a, b) => convertPriceToNumber(a.price) - convertPriceToNumber(b.price));
    } else if (selectedSortOption === 'Price (High to Low)') {
      filtered = [...filtered].sort((a, b) => convertPriceToNumber(b.price) - convertPriceToNumber(a.price));
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
    <section className="pb-12 bg-gray-100 min-h-screen">
      <div className="mx-auto max-w-8xl z-40">
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
          <CartButton onClick={openCartDialog}  itemCount={cartItemCount} />
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
