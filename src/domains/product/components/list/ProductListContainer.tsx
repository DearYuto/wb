'use client';

import { ViewType } from '@/domains/product/types/viewType';
import Image from 'next/image';
import { useInfiniteScrollTrigger } from '@/common/hooks/useInfiniteScrollTrigger';
import { useInfiniteProducts } from '@/domains/product/infras/queries/useGetProducts';
import { InfiniteTrigger } from '@/common/components/InfiniteTrigger';
import SkeletonCard from './SkeletonCard';
import ProductGridView from './ProductGridView';
import ProductListView from './ProductListView';
import LoadingView from './LoadingView';

interface ProductListContainerProps {
  viewType: ViewType;
}

const ProductListContainer = ({ viewType }: ProductListContainerProps) => {
  const {
    data: productDatas,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
  } = useInfiniteProducts({});
  const { ref } = useInfiniteScrollTrigger({ fetchNextPage, hasNextPage });

  if (isLoading) {
    return <LoadingView viewType={viewType} />;
  }

  return (
    <section className="overflow-x-auto">
      <div
        className={
          viewType === 'grid' ? 'grid min-w-[1024px] grid-cols-4 gap-4' : 'flex flex-col gap-4'
        }
      >
        {productDatas?.pages.flatMap((datas) => {
          return datas.products.map((product) => (
            <div
              key={product.id}
              className="rounded-md border p-4 shadow transition hover:shadow-md"
            >
              <Image
                width={100}
                height={100}
                src={product.thumbnail}
                alt={product.title}
                className="h-40 w-full rounded object-cover"
              />
              <h2 className="mt-2 text-lg font-bold">{product.title}</h2>
              <p className="mt-1 text-sm text-gray-600">{product.description}</p>
              <div className="mt-2 text-sm text-gray-500">
                ⭐ {product.rating} / 리뷰 {product.reviews.length}
              </div>
            </div>
          ));
        })}

        <InfiniteTrigger ref={ref} />
      </div>

      {isFetching && <LoadingView viewType={viewType} />}
    </section>
  );
};

export default ProductListContainer;
