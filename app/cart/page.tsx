
'use client';

import { CartHeader, CartPage } from '@/components';


export default function CartCom ()  {
  return (
    <div className='overflow-hidden min-h-screen'>
        <CartHeader/>
        <CartPage />
    </div>
  );
};


