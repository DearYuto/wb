'use client';

import ProductListContainer from '@/domains/product/components/list/ProductListContainer';
import { useViewType } from '@/domains/product/hooks/useProductsViewType';
import Spinner from '@/common/components/Spinner';

export default function ProductsPage() {
  const { viewType, isLoading } = useViewType();

  const showSpinner = isLoading || !viewType;

  return <>{showSpinner ? <Spinner /> : <ProductListContainer viewType={viewType} />}</>;
}
