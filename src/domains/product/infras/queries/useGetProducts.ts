import { useInfiniteQuery } from '@tanstack/react-query';
import { productQueryKeys } from '@/domains/product/constants/queryKeys';
import { productAPI } from '../api/productAPI';

const DEFAULT_LIMIT = 20;

interface UseInfiniteProductsProps {
  limit?: number;
}

export const useInfiniteProducts = ({ limit = DEFAULT_LIMIT }: UseInfiniteProductsProps) => {
  return useInfiniteQuery({
    queryKey: productQueryKeys.list({ limit }),
    queryFn: ({ pageParam = 0 }) => productAPI.getProducts({ limit, skip: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const nextSkip = lastPage.skip + lastPage.limit;

      return nextSkip < lastPage.total ? nextSkip : undefined;
    },
  });
};
