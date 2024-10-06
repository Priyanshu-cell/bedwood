import { TProduct } from "@/services/product/product.type"; // Ensure to import TProduct

export function generateWhatsAppMessage(
  cartItems: { product: TProduct; quantity: number }[], // Updated to use TProduct
  formData: { name: string; email: string; phone: string; address: string }
): string {
  const baseURL = 'https://wa.me/';
  const phoneNumber = '8630715936'; 

  // Calculate subtotal based on the price in TProduct
  const subtotal = cartItems.reduce(
    (total, { product, quantity }) =>
      total + product.price * quantity, // Accessing price directly since it's a number
    0
  ).toFixed(2);

  // Create product details summary
  const productDetails = cartItems.map(({ product, quantity }) => `
Name: ${product.name}
Quantity: ${quantity}
Price: $${product.price.toFixed(2)} // Assuming price needs formatting
`).join('\n');

  // Construct the message
  const message = `
*Product Summary:*
${productDetails}

*Subtotal:* $${subtotal}

*User Info:*
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Address: ${formData.address}
  `.trim();

  // Encode message for WhatsApp
  const encodedMessage = encodeURIComponent(message);
  return `${baseURL}${phoneNumber}?text=${encodedMessage}`;
}
