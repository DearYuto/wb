'use client';

import ProductList from '@/domains/product/components/list/ProductList';
import { useViewType } from '@/domains/product/hooks/useProductsViewType';
import Link from 'next/link';

export default function ProductsPage() {
  const { viewType, isLoading } = useViewType();

  if (isLoading || !viewType) {
    return <div>Loading...</div>;
  }

  return (
    <section className="flex flex-col gap-4">
      <nav className="flex gap-4 justify-end p-4">
        <button className="bg-blue-500 text-white p-2 rounded-md">
          <Link href="/products/new">상품 생성</Link>
        </button>
      </nav>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">상품 목록</h1>
      </div>
      <ProductList viewType={viewType} />
    </section>
  );
}
