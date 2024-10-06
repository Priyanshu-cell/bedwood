import React from 'react';
import { Header, ProductDetail } from '@/src/components';

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const id = params.id;

  return (
    <div>
      <Header />
      <ProductDetail id={id} />
    </div>
  );
}
