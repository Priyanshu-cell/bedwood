"use client";
import React from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FaTrash } from "react-icons/fa";
import { TProduct } from "@/src/services/product/product.type"; // Use TProduct instead of Product
import { WhatsAppCheckout } from "@/src/form/whatsappCheckOut";

interface CartDialogProps {
  open: boolean;
  onClose: () => void;
  cartItems: { product: TProduct; quantity: number }[]; // Changed to TProduct
  onUpdateQuantity: (productId: string, quantity: number) => void; // Ensure productId is a string
  onRemoveFromCart: (productId: string) => void;
  clearCart: () => void;
}

export const CartDialog: React.FC<CartDialogProps> = ({
  open,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveFromCart,
  clearCart,
}) => {
  // Calculate the subtotal for the cart
  const calculateSubtotal = () => {
    return cartItems
      .reduce(
        (total, { product, quantity }) => total + product.price * quantity, // Assuming price is a number now
        0
      )
      .toFixed(2);
  };

  // Handle checkout complete, clear cart and close the dialog
  const handleCheckoutComplete = () => {
    clearCart();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      />
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-screen pl-10 ">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition-transform duration-300 ease-in-out "
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 sm:px-6">
                  <div className="flex items-start justify-between sticky py-6 top-0 bg-white z-10">
                    <DialogTitle className="text-lg font-medium text-gray-900">
                      Shopping Cart
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={onClose}
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-4">
                    {cartItems.length === 0 ? (
                      <p className="text-center text-gray-500">
                        Your cart is empty.
                      </p>
                    ) : (
                      <ul>
                        {cartItems.map(({ product, quantity }) => (
                          <li
                            key={product._id}
                            className="flex py-4 border-b border-gray-200"
                          >
                            <img
                              src={product.image[0]}
                              alt={product.name}
                              className="w-20 h-20 object-cover mr-4"
                            />
                            <div className="flex-1 flex justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  {product.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {quantity > 1 ? (
                                    <>
                                      ${product.price} x {quantity} = $
                                      {(product.price * quantity).toFixed(2)}
                                    </>
                                  ) : (
                                    `$${product.price}`
                                  )}
                                </p>
                                <div className="mt-2">
                                  <div className="flex items-center space-x-2">
                                    <button
                                      onClick={() =>
                                        product._id &&
                                        onUpdateQuantity(
                                          product._id,
                                          quantity - 1
                                        )
                                      } // Check if _id is defined
                                      className="text-gray-500 hover:text-gray-700 px-2 bg-gray-200 rounded-md"
                                      disabled={quantity <= 1}
                                    >
                                      -
                                    </button>
                                    <p className="text-sm text-gray-500">
                                      {quantity}
                                    </p>
                                    <button
                                      onClick={() =>
                                        product._id &&
                                        onUpdateQuantity(
                                          product._id,
                                          quantity + 1
                                        )
                                      } // Check if _id is defined
                                      className="text-gray-500 hover:text-gray-700 px-2 bg-gray-200 rounded-md"
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <button
                                onClick={() =>
                                  product._id && onRemoveFromCart(product._id)
                                } // Check if _id is defined
                                className="text-red-500 hover:text-red-700 flex items-center"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                <div className="border-t border-gray-200">
                  <div className="flex items-center justify-between px-4 py-6 sm:px-6">
                    <p className="text-lg font-medium text-gray-900">
                      Subtotal
                    </p>
                    {/* Display the subtotal */}
                    <p className="text-lg font-medium text-gray-900">
                      ${calculateSubtotal()}
                    </p>
                  </div>
                  <div className="w-fit bg-blue-500 text-white py-2 px-6 m-4 rounded-md hover:bg-blue-600">
                    {/* WhatsAppCheckout Component with onCheckoutComplete */}
                    <WhatsAppCheckout
                      cartItems={cartItems}
                      onCheckoutComplete={handleCheckoutComplete}
                    />
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
