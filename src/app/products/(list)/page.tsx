'use client';

import ProductListContainer from '@/domains/product/components/list/ProductListContainer';
import { useViewType } from '@/domains/product/hooks/useProductsViewType';
import LoadingContainer from '@/common/components/LoadingContainer';

export default function ProductsPage() {
  const { viewType, isLoading } = useViewType();

  return (
    <LoadingContainer isLoading={isLoading || !viewType}>
      {viewType && <ProductListContainer viewType={viewType} />}
    </LoadingContainer>
  );
}
