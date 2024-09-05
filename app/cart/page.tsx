
'use client';

import { CartPage, CartHeader } from '@/components';

export default function CartCom ()  {
  return (
    <div className='overflow-hidden min-h-screen'>
        <CartHeader />
        <CartPage />
    </div>
  );
};


