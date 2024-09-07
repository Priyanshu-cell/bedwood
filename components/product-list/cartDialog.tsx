import React from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FaTrash } from "react-icons/fa"; // Import the trash icon
import { Product } from "@/types";
import Link from "next/link";

interface CartDialogProps {
  open: boolean;
  onClose: () => void;
  cartItems: { product: Product; quantity: number }[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveFromCart: (productId: number) => void;
}

export const CartDialog: React.FC<CartDialogProps> = ({
  open,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveFromCart,
}) => {
  const calculateSubtotal = () => {
    return cartItems
      .reduce(
        (total, { product, quantity }) =>
          total + parseFloat(product.price.slice(1)) * quantity,
        0
      )
      .toFixed(2);
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      />
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition-transform duration-300 ease-in-out"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between sticky top-0 bg-white z-10">
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

                  <div className="mt-8">
                    {cartItems.length === 0 ? (
                      <p className="text-center text-gray-500">
                        Your cart is empty
                      </p>
                    ) : (
                      <ul role="list" className="-my-6 divide-y divide-gray-200">
                        {cartItems.map(({ product, quantity }) => (
                          <li key={product.id} className="relative flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                alt={product.name}
                                src={product.imageUrl}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>
                            <div className="ml-4 flex flex-1 flex-col relative">
                              <div className="flex flex-col flex-1 justify-between">
                                <div>
                                  <div className="text-base font-medium text-gray-900">
                                    <Link href={`/product/${product.id}`}>
                                      <p>{product.name}</p>
                                    </Link>
                                  </div>
                                  <p className="mt-1 text-base font-medium text-gray-900">
                                    {product.price}
                                  </p>
                                  {product.discount && (
                                    <p className="mt-1 text-sm text-gray-500">
                                      Discount: {product.discount}
                                    </p>
                                  )}
                                </div>
                                <div className="flex items-center justify-between text-sm relative">
                                  <div className="flex items-center space-x-2 mr-2">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        onUpdateQuantity(product.id, quantity - 1)
                                      }
                                      className="bg-gray-200 hover:bg-gray-300 px-2 rounded-sm"
                                      disabled={quantity <= 1}
                                    >
                                      -
                                    </button>
                                    <span className="text-gray-700">{quantity}</span>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        onUpdateQuantity(product.id, quantity + 1)
                                      }
                                      className="bg-gray-200 hover:bg-gray-300 px-2 rounded-sm"
                                    >
                                      +
                                    </button>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => onRemoveFromCart(product.id)}
                                    className="absolute bottom-2 right-2 text-red-500 hover:text-red-600"
                                  >
                                    <FaTrash className="h-5 w-5" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {cartItems.length > 0 && (
                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>${calculateSubtotal()}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Shipping and taxes calculated at checkout.
                    </p>
                    <div className="mt-6">
                      <Link
                        href="/checkout"
                        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                      >
                        Checkout
                      </Link>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or{" "}
                        <button
                          type="button"
                          onClick={onClose}
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
