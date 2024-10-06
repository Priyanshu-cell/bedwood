import { TProduct } from "@/services/product/product.type";

// Type for cart item
interface CartItem {
  product: TProduct;
  quantity: number;
}

// Load cart items from localStorage
export const getCartItems = (): CartItem[] => {
  try {
    const storedItems = localStorage.getItem('cartItems');
    return storedItems ? JSON.parse(storedItems) : [];
  } catch (error) {
    console.error('Error loading cart items from localStorage:', error);
    return [];
  }
};

// Save cart items to localStorage
export const saveCartItems = (cartItems: CartItem[]) => {
  try {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  } catch (error) {
    console.error('Error saving cart items to localStorage:', error);
  }
};

// Add item to cart
export const addToCart = (product: TProduct, quantity: number) => {
  const cartItems = getCartItems();
  const itemIndex = cartItems.findIndex(item => item.product._id === product._id);

  if (itemIndex >= 0) {
    cartItems[itemIndex].quantity += quantity;
  } else {
    cartItems.push({ product, quantity });
  }

  saveCartItems(cartItems);
};

// Update cart item quantity
export const updateCartItemQuantity = (productId: string, quantity: number) => {
  const cartItems = getCartItems();
  const itemIndex = cartItems.findIndex(item => item.product._id === productId);

  if (itemIndex >= 0) {
    if (quantity <= 0) {
      cartItems.splice(itemIndex, 1); // Remove the item
    } else {
      cartItems[itemIndex].quantity = quantity;
    }
    saveCartItems(cartItems);
  }
};

// Remove item from cart
export const removeCartItem = (productId: string) => {
  const cartItems = getCartItems().filter(item => item.product._id !== productId);
  saveCartItems(cartItems);
};

// Remove cart items on checkout
export const clearCartItems = () => {
  localStorage.removeItem('cartItems'); // Clear the cart from localStorage
};
