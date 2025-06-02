'use client';

import { useEffect, useState } from 'react';
import { ViewType } from '@/domains/product/types/viewType';
import Image from 'next/image';
import { productAPI } from '@/domains/product/infras/api/productAPI';

interface Product {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  rating: number;
  reviews: Array<{
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }>;
}

interface ProductListProps {
  viewType: ViewType;
}

const ProductList = ({ viewType }: ProductListProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    productAPI
      .getProducts({ limit: 20 })
      .then((data: { products: Product[] }) => setProducts(data.products))
      .catch((err) => {
        console.error('상품 목록 불러오기 실패', err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div
      className={
        viewType === 'grid'
          ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
          : 'flex flex-col gap-4'
      }
    >
      {products.map((product) => (
        <div key={product.id} className="border rounded-md p-4 shadow hover:shadow-md transition">
          <Image
            width={100}
            height={100}
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-40 object-cover rounded"
          />
          <h2 className="text-lg font-bold mt-2">{product.title}</h2>
          <p className="text-sm text-gray-600 mt-1">{product.description}</p>
          <div className="text-sm text-gray-500 mt-2">
            ⭐ {product.rating} / 리뷰 {product.reviews.length}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
