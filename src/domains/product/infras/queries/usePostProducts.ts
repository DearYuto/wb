import { useMutation, useQueryClient } from '@tanstack/react-query';
import { productAPI } from '@/domains/product/infras/api/productAPI';
import { ProductType } from '@/domains/product/types/product';
import { productQueryKeys } from '@/domains/product/constants/queryKeys';

interface UsePostProductsProps {
  afterSuccess?: () => void;
  afterError?: () => void;
}

export const useCreateProductMutation = ({ afterSuccess, afterError }: UsePostProductsProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (product: ProductType) => productAPI.createProduct(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productQueryKeys.all });

      afterSuccess?.();
    },
    onError: () => {
      afterError?.();
    },
  });
};
