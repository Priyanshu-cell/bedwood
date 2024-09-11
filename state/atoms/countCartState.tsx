import { atom, selector } from 'recoil';

// Default cart item count state
export const cartItemsCountState = atom<number>({
  key: 'cartitemscount', // unique key for the atom
  default: 0, // Default to 0 to prevent SSR/localStorage issues
});

// Selector to load cart items count from localStorage after mounting
export const cartItemsCountFromStorage = selector<number>({
  key: 'cartitemscountFromStorage', 
  get: ({ get }) => {
    if (typeof window === 'undefined') return get(cartItemsCountState); // Return default value if SSR
    try {
      const storedItems = localStorage.getItem('cartItems');
      const cartItems = storedItems ? JSON.parse(storedItems) : [];
      return cartItems.length;
    } catch (error) {
      console.error('Error loading cart items count from localStorage:', error);
      return get(cartItemsCountState); // Fallback to default value if error
    }
  },
});
