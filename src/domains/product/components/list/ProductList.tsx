'use client';

import { ViewType } from '@/domains/product/types/viewType';
import Image from 'next/image';
import { useInfiniteScrollTrigger } from '@/common/hooks/useInfiniteScrollTrigger';
import { useInfiniteProducts } from '../../infras/queries/useGetProducts';
import { InfiniteTrigger } from '@/common/components/InfiniteTrigger';

interface ProductListProps {
  viewType: ViewType;
}

const ProductList = ({ viewType }: ProductListProps) => {
  const { data: productDatas, fetchNextPage, hasNextPage, isLoading } = useInfiniteProducts({});
  const { ref } = useInfiniteScrollTrigger({ fetchNextPage, hasNextPage });

  if (isLoading) return <div>Loading...</div>;

  return (
    <section className="p-4">
      <div
        className={
          viewType === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
            : 'flex flex-col gap-4'
        }
      >
        {productDatas?.pages.flatMap((datas) => {
          return datas.products.map((product) => (
            <div
              key={product.id}
              className="border rounded-md p-4 shadow hover:shadow-md transition"
            >
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
          ));
        })}
        <InfiniteTrigger ref={ref} />
      </div>
    </section>
  );
};

export default ProductList;
