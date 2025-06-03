'use client';

import { ViewType } from '@/domains/product/types/viewType';
import Image from 'next/image';
import { useInfiniteScrollTrigger } from '@/common/hooks/useInfiniteScrollTrigger';
import { useInfiniteProducts } from '@/domains/product/infras/queries/useGetProducts';
import { InfiniteTrigger } from '@/common/components/InfiniteTrigger';
import SkeletonCard from './SkeletonCard';

interface ProductListProps {
  viewType: ViewType;
}

const ProductList = ({ viewType }: ProductListProps) => {
  const {
    data: productDatas,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
  } = useInfiniteProducts({});
  const { ref } = useInfiniteScrollTrigger({ fetchNextPage, hasNextPage });

  const layoutClass =
    viewType === 'grid'
      ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
      : 'flex flex-col gap-4';

  if (isLoading) {
    return (
      <section className="p-4">
        <div className={layoutClass}>
          {Array.from({ length: 8 }).map((_, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </div>
      </section>
    );
  }

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

      {isFetching && (
        <section className="p-4">
          <div className={layoutClass}>
            {Array.from({ length: 8 }).map((_, idx) => (
              <SkeletonCard key={idx} />
            ))}
          </div>
        </section>
      )}
    </section>
  );
};

export default ProductList;
