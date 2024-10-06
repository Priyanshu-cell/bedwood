export type TProductDetail = {
    productId: string;
    quantity: number;
  };
  
  export type TOrder = {
    name: string;
    phone: string;
    email: string;
    address: string;
    totalPrice: number;
    productDetails: TProductDetail[];
  };