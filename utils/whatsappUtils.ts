// src/utils/whatsappUtils.ts
import { Product } from "@/types";

export function generateWhatsAppMessage(cartItems: { product: Product; quantity: number }[], formData: { name: string; email: string; phone: string }): string {
  const baseURL = 'https://wa.me/';
  const phoneNumber = '8218719347'; 

  const subtotal = cartItems.reduce(
    (total, { product, quantity }) =>
      total + parseFloat(product.price.slice(1)) * quantity,
    0
  ).toFixed(2);

  const productDetails = cartItems.map(({ product, quantity }) => `
Name: ${product.name}
Quantity: ${quantity}
Price: ${product.price}
`).join('\n');

  const message = `
*Product Summary:*
${productDetails}

*Subtotal:* $${subtotal}

*User Info:*
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
  `.trim();

  const encodedMessage = encodeURIComponent(message);

  return `${baseURL}${phoneNumber}?text=${encodedMessage}`;
}
