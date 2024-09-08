import axios from 'axios';
import {Product }from '@/types'

export const sendOrderToWhatsApp = async (formData: { name: string; mobileNo: string; email: string; address: string }, cartItems: { product: Product; quantity: number }[]) => {
  const orderSummary = cartItems.map(({ product, quantity }) => {
    return `${product.name} - ${product.description} \nPrice: $${product.price} \nQuantity: ${quantity}`;
  }).join('\n\n');

  const message = `*Order Summary*\n\nName: ${formData.name}\nMobile Number: ${formData.mobileNo}\nEmail: ${formData.email}\nAddress: ${formData.address}\n\n${orderSummary}`;

  const encodedMessage = encodeURIComponent(message);

  const whatsappNumber = 'YOUR_WHATSAPP_NUMBER'; // Replace with your WhatsApp number

  return axios.get(`https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`);
};
