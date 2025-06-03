import { useWatch, Control } from 'react-hook-form';
import { ProductType } from '@/domains/product/types/product';

export const useFinalPrice = (control: Control<ProductType>) => {
  const price = useWatch({ name: 'price', control }) || 0;
  const discountPercentage = useWatch({ name: 'discountPercentage', control }) || 0;
  const safeDiscount = Math.max(0, discountPercentage);
  const finalPrice = price * (1 - safeDiscount / 100);

  return Math.max(0, finalPrice);
};
