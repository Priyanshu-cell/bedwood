import { Product } from "@/types";

export const getStoredCartItems = (): { product: Product; quantity: number }[] => {
  if (typeof window !== 'undefined') {
    const storedCart = localStorage.getItem('cartItems');
    try {
      return storedCart ? JSON.parse(storedCart) : [];
    } catch {
      return [];
    }
  }
  return [];
};

export const saveCartItems = (cartItems: { product: Product; quantity: number }[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }
};
