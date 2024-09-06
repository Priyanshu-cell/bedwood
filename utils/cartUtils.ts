import { Product } from '@/types';

// Get cart items from localStorage
export const getStoredCartItems = (): { product: Product; quantity: number }[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const storedItems = localStorage.getItem('cartItems');
    return storedItems ? JSON.parse(storedItems) : [];
  } catch (error) {
    console.error('Error loading cart items from localStorage:', error);
    return [];
  }
};

// Save cart items to localStorage
export const saveCartItems = (cartItems: { product: Product; quantity: number }[]) => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  } catch (error) {
    console.error('Error saving cart items to localStorage:', error);
  }
};
