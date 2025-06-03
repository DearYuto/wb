'use client';

import { ViewType } from '@/domains/product/types/viewType';

import { useInfiniteScrollTrigger } from '@/common/hooks/useInfiniteScrollTrigger';
import { useInfiniteProducts } from '@/domains/product/infras/queries/useGetProducts';
import { InfiniteTrigger } from '@/common/components/InfiniteTrigger';
import LoadingView from './LoadingView';
import ProductCard from './ProductCard';
import ProductGridView from './ProductGridView';
import ProductListView from './ProductListView';

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

  const ViewLayout = viewType === 'grid' ? ProductGridView : ProductListView;

  return (
    <section>
      <ViewLayout>
        {productDatas?.pages.flatMap((datas) => {
          return datas.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ));
        })}
      </ViewLayout>

      <InfiniteTrigger ref={ref} />

      {isFetching && <LoadingView viewType={viewType} />}
    </section>
  );
};

export default ProductListContainer;
